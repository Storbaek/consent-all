import React, { useState } from 'react';
import { Users, Activity, Settings, Code } from 'lucide-react';
import { ConsentRecord, User } from '../../types/consent';
import ConsentHistory from '../ConsentHistory';
import SDKIntegration from './SDKIntegration';

interface AdminDashboardProps {
  users: User[];
  consents: ConsentRecord[];
}

export default function AdminDashboard({ users, consents }: AdminDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'integration'>('analytics');

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: Users,
      change: '+4.75%',
      changeType: 'positive'
    },
    {
      name: 'Active Consents',
      value: consents.filter(c => c.granted).length,
      icon: Activity,
      change: '+54.02%',
      changeType: 'positive'
    },
    {
      name: 'Pending Updates',
      value: 23,
      icon: Settings,
      change: '-1.39%',
      changeType: 'negative'
    }
  ];

  const filteredConsents = selectedUser
    ? consents.filter(c => c.userId === selectedUser)
    : consents;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-gray-500"> from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics & History
            </button>
            <button
              onClick={() => setActiveTab('integration')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integration'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SDK Integration
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'analytics' ? (
            <div className="space-y-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h2 className="text-xl font-semibold text-gray-900">Consent Records</h2>
                  <p className="mt-2 text-sm text-gray-700">
                    A comprehensive list of all user consents and their current status.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <select
                    value={selectedUser || ''}
                    onChange={(e) => setSelectedUser(e.target.value || null)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">All Users</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ConsentHistory consents={filteredConsents} showUserInfo />
            </div>
          ) : (
            <SDKIntegration />
          )}
        </div>
      </div>
    </div>
  );
}