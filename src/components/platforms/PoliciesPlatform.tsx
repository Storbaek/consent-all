import React from 'react';
import { FileText, Code, Copy, Check } from 'lucide-react';

export default function PoliciesPlatform() {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const endpoints = [
    {
      title: 'Create Policy Version',
      method: 'POST',
      path: '/api/v1/policies',
      description: 'Create a new version of a policy document',
      code: `curl -X POST https://api.consenthub.io/v1/policies \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "privacy_policy",
    "version": "2.0",
    "content": "Policy content...",
    "effectiveDate": "2024-04-01",
    "notifyUsers": true
  }'`
    },
    {
      title: 'Record Policy Consent',
      method: 'POST',
      path: '/api/v1/policies/consent',
      description: 'Record user consent for a policy version',
      code: `curl -X POST https://api.consenthub.io/v1/policies/consent \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user123",
    "policyType": "privacy_policy",
    "version": "2.0",
    "granted": true,
    "timestamp": "2024-03-15T10:00:00Z"
  }'`
    },
    {
      title: 'Get Policy History',
      method: 'GET',
      path: '/api/v1/policies/{type}/history',
      description: 'Retrieve version history for a policy type',
      code: `curl https://api.consenthub.io/v1/policies/privacy_policy/history \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Policy Management API</h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">Features</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Version control for policy documents</li>
            <li>• Consent tracking and documentation</li>
            <li>• Audit trail generation</li>
            <li>• User notification system</li>
          </ul>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{endpoint.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {endpoint.method}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{endpoint.description}</p>
                <code className="mt-1 text-sm text-gray-600">{endpoint.path}</code>
              </div>
              <div className="bg-gray-800 relative">
                <button
                  onClick={() => handleCopy(endpoint.code, index)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white"
                >
                  {copiedIndex === index ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <pre className="p-4 text-sm text-white overflow-x-auto">
                  <code>{endpoint.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}