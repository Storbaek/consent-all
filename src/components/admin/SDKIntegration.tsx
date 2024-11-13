import React, { useState } from 'react';
import { Code, Copy, Check, Globe, Phone, Mail, FileText } from 'lucide-react';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

interface PlatformSection {
  id: 'web' | 'mobile' | 'communications' | 'policies';
  title: string;
  Icon: typeof Globe;
  features: string[];
  integrationExamples: CodeSnippet[];
}

export default function SDKIntegration() {
  const [activePlatform, setActivePlatform] = useState<'web' | 'mobile' | 'communications' | 'policies'>('web');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const platforms: PlatformSection[] = [
    {
      id: 'web',
      title: 'Web Integration',
      Icon: Globe,
      features: [
        'Cookie consent management',
        'Newsletter & marketing preferences',
        'Privacy policy & ToS tracking',
        'Customizable UI components'
      ],
      integrationExamples: [
        {
          title: 'Web SDK Integration',
          language: 'typescript',
          code: `// Initialize the SDK
const consentHub = ConsentHub.init({
  clientId: 'YOUR_CLIENT_ID',
  apiKey: 'YOUR_API_KEY',
  platform: 'web',
  onConsentChange: (type, granted) => {
    console.log(\`Consent \${type} \${granted ? 'granted' : 'revoked'}\`);
  }
});

// Show cookie banner
if (!await consentHub.checkConsent('cookies_essential')) {
  consentHub.showCookieBanner();
}

// Check newsletter consent
if (await consentHub.checkConsent('newsletter')) {
  showNewsletterForm();
}`
        }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Integration',
      Icon: Phone,
      features: [
        'Push notification consent',
        'Native UI components',
        'Offline consent storage',
        'Cross-platform support'
      ],
      integrationExamples: [
        {
          title: 'iOS Integration',
          language: 'swift',
          code: `// AppDelegate.swift
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    ConsentHub.shared.initialize(
        clientId: "YOUR_CLIENT_ID",
        apiKey: "YOUR_API_KEY"
    )
    return true
}

// ViewController.swift
class ViewController: UIViewController {
    func showPreferences() {
        ConsentHub.shared.showPreferences(viewController: self)
    }
    
    func requestPushConsent() {
        ConsentHub.shared.requestPushNotificationConsent { granted in
            if granted {
                // Handle push consent granted
            }
        }
    }
}`
        },
        {
          title: 'Android Integration',
          language: 'kotlin',
          code: `// MainActivity.kt
class MainActivity : AppCompatActivity() {
    private lateinit var consentHub: ConsentHub
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        consentHub = ConsentHub.getInstance(this)
        consentHub.initialize(
            clientId = "YOUR_CLIENT_ID",
            apiKey = "YOUR_API_KEY"
        )
        
        // Request push notification permission
        val requestPermissionLauncher = registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted ->
            if (isGranted) {
                // Handle push consent granted
            }
        }
        
        consentHub.requestPushNotificationConsent(this, requestPermissionLauncher)
    }
}`
        }
      ]
    },
    {
      id: 'communications',
      title: 'Communications Integration',
      Icon: Mail,
      features: [
        'Newsletter subscription management',
        'Marketing email preferences',
        'Communication frequency settings',
        'Preference center integration'
      ],
      integrationExamples: [
        {
          title: 'Newsletter Integration',
          language: 'typescript',
          code: `// Initialize communications module
const communications = consentHub.communications.init({
  defaultFrequency: 'weekly',
  categories: ['product', 'marketing', 'updates']
});

// Check newsletter consent
const hasConsent = await communications.checkConsent('newsletter');
if (hasConsent) {
  // Subscribe to newsletter
  await communications.subscribe({
    email: 'user@example.com',
    categories: ['product', 'updates'],
    frequency: 'weekly'
  });
}

// Update preferences
communications.showPreferences({
  onUpdate: async (preferences) => {
    await communications.updateSubscription(preferences);
  }
});`
        }
      ]
    },
    {
      id: 'policies',
      title: 'Policy Integration',
      Icon: FileText,
      features: [
        'Policy version tracking',
        'Consent documentation',
        'Audit trail generation',
        'Policy update notifications'
      ],
      integrationExamples: [
        {
          title: 'Policy Management',
          language: 'typescript',
          code: `// Initialize policy manager
const policies = consentHub.policies.init({
  autoNotify: true,
  trackVersions: true
});

// Register new policy version
await policies.registerVersion({
  type: 'privacy_policy',
  version: '2.0',
  effectiveDate: '2024-04-01',
  content: policyContent,
  notifyUsers: true
});

// Check policy consent
const hasConsent = await policies.checkConsent({
  type: 'privacy_policy',
  version: '2.0'
});

// Show policy update modal
policies.showUpdateModal({
  type: 'privacy_policy',
  onAccept: async () => {
    await policies.recordConsent({
      type: 'privacy_policy',
      version: '2.0',
      granted: true
    });
  }
});`
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Integration Guide</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose your platform to see integration examples
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-6 py-3" aria-label="Platforms">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activePlatform === platform.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <platform.Icon className="h-5 w-5 mr-1.5" />
              {platform.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 space-y-6">
        {platforms.map((platform) => (
          platform.id === activePlatform && (
            <div key={platform.id} className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <platform.Icon className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-900">{platform.title} Features</h3>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  {platform.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {platform.integrationExamples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700">{example.title}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(example.code, index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto">
                      <code className={`language-${example.language}`}>
                        {example.code}
                      </code>
                    </pre>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">Important Notes</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Replace YOUR_CLIENT_ID and YOUR_API_KEY with your actual credentials</li>
                  <li>• Always initialize the SDK before using any of its features</li>
                  <li>• Test consent management in development environment first</li>
                  <li>• Ensure proper error handling in production</li>
                </ul>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}