import React from 'react';
import { Bell, User, Shield, Globe2, Smartphone, Mail, Layout, Palette, Settings, ChevronDown, FileText } from 'lucide-react';
import { User as UserType } from '../../types/consent';

interface HeaderProps {
  user: UserType;
  onUserSwitch: () => void;
}

export default function Header({ user, onUserSwitch }: HeaderProps) {
  const [activePlatform, setActivePlatform] = React.useState<'web' | 'mobile' | 'communications' | 'policies'>('web');
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const platforms = [
    { id: 'web', label: 'Web', Icon: Globe2 },
    { id: 'mobile', label: 'Mobile', Icon: Smartphone },
    { id: 'communications', label: 'Communications', Icon: Mail },
    { id: 'policies', label: 'Policies', Icon: FileText }
  ] as const;

  const webNavItems = [
    { id: 'templates', label: 'Templates', Icon: Layout },
    { id: 'designs', label: 'Designs', Icon: Palette },
    { id: 'account', label: 'Account', Icon: Settings }
  ];

  const mobileNavItems = [
    { id: 'apps', label: 'Applications', Icon: Smartphone },
    { id: 'mobile-templates', label: 'Templates', Icon: Layout }
  ];

  const communicationNavItems = [
    { id: 'newsletter', label: 'Newsletter', Icon: Mail },
    { id: 'marketing', label: 'Marketing', Icon: Mail }
  ];

  const policyNavItems = [
    { id: 'privacy', label: 'Privacy Policy', Icon: FileText },
    { id: 'terms', label: 'Terms of Service', Icon: FileText },
    { id: 'cookie', label: 'Cookie Policy', Icon: FileText }
  ];

  const getNavItems = () => {
    switch (activePlatform) {
      case 'web':
        return webNavItems;
      case 'mobile':
        return mobileNavItems;
      case 'communications':
        return communicationNavItems;
      case 'policies':
        return policyNavItems;
    }
  };

  const activePlatformData = platforms.find(p => p.id === activePlatform);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ConsentHub</span>
            </div>

            {/* Platform Navigation */}
            {user.role === 'admin' && (
              <div className="hidden md:flex items-center ml-8">
                {/* Platform Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === 'platform' ? null : 'platform')}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    {activePlatformData && (
                      <activePlatformData.Icon className="h-5 w-5 mr-1.5" />
                    )}
                    {activePlatformData?.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {openMenu === 'platform' && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        {platforms.map((platform) => (
                          <button
                            key={platform.id}
                            onClick={() => {
                              setActivePlatform(platform.id);
                              setOpenMenu(null);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <platform.Icon className="h-5 w-5 mr-2" />
                            {platform.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Platform-specific Navigation */}
                <div className="flex items-center ml-8 space-x-4">
                  {getNavItems().map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      <Icon className="h-5 w-5 mr-1.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button
              onClick={onUserSwitch}
              className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {user.role === 'admin' && (
          <div className="md:hidden border-t border-gray-200 -mx-4 px-4 py-3">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setOpenMenu('platform')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                {activePlatformData && (
                  <activePlatformData.Icon className="h-5 w-5 mr-1.5" />
                )}
                {activePlatformData?.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            {openMenu === 'platform' && (
              <div className="mb-4 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setActivePlatform(platform.id);
                        setOpenMenu(null);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <platform.Icon className="h-5 w-5 mr-2" />
                      {platform.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              {getNavItems().map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <Icon className="h-5 w-5 mr-1.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}