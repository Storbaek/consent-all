import React from 'react';
import { ConsentRecord, CONSENT_TYPES } from '../types/consent';

interface HistoryProps {
  consents: ConsentRecord[];
  showUserInfo?: boolean;
}

export default function ConsentHistory({ consents, showUserInfo = false }: HistoryProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {showUserInfo && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {consents.map(consent => (
            <tr key={consent.id}>
              {showUserInfo && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {consent.userId}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {CONSENT_TYPES[consent.type].title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  {
                    essential: 'bg-purple-100 text-purple-800',
                    privacy: 'bg-blue-100 text-blue-800',
                    marketing: 'bg-yellow-100 text-yellow-800'
                  }[CONSENT_TYPES[consent.type].category]
                }`}>
                  {CONSENT_TYPES[consent.type].category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  consent.granted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {consent.granted ? 'Granted' : 'Denied'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(consent.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {consent.version}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}