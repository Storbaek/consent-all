import React from 'react';
import { Layout, Palette, Settings } from 'lucide-react';

export default function WebPlatform() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Web Platform</h2>
        <p className="text-gray-600">
          Manage your web properties, templates, and designs through our intuitive interface.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <Layout className="h-6 w-6 text-blue-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Templates</h3>
            <p className="text-sm text-gray-600">
              Customize and manage consent templates for your websites.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <Palette className="h-6 w-6 text-purple-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Designs</h3>
            <p className="text-sm text-gray-600">
              Create and customize the look and feel of your consent forms.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <Settings className="h-6 w-6 text-gray-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Account</h3>
            <p className="text-sm text-gray-600">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}