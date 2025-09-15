'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PrivacySetting {
  id: string;
  category: string;
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
  dataTypes: string[];
  retentionPeriod?: string;
}

interface ConsentPreference {
  id: string;
  purpose: string;
  description: string;
  consented: boolean;
  mandatory: boolean;
  lastUpdated: string;
  expiryDate?: string;
}

interface DataPortabilityRequest {
  id: string;
  requestType: 'export' | 'transfer' | 'delete';
  status: 'pending' | 'processing' | 'ready' | 'completed';
  requestDate: string;
  completionDate?: string;
  dataCategories: string[];
  format: 'json' | 'csv' | 'xml';
  size?: string;
}

const mockPrivacySettings: PrivacySetting[] = [
  {
    id: 'essential',
    category: 'Essential',
    name: 'Essential Cookies & Data',
    description: 'Required for basic website functionality and security',
    enabled: true,
    required: true,
    dataTypes: ['Session Data', 'Security Tokens', 'Authentication'],
    retentionPeriod: 'Session'
  },
  {
    id: 'analytics',
    category: 'Analytics',
    name: 'Analytics & Performance',
    description: 'Help us improve our services by analyzing usage patterns',
    enabled: true,
    required: false,
    dataTypes: ['Usage Statistics', 'Performance Metrics', 'Error Logs'],
    retentionPeriod: '2 years'
  },
  {
    id: 'marketing',
    category: 'Marketing',
    name: 'Marketing Communications',
    description: 'Receive updates about our products and services',
    enabled: false,
    required: false,
    dataTypes: ['Email Address', 'Communication Preferences', 'Interaction History'],
    retentionPeriod: '3 years'
  },
  {
    id: 'personalization',
    category: 'Personalization',
    name: 'Content Personalization',
    description: 'Customize content and recommendations based on your preferences',
    enabled: true,
    required: false,
    dataTypes: ['Preferences', 'Browsing History', 'Content Interactions'],
    retentionPeriod: '1 year'
  }
];

const mockConsentPreferences: ConsentPreference[] = [
  {
    id: 'service-delivery',
    purpose: 'Service Delivery',
    description: 'Process your data to provide our automotive supply chain services',
    consented: true,
    mandatory: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'quality-improvement',
    purpose: 'Quality Improvement',
    description: 'Use your feedback and usage data to improve our services',
    consented: true,
    mandatory: false,
    lastUpdated: '2024-01-10',
    expiryDate: '2025-01-10'
  },
  {
    id: 'research-development',
    purpose: 'Research & Development',
    description: 'Analyze aggregated data for automotive industry research',
    consented: false,
    mandatory: false,
    lastUpdated: '2024-01-05',
    expiryDate: '2025-01-05'
  }
];

const mockPortabilityRequests: DataPortabilityRequest[] = [
  {
    id: 'export-001',
    requestType: 'export',
    status: 'ready',
    requestDate: '2024-01-10',
    completionDate: '2024-01-12',
    dataCategories: ['Personal Data', 'Usage History', 'Preferences'],
    format: 'json',
    size: '2.4 MB'
  },
  {
    id: 'delete-001',
    requestType: 'delete',
    status: 'processing',
    requestDate: '2024-01-14',
    dataCategories: ['Marketing Data', 'Communication History'],
    format: 'json'
  }
];

export default function DataPrivacyControls() {
  const [activeTab, setActiveTab] = useState<'settings' | 'consent' | 'portability' | 'rights'>('settings');
  const [privacySettings, setPrivacySettings] = useState(mockPrivacySettings);
  const [consentPreferences, setConsentPreferences] = useState(mockConsentPreferences);

  const togglePrivacySetting = (id: string) => {
    setPrivacySettings(prev => prev.map(setting => 
      setting.id === id && !setting.required 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  const toggleConsent = (id: string) => {
    setConsentPreferences(prev => prev.map(pref => 
      pref.id === id && !pref.mandatory
        ? { ...pref, consented: !pref.consented, lastUpdated: new Date().toISOString().split('T')[0] }
        : pref
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'settings', label: 'Privacy Settings', icon: '🔒' },
    { id: 'consent', label: 'Consent Management', icon: '✅' },
    { id: 'portability', label: 'Data Portability', icon: '📦' },
    { id: 'rights', label: 'Your Rights', icon: '⚖️' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            Data Privacy Controls
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Manage your data privacy preferences and exercise your rights under GDPR and other privacy regulations
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'settings' | 'consent' | 'portability' | 'rights')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-automotive-steel hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Privacy Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-automotive-carbon mb-6">Privacy Settings</h3>
              
              <div className="space-y-6">
                {privacySettings.map((setting) => (
                  <motion.div
                    key={setting.id}
                    className="border border-gray-200 rounded-lg p-4"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-automotive-carbon">{setting.name}</h4>
                          {setting.required && (
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-automotive-steel mb-3">{setting.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Data Types:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {setting.dataTypes.map((type) => (
                                <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                          {setting.retentionPeriod && (
                            <div>
                              <span className="text-gray-500">Retention Period:</span>
                              <div className="font-medium">{setting.retentionPeriod}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.enabled}
                            onChange={() => togglePrivacySetting(setting.id)}
                            disabled={setting.required}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${setting.required ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-automotive-carbon mb-2">💡 Privacy Tip</h4>
                <p className="text-sm text-automotive-steel">
                  You can change these settings at any time. Essential cookies are required for the website to function properly and cannot be disabled.
                </p>
              </div>
            </div>
          )}

          {/* Consent Management Tab */}
          {activeTab === 'consent' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-automotive-carbon mb-6">Consent Management</h3>
              
              <div className="space-y-4">
                {consentPreferences.map((pref) => (
                  <motion.div
                    key={pref.id}
                    className="border border-gray-200 rounded-lg p-4"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-automotive-carbon">{pref.purpose}</h4>
                          {pref.mandatory && (
                            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                              Mandatory
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-automotive-steel mb-3">{pref.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Last Updated:</span>
                            <div className="font-medium">{pref.lastUpdated}</div>
                          </div>
                          {pref.expiryDate && (
                            <div>
                              <span className="text-gray-500">Expires:</span>
                              <div className="font-medium">{pref.expiryDate}</div>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <div className={`font-medium ${pref.consented ? 'text-green-600' : 'text-red-600'}`}>
                              {pref.consented ? 'Consented' : 'Not Consented'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pref.consented}
                            onChange={() => toggleConsent(pref.id)}
                            disabled={pref.mandatory}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${pref.mandatory ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
                  Save Consent Preferences
                </button>
              </div>
            </div>
          )}

          {/* Data Portability Tab */}
          {activeTab === 'portability' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-automotive-carbon mb-6">Data Portability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">📥</div>
                  <h4 className="font-semibold mb-2">Export Your Data</h4>
                  <p className="text-sm text-blue-100">Download a copy of all your personal data</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">🔄</div>
                  <h4 className="font-semibold mb-2">Transfer Data</h4>
                  <p className="text-sm text-green-100">Move your data to another service provider</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">🗑️</div>
                  <h4 className="font-semibold mb-2">Delete Data</h4>
                  <p className="text-sm text-red-100">Request deletion of your personal data</p>
                </motion.div>
              </div>

              <h4 className="text-lg font-semibold text-automotive-carbon mb-4">Recent Requests</h4>
              <div className="space-y-4">
                {mockPortabilityRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    className="border border-gray-200 rounded-lg p-4"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-medium text-automotive-carbon capitalize">
                          {request.requestType} Request
                        </h5>
                        <p className="text-sm text-automotive-steel">
                          Requested on {request.requestDate}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Data Categories:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {request.dataCategories.map((category) => (
                            <span key={category} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Format:</span>
                        <div className="font-medium uppercase">{request.format}</div>
                      </div>
                      {request.size && (
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <div className="font-medium">{request.size}</div>
                        </div>
                      )}
                    </div>

                    {request.status === 'ready' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                          Download Data
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Your Rights Tab */}
          {activeTab === 'rights' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-automotive-carbon mb-6">Your Data Protection Rights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">🔍 Right to Access</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You have the right to know what personal data we hold about you and how we use it.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Request Access
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">✏️ Right to Rectification</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You can ask us to correct any inaccurate or incomplete personal data.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Request Correction
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">🗑️ Right to Erasure</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You can request deletion of your personal data in certain circumstances.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Request Deletion
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">📦 Right to Data Portability</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You can request a copy of your data in a machine-readable format.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Export Data
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">⏸️ Right to Restrict Processing</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You can ask us to limit how we use your personal data in certain situations.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Request Restriction
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-automotive-carbon mb-2">🚫 Right to Object</h4>
                    <p className="text-sm text-automotive-steel mb-3">
                      You can object to processing based on legitimate interests or direct marketing.
                    </p>
                    <button className="text-primary-500 hover:text-primary-600 font-medium">
                      Object to Processing
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-automotive-carbon mb-2">📞 Need Help?</h4>
                <p className="text-sm text-automotive-steel mb-2">
                  If you have questions about your rights or need assistance with a request, contact our Data Protection Officer:
                </p>
                <div className="text-sm">
                  <div>Email: dpo@nkj-development.com</div>
                  <div>Phone: +49 (0) 123 456 789</div>
                  <div>Response time: Within 30 days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
