import { ConsentType, ConsentRecord, PolicyDocument } from '../types/consent';

export class ConsentService {
  private static instance: ConsentService;
  private apiKey: string;
  private baseUrl: string;

  private constructor() {
    this.apiKey = process.env.CONSENT_API_KEY || '';
    this.baseUrl = process.env.CONSENT_API_URL || 'https://api.consent-service.com';
  }

  public static getInstance(): ConsentService {
    if (!ConsentService.instance) {
      ConsentService.instance = new ConsentService();
    }
    return ConsentService.instance;
  }

  // API Methods
  async recordConsent(userId: string, type: ConsentType, granted: boolean, metadata?: Record<string, unknown>): Promise<ConsentRecord> {
    const response = await fetch(`${this.baseUrl}/consents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        type,
        granted,
        metadata,
        source: 'api',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to record consent');
    }

    return response.json();
  }

  async getPolicyDocument(type: ConsentType, version?: string): Promise<PolicyDocument> {
    const versionQuery = version ? `?version=${version}` : '';
    const response = await fetch(`${this.baseUrl}/policies/${type}${versionQuery}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch policy document');
    }

    return response.json();
  }

  async getUserConsents(userId: string): Promise<ConsentRecord[]> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/consents`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user consents');
    }

    return response.json();
  }

  async deleteUserConsents(userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/consents`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user consents');
    }
  }

  async exportUserConsents(userId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/consents/export`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export user consents');
    }

    return response.blob();
  }
}