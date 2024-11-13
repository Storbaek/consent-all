import React, { useState } from 'react';
import { ConsentType, ConsentRecord, User } from '../types/consent';
import Header from './layout/Header';
import UserPortal from './user/UserPortal';
import AdminDashboard from './admin/AdminDashboard';

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'user@example.com',
    role: 'user',
    name: 'John Doe'
  }
];

// Sample consent records
const mockConsents: ConsentRecord[] = [
  {
    id: '1',
    userId: '1',
    type: 'cookies_essential',
    granted: true,
    timestamp: '2024-03-10T10:00:00Z',
    version: '1.0',
    source: 'api',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0'
  },
  {
    id: '2',
    userId: '1',
    type: 'privacy_policy',
    granted: true,
    timestamp: '2024-03-10T10:00:00Z',
    version: '2.1',
    source: 'sdk',
    documentHash: 'abc123',
    ipAddress: '192.168.1.1'
  },
  {
    id: '3',
    userId: '2',
    type: 'newsletter',
    granted: true,
    timestamp: '2024-03-09T15:30:00Z',
    version: '1.0',
    source: 'manual'
  },
  {
    id: '4',
    userId: '2',
    type: 'marketing_emails',
    granted: false,
    timestamp: '2024-03-08T09:15:00Z',
    version: '1.0',
    source: 'api'
  },
  {
    id: '5',
    userId: '2',
    type: 'cookies_marketing',
    granted: true,
    timestamp: '2024-03-07T14:20:00Z',
    version: '1.1',
    source: 'sdk'
  }
];

export default function ConsentManager() {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [consents, setConsents] = useState<ConsentRecord[]>(mockConsents);

  const handleUserSwitch = () => {
    const nextUser = currentUser.id === '1' ? mockUsers[1] : mockUsers[0];
    setCurrentUser(nextUser);
  };

  const handleConsentChange = (type: ConsentType, granted: boolean) => {
    const newConsent: ConsentRecord = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      type,
      granted,
      timestamp: new Date().toISOString(),
      version: '1.0',
      source: 'manual',
      userAgent: navigator.userAgent,
      ipAddress: '192.168.1.1' // In a real app, this would be the actual IP
    };

    setConsents(prev => {
      const filtered = prev.filter(c => !(c.type === type && c.userId === currentUser.id));
      return [...filtered, newConsent];
    });
  };

  const exportConsents = () => {
    const userConsents = consents.filter(c => c.userId === currentUser.id);
    const data = JSON.stringify(userConsents, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consent-data-${currentUser.id}-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteUserConsents = () => {
    if (window.confirm('Are you sure you want to delete all your consent records? This cannot be undone.')) {
      setConsents(prev => prev.filter(c => c.userId !== currentUser.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={currentUser}
        onUserSwitch={handleUserSwitch}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === 'admin' ? (
          <AdminDashboard
            users={mockUsers}
            consents={consents}
          />
        ) : (
          <UserPortal
            user={currentUser}
            consents={consents.filter(c => c.userId === currentUser.id)}
            onConsentChange={handleConsentChange}
            onExport={exportConsents}
            onDelete={deleteUserConsents}
          />
        )}
      </main>
    </div>
  );
}