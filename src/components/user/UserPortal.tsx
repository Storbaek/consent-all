import React, { useState } from 'react';
import { Settings, Shield, UserCog } from 'lucide-react';
import { ConsentType, ConsentRecord, User } from '../../types/consent';
import ConsentPreferences from '../ConsentPreferences';
import ConsentHistory from '../ConsentHistory';
import DataManagement from '../DataManagement';

interface UserPortalProps {
  user: User;
  consents: ConsentRecord[];
  onConsentChange: (type: ConsentType, granted: boolean) => void;
  onExport: () => void;
  onDelete: () => void;
}

export default function UserPortal({
  user,
  consents,
  onConsentChange,
  onExport,
  onDelete
}: UserPortalProps) {
  const [activeTab, setActiveTab] = useState<'preferences' | 'history' | 'export'>('preferences');

  const tabs = [
    { id: 'preferences', label: 'Preferences', Icon: Settings },
    { id: 'history', label: 'Consent History', Icon: Shield },
    { id: 'export', label: 'Data Management', Icon: UserCog },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-4 px-1 border-b-2 ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } font-medium flex items-center space-x-2`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'preferences' && (
          <ConsentPreferences
            consents={consents}
            onConsentChange={onConsentChange}
          />
        )}
        {activeTab === 'history' && (
          <ConsentHistory consents={consents} />
        )}
        {activeTab === 'export' && (
          <DataManagement
            consents={consents}
            onExport={onExport}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}