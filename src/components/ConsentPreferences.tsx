import React from 'react';
import { ConsentType, ConsentRecord, CONSENT_TYPES } from '../types/consent';
import { Info, Lock } from 'lucide-react';

interface PreferencesProps {
  consents: ConsentRecord[];
  onConsentChange: (type: ConsentType, granted: boolean) => void;
}

export default function ConsentPreferences({ consents, onConsentChange }: PreferencesProps) {
  const consentsByCategory = Object.entries(CONSENT_TYPES).reduce((acc, [type, info]) => {
    const category = info.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push([type, info]);
    return acc;
  }, {} as Record<string, [string, typeof CONSENT_TYPES[ConsentType]][]>);

  const categoryOrder: Record<string, number> = {
    cookies: 1,
    communications: 2,
    legal: 3,
    data: 4
  };

  const categoryInfo = {
    cookies: {
      title: 'Cookie Preferences',
      description: 'Manage how we use cookies on our website.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    communications: {
      title: 'Communication Preferences',
      description: 'Control what types of communications you receive from us.',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    legal: {
      title: 'Legal Agreements',
      description: 'Required legal documents and agreements.',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    data: {
      title: 'Data Processing',
      description: 'Manage how we process and use your data.',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  };

  const sortedCategories = Object.entries(consentsByCategory).sort(
    ([a], [b]) => categoryOrder[a] - categoryOrder[b]
  );

  return (
    <div className="space-y-8">
      {sortedCategories.map(([category, typeConsents]) => (
        <div key={category} className={`${categoryInfo[category].bgColor} rounded-lg p-6 border ${categoryInfo[category].borderColor}`}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{categoryInfo[category].title}</h2>
            <p className="text-sm text-gray-600 mt-1">{categoryInfo[category].description}</p>
          </div>
          
          <div className="space-y-4">
            {typeConsents.map(([type, info]) => {
              const currentConsent = consents.find(c => c.type === type);
              const isRequired = info.required;

              return (
                <div key={type} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{info.title}</h3>
                        {isRequired && (
                          <Lock className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                        {info.requiresDocument && (
                          <button className="ml-2 text-gray-400 hover:text-gray-500">
                            <Info className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={isRequired || !!currentConsent?.granted}
                          onChange={e => onConsentChange(type as ConsentType, e.target.checked)}
                          disabled={isRequired}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}