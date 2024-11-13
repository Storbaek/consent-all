import React from 'react';
import { Settings, Shield, UserCog } from 'lucide-react';

interface TabProps {
  activeTab: 'preferences' | 'history' | 'export';
  setActiveTab: (tab: 'preferences' | 'history' | 'export') => void;
}

export default function ConsentTab({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'preferences', label: 'Preferences', Icon: Settings },
    { id: 'history', label: 'Consent History', Icon: Shield },
    { id: 'export', label: 'Data Management', Icon: UserCog },
  ] as const;

  return (
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
  );
}