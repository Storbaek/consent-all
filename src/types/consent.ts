export type ConsentCategory = 'cookies' | 'communications' | 'legal' | 'data';

export type ConsentType = 
  | 'cookies_essential'
  | 'cookies_analytics'
  | 'cookies_marketing'
  | 'terms_of_service'
  | 'privacy_policy'
  | 'newsletter'
  | 'marketing_emails'
  | 'data_processing';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface PolicyDocument {
  id: string;
  type: ConsentType;
  version: string;
  content: string;
  effectiveDate: string;
  url?: string;
  hash: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  type: ConsentType;
  granted: boolean;
  timestamp: string;
  version: string;
  ipAddress?: string;
  userAgent?: string;
  documentHash?: string;
  source: 'api' | 'sdk' | 'manual' | 'import';
  metadata?: Record<string, unknown>;
}

export interface UserConsents {
  userId: string;
  consents: ConsentRecord[];
}

export const CONSENT_TYPES: Record<ConsentType, { 
  title: string; 
  description: string; 
  category: ConsentCategory;
  required?: boolean;
  requiresDocument: boolean;
}> = {
  cookies_essential: {
    title: 'Essential Cookies',
    description: 'Required for basic site functionality. Cannot be disabled.',
    category: 'cookies',
    required: true,
    requiresDocument: false
  },
  cookies_analytics: {
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    category: 'cookies',
    requiresDocument: false
  },
  cookies_marketing: {
    title: 'Marketing Cookies',
    description: 'Used to deliver personalized advertisements.',
    category: 'cookies',
    requiresDocument: false
  },
  newsletter: {
    title: 'Newsletter Subscription',
    description: 'Receive our newsletter with updates and news.',
    category: 'communications',
    requiresDocument: true
  },
  marketing_emails: {
    title: 'Marketing Communications',
    description: 'Receive promotional emails about our products and services.',
    category: 'communications',
    requiresDocument: true
  },
  terms_of_service: {
    title: 'Terms of Service',
    description: 'Agreement to our terms of service.',
    category: 'legal',
    required: true,
    requiresDocument: true
  },
  privacy_policy: {
    title: 'Privacy Policy',
    description: 'Acknowledgment of our privacy policy.',
    category: 'legal',
    required: true,
    requiresDocument: true
  },
  data_processing: {
    title: 'Data Processing',
    description: 'Allow us to process your data for specified purposes.',
    category: 'data',
    requiresDocument: true
  }
};