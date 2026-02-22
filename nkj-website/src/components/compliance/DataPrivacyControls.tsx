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
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'processing':
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const tabs = [
    { id: 'settings', label: 'Privacy Settings', icon: '🔒' },
    { id: 'consent', label: 'Consent Management', icon: '✅' },
    { id: 'portability', label: 'Data Portability', icon: '📦' },
    { id: 'rights', label: 'Your Rights', icon: '⚖️' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'settings' | 'consent' | 'portability' | 'rights')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-50 shadow-sm border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="mr-2 opacity-80">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Privacy Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Privacy Settings</h3>
            
            <div className="space-y-4">
              {privacySettings.map((setting) => (
                <motion.div
                  key={setting.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-slate-200">{setting.name}</h4>
                        {setting.required && (
                          <span className="ml-3 px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded text-[10px] font-bold uppercase tracking-wider">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{setting.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Data Types Processed</span>
                          <div className="flex flex-wrap gap-1.5">
                            {setting.dataTypes.map((type) => (
                              <span key={type} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-medium border border-slate-700/50">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        {setting.retentionPeriod && (
                          <div>
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Retention Period</span>
                            <div className="text-sm font-medium text-slate-300">{setting.retentionPeriod}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0 pt-1">
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          onChange={() => togglePrivacySetting(setting.id)}
                          disabled={setting.required}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-slate-800 rounded-full peer peer-checked:bg-emerald-500 transition-colors border border-slate-700 peer-checked:border-emerald-400 ${setting.required ? 'opacity-50 cursor-not-allowed' : 'group-hover:border-slate-500 peer-checked:group-hover:border-emerald-300'}`}></div>
                        <div className={`absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white ${setting.required ? '' : 'group-hover:bg-slate-300 peer-checked:group-hover:bg-white'}`}></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-sky-500/10 border border-sky-500/20 rounded-lg flex gap-4">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="font-semibold text-sky-400 mb-1 tracking-tight">Privacy Notice</h4>
                <p className="text-sm text-sky-500/80 leading-relaxed">
                  You can change these settings at any time. Essential cookies are required for the platform's core security and functionality and cannot be disabled.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Consent Management Tab */}
        {activeTab === 'consent' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Consent Management</h3>
            
            <div className="space-y-4">
              {consentPreferences.map((pref, index) => (
                <motion.div
                  key={pref.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-slate-200">{pref.purpose}</h4>
                        {pref.mandatory && (
                          <span className="ml-3 px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded text-[10px] font-bold uppercase tracking-wider">
                            Mandatory
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{pref.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                        <div>
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</span>
                          <div className={`text-sm font-semibold ${pref.consented ? 'text-emerald-500' : 'text-slate-500'}`}>
                            {pref.consented ? 'Consented' : 'Not Consented'}
                          </div>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Last Updated</span>
                          <div className="text-sm font-medium text-slate-300">{new Date(pref.lastUpdated).toLocaleDateString()}</div>
                        </div>
                        {pref.expiryDate && (
                          <div>
                            <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Expires</span>
                            <div className="text-sm font-medium text-slate-300">{new Date(pref.expiryDate).toLocaleDateString()}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0 pt-1">
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={pref.consented}
                          onChange={() => toggleConsent(pref.id)}
                          disabled={pref.mandatory}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-slate-800 rounded-full peer peer-checked:bg-emerald-500 transition-colors border border-slate-700 peer-checked:border-emerald-400 ${pref.mandatory ? 'opacity-50 cursor-not-allowed' : 'group-hover:border-slate-500 peer-checked:group-hover:border-emerald-300'}`}></div>
                        <div className={`absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white ${pref.mandatory ? '' : 'group-hover:bg-slate-300 peer-checked:group-hover:bg-white'}`}></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button className="nkj-button-primary text-sm">
                Save Consent Preferences
              </button>
            </div>
          </div>
        )}

        {/* Data Portability Tab */}
        {activeTab === 'portability' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Data Portability Center</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center cursor-pointer group hover:border-emerald-500 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors text-xl">
                  📥
                </div>
                <h4 className="font-bold text-slate-200 tracking-tight mb-2">Export Data</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Download a machine-readable copy of your personal data</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center cursor-pointer group hover:border-sky-500 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-colors text-xl">
                  🔄
                </div>
                <h4 className="font-bold text-slate-200 tracking-tight mb-2">Transfer Data</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Securely move your data to another service provider</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center cursor-pointer group hover:border-red-500 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-colors text-xl">
                  🗑️
                </div>
                <h4 className="font-bold text-slate-200 tracking-tight mb-2">Delete Data</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Submit a permanent deletion request for your data</p>
              </motion.div>
            </div>

            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Recent Requests</h4>
            <div className="space-y-4">
              {mockPortabilityRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h5 className="font-bold text-slate-200 capitalize tracking-tight mb-1">
                        {request.requestType} Request
                      </h5>
                      <p className="text-xs text-slate-500">
                        Submitted {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/50">
                    <div className="col-span-2">
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Data Categories</span>
                      <div className="flex flex-wrap gap-1.5">
                        {request.dataCategories.map((category) => (
                          <span key={category} className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded text-[10px] font-medium">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Format</span>
                      <div className="text-sm font-mono font-medium text-slate-300 uppercase">{request.format}</div>
                    </div>
                    {request.size && (
                      <div>
                        <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">File Size</span>
                        <div className="text-sm font-mono font-medium text-slate-300">{request.size}</div>
                      </div>
                    )}
                  </div>

                  {request.status === 'ready' && (
                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                      <button className="nkj-button-secondary text-sm flex items-center gap-2">
                        <span>⬇️</span> Download Archive
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
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Your Data Protection Rights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 group hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🔍</span>
                  <h4 className="font-semibold text-slate-200 tracking-tight">Right to Access</h4>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Request a comprehensive report of all personal data we currently hold about you and how it is being processed across our systems.
                </p>
                <button className="text-emerald-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors group-hover:translate-x-1 duration-200 inline-flex items-center">
                  Submit Request <span className="ml-1">→</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 group hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">✏️</span>
                  <h4 className="font-semibold text-slate-200 tracking-tight">Right to Rectification</h4>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Submit a request to correct or update any inaccurate, outdated, or incomplete personal data in our systems.
                </p>
                <button className="text-emerald-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors group-hover:translate-x-1 duration-200 inline-flex items-center">
                  Update Information <span className="ml-1">→</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 group hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🗑️</span>
                  <h4 className="font-semibold text-slate-200 tracking-tight">Right to Erasure</h4>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Exercise your "Right to be Forgotten" and request the permanent deletion of your personal data from all our active databases.
                </p>
                <button className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors group-hover:translate-x-1 duration-200 inline-flex items-center">
                  Request Deletion <span className="ml-1">→</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 group hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">⏸️</span>
                  <h4 className="font-semibold text-slate-200 tracking-tight">Right to Restrict Processing</h4>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Temporarily suspend the processing of your personal data while an investigation or dispute is being resolved.
                </p>
                <button className="text-emerald-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors group-hover:translate-x-1 duration-200 inline-flex items-center">
                  Configure Restrictions <span className="ml-1">→</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                📞
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-slate-200 tracking-tight mb-2">Need Assistance?</h4>
                <p className="text-sm text-slate-400 mb-4 max-w-2xl">
                  Our Data Protection Officer (DPO) is available to assist you with exercising your rights or answering questions about our privacy practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
                    <a href="mailto:dpo@nkj-development.com" className="text-emerald-400 hover:text-emerald-300 font-medium">dpo@nkj-development.com</a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA</span>
                    <span className="text-slate-300 font-medium">Response within 72 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
