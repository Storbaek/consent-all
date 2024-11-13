import React from 'react';
import { Code, Copy, Check, Smartphone } from 'lucide-react';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

export default function MobilePlatform() {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const snippets: CodeSnippet[] = [
    {
      title: 'iOS Integration',
      language: 'swift',
      code: `// Initialize SDK
ConsentHub.shared.initialize(
    clientId: "YOUR_CLIENT_ID",
    apiKey: "YOUR_API_KEY"
)

// Show consent preferences
ConsentHub.shared.showPreferences(viewController: self)

// Request push notification consent
ConsentHub.shared.requestPushNotificationConsent { granted in
    if granted {
        // Handle push consent granted
    }
}`
    },
    {
      title: 'Android Integration',
      language: 'kotlin',
      code: `// Initialize SDK
val consentHub = ConsentHub.getInstance(context)
consentHub.initialize(
    clientId = "YOUR_CLIENT_ID",
    apiKey = "YOUR_API_KEY"
)

// Show consent preferences
consentHub.showPreferences(activity)

// Request push notification consent
val launcher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->
    if (isGranted) {
        // Handle push consent granted
    }
}
consentHub.requestPushNotificationConsent(activity, launcher)`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Smartphone className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Mobile SDK Integration</h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">Features</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Native UI components for iOS and Android</li>
            <li>• Push notification consent management</li>
            <li>• Offline consent storage</li>
            <li>• Automatic consent syncing</li>
            <li>• Cross-platform support</li>
          </ul>
        </div>

        <div className="space-y-6">
          {snippets.map((snippet, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium text-gray-700">{snippet.title}</span>
                </div>
                <button
                  onClick={() => handleCopy(snippet.code, index)}
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
                <code className={`language-${snippet.language}`}>
                  {snippet.code}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}