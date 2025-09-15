'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DataSubject {
  id: string;
  name: string;
  email: string;
  consentStatus: 'granted' | 'withdrawn' | 'pending';
  dataCategories: string[];
  lastActivity: string;
  retentionPeriod: string;
  requests: DataRequest[];
}

interface DataRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestDate: string;
  completionDate?: string;
  description: string;
}

interface ConsentRecord {
  id: string;
  purpose: string;
  legalBasis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
  status: 'active' | 'withdrawn' | 'expired';
  grantedDate: string;
  expiryDate?: string;
  withdrawnDate?: string;
}

const mockDataSubjects: DataSubject[] = [
  {
    id: 'ds-001',
    name: 'John Mueller',
    email: 'j.mueller@automotive-corp.de',
    consentStatus: 'granted',
    dataCategories: ['Personal Data', 'Professional Data', 'Communication Preferences'],
    lastActivity: '2024-01-15',
    retentionPeriod: '7 years',
    requests: [
      {
        id: 'req-001',
        type: 'access',
        status: 'completed',
        requestDate: '2024-01-10',
        completionDate: '2024-01-12',
        description: 'Request for personal data access under Article 15 GDPR'
      }
    ]
  },
  {
    id: 'ds-002',
    name: 'Marie Dubois',
    email: 'm.dubois@supply-chain.fr',
    consentStatus: 'pending',
    dataCategories: ['Personal Data', 'Business Data'],
    lastActivity: '2024-01-14',
    retentionPeriod: '5 years',
    requests: [
      {
        id: 'req-002',
        type: 'portability',
        status: 'processing',
        requestDate: '2024-01-13',
        description: 'Data portability request under Article 20 GDPR'
      }
    ]
  },
  {
    id: 'ds-003',
    name: 'Hans Schmidt',
    email: 'h.schmidt@quality-systems.de',
    consentStatus: 'withdrawn',
    dataCategories: ['Personal Data'],
    lastActivity: '2024-01-12',
    retentionPeriod: '3 years',
    requests: [
      {
        id: 'req-003',
        type: 'erasure',
        status: 'pending',
        requestDate: '2024-01-14',
        description: 'Right to be forgotten request under Article 17 GDPR'
      }
    ]
  }
];

const mockConsentRecords: ConsentRecord[] = [
  {
    id: 'consent-001',
    purpose: 'Marketing Communications',
    legalBasis: 'consent',
    status: 'active',
    grantedDate: '2023-06-15',
    expiryDate: '2025-06-15'
  },
  {
    id: 'consent-002',
    purpose: 'Data Processing for Service Delivery',
    legalBasis: 'contract',
    status: 'active',
    grantedDate: '2023-08-20'
  },
  {
    id: 'consent-003',
    purpose: 'Analytics and Performance Monitoring',
    legalBasis: 'legitimate_interests',
    status: 'withdrawn',
    grantedDate: '2023-05-10',
    withdrawnDate: '2024-01-05'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'granted':
    case 'active':
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'withdrawn':
    case 'rejected':
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getLegalBasisLabel = (basis: string) => {
  const labels = {
    consent: 'Consent (Art. 6(1)(a))',
    contract: 'Contract (Art. 6(1)(b))',
    legal_obligation: 'Legal Obligation (Art. 6(1)(c))',
    vital_interests: 'Vital Interests (Art. 6(1)(d))',
    public_task: 'Public Task (Art. 6(1)(e))',
    legitimate_interests: 'Legitimate Interests (Art. 6(1)(f))'
  };
  return labels[basis as keyof typeof labels] || basis;
};

export default function GDPRCompliance() {
  const [activeTab, setActiveTab] = useState<'subjects' | 'requests' | 'consent' | 'reports'>('subjects');

  const tabs = [
    { id: 'subjects', label: 'Data Subjects', icon: '👥', count: mockDataSubjects.length },
    { id: 'requests', label: 'Data Requests', icon: '📋', count: mockDataSubjects.reduce((acc, ds) => acc + ds.requests.length, 0) },
    { id: 'consent', label: 'Consent Management', icon: '✅', count: mockConsentRecords.length },
    { id: 'reports', label: 'Compliance Reports', icon: '📊', count: 5 }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            GDPR Compliance Management
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Comprehensive data protection and privacy compliance system for EU automotive operations
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'subjects' | 'requests' | 'consent' | 'reports')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-automotive-steel hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Data Subjects Tab */}
          {activeTab === 'subjects' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-automotive-carbon">Data Subjects Registry</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Add New Subject
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Consent Status</th>
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Data Categories</th>
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-automotive-carbon">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDataSubjects.map((subject) => (
                      <motion.tr
                        key={subject.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                        whileHover={{ backgroundColor: '#f9fafb' }}
                      >
                        <td className="py-3 px-4 font-medium text-automotive-carbon">{subject.name}</td>
                        <td className="py-3 px-4 text-automotive-steel">{subject.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(subject.consentStatus)}`}>
                            {subject.consentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {subject.dataCategories.slice(0, 2).map((category) => (
                              <span key={category} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {category}
                              </span>
                            ))}
                            {subject.dataCategories.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{subject.dataCategories.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-automotive-steel">{subject.lastActivity}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => console.log('Selected subject:', subject.name)}
                            className="text-primary-500 hover:text-primary-600 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Data Requests Tab */}
          {activeTab === 'requests' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-automotive-carbon">Data Subject Requests</h3>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Requests</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    New Request
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockDataSubjects.flatMap(subject => 
                  subject.requests.map(request => (
                    <motion.div
                      key={request.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-automotive-carbon capitalize">
                          {request.type.replace('_', ' ')} Request
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-automotive-steel mb-3">{request.description}</p>
                      <div className="text-xs text-gray-500">
                        <div>Requested: {request.requestDate}</div>
                        {request.completionDate && <div>Completed: {request.completionDate}</div>}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Subject: {subject.name}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Consent Management Tab */}
          {activeTab === 'consent' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-automotive-carbon">Consent Records</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Record Consent
                </button>
              </div>

              <div className="space-y-4">
                {mockConsentRecords.map((consent) => (
                  <motion.div
                    key={consent.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-automotive-carbon">{consent.purpose}</h4>
                        <p className="text-sm text-automotive-steel">{getLegalBasisLabel(consent.legalBasis)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consent.status)}`}>
                        {consent.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Granted:</span>
                        <div className="font-medium">{consent.grantedDate}</div>
                      </div>
                      {consent.expiryDate && (
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <div className="font-medium">{consent.expiryDate}</div>
                        </div>
                      )}
                      {consent.withdrawnDate && (
                        <div>
                          <span className="text-gray-500">Withdrawn:</span>
                          <div className="font-medium">{consent.withdrawnDate}</div>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button className="text-primary-500 hover:text-primary-600 text-sm">Edit</button>
                        <button className="text-red-500 hover:text-red-600 text-sm">Withdraw</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Reports Tab */}
          {activeTab === 'reports' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-automotive-carbon mb-6">Compliance Reports</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold mb-2">Data Subject Rights</h4>
                  <div className="text-3xl font-bold mb-2">98.5%</div>
                  <p className="text-blue-100">Requests processed within 30 days</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold mb-2">Consent Rate</h4>
                  <div className="text-3xl font-bold mb-2">87.2%</div>
                  <p className="text-green-100">Active consent records</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold mb-2">Data Breaches</h4>
                  <div className="text-3xl font-bold mb-2">0</div>
                  <p className="text-purple-100">Reported in last 12 months</p>
                </motion.div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-automotive-carbon mb-4">Generate Reports</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors">
                    <h5 className="font-medium text-automotive-carbon">Monthly Compliance Report</h5>
                    <p className="text-sm text-automotive-steel">Comprehensive GDPR compliance status</p>
                  </button>
                  <button className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors">
                    <h5 className="font-medium text-automotive-carbon">Data Processing Activities</h5>
                    <p className="text-sm text-automotive-steel">Article 30 GDPR record of processing</p>
                  </button>
                  <button className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors">
                    <h5 className="font-medium text-automotive-carbon">Consent Audit Trail</h5>
                    <p className="text-sm text-automotive-steel">Complete consent history and changes</p>
                  </button>
                  <button className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors">
                    <h5 className="font-medium text-automotive-carbon">Data Subject Requests Log</h5>
                    <p className="text-sm text-automotive-steel">All requests and response times</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
