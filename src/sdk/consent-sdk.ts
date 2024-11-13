import { ConsentType, ConsentRecord } from '../types/consent';

interface ConsentHubConfig {
  clientId: string;
  apiKey: string;
  apiUrl?: string;
  onConsentChange?: (type: ConsentType, granted: boolean) => void;
  platform: 'web' | 'ios' | 'android';
  theme?: {
    primaryColor?: string;
    darkMode?: boolean;
    fontFamily?: string;
  };
  i18n?: {
    locale?: string;
    translations?: Record<string, Record<string, string>>;
  };
}

interface ConsentOptions {
  version?: string;
  documentHash?: string;
  metadata?: Record<string, unknown>;
  deviceInfo?: {
    deviceId: string;
    platform: string;
    osVersion: string;
    appVersion: string;
  };
}

export class ConsentHub {
  private static instance: ConsentHub;
  private config: ConsentHubConfig;
  private baseUrl: string;
  private deviceId: string;

  private constructor(config: ConsentHubConfig) {
    this.config = config;
    this.baseUrl = config.apiUrl || 'https://api.consenthub.io/v1';
    this.deviceId = this.generateDeviceId();
  }

  public static init(config: ConsentHubConfig): ConsentHub {
    if (!ConsentHub.instance) {
      ConsentHub.instance = new ConsentHub(config);
    }
    return ConsentHub.instance;
  }

  // Core consent management
  public async checkConsent(type: ConsentType): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/consents/check`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        type,
        deviceId: this.deviceId,
        platform: this.config.platform
      })
    });
    const data = await response.json();
    return data.granted;
  }

  public async updateConsent(type: ConsentType, granted: boolean, options?: ConsentOptions): Promise<void> {
    const deviceInfo = options?.deviceInfo || await this.getDeviceInfo();
    
    await fetch(`${this.baseUrl}/consents`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        type,
        granted,
        version: options?.version,
        documentHash: options?.documentHash,
        metadata: {
          ...options?.metadata,
          deviceInfo,
          platform: this.config.platform
        }
      })
    });

    this.config.onConsentChange?.(type, granted);
  }

  // UI Components
  public showPreferences(options?: { modal?: boolean }): void {
    if (this.config.platform === 'web') {
      this.showWebPreferences(options?.modal);
    } else {
      this.showNativePreferences();
    }
  }

  public showCookieBanner(): void {
    if (this.config.platform !== 'web') return;
    
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.innerHTML = this.renderCookieBanner();
    document.body.appendChild(banner);
  }

  // Mobile-specific methods
  public async requestPushNotificationConsent(): Promise<boolean> {
    if (this.config.platform === 'web') return false;

    const granted = await this.requestNativePushPermission();
    if (granted) {
      await this.updateConsent('push_notifications', true, {
        metadata: { source: 'native_prompt' }
      });
    }
    return granted;
  }

  public async syncConsents(): Promise<void> {
    const deviceInfo = await this.getDeviceInfo();
    await fetch(`${this.baseUrl}/consents/sync`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ deviceInfo })
    });
  }

  // Private utility methods
  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'X-Client-ID': this.config.clientId,
      'X-Device-ID': this.deviceId,
      'X-Platform': this.config.platform,
      'Content-Type': 'application/json'
    };
  }

  private async getDeviceInfo() {
    if (this.config.platform === 'web') {
      return {
        deviceId: this.deviceId,
        platform: 'web',
        userAgent: navigator.userAgent,
        language: navigator.language
      };
    }

    // For mobile platforms, implement native device info gathering
    return {
      deviceId: this.deviceId,
      platform: this.config.platform,
      // These would be implemented in native code
      osVersion: await this.getNativeOSVersion(),
      appVersion: await this.getNativeAppVersion(),
      deviceModel: await this.getNativeDeviceModel()
    };
  }

  private generateDeviceId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Native bridge methods (to be implemented in platform-specific code)
  private async getNativeOSVersion(): Promise<string> {
    // Implement in native code
    return '0.0.0';
  }

  private async getNativeAppVersion(): Promise<string> {
    // Implement in native code
    return '0.0.0';
  }

  private async getNativeDeviceModel(): Promise<string> {
    // Implement in native code
    return 'unknown';
  }

  private async requestNativePushPermission(): Promise<boolean> {
    // Implement in native code
    return false;
  }

  private showNativePreferences(): void {
    // Implement in native code
  }

  private showWebPreferences(modal = true): void {
    // Implement web-specific UI
  }

  private renderCookieBanner(): string {
    // Implement cookie banner HTML
    return '';
  }
}