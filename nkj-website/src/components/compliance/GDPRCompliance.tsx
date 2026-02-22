'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// ... (rest of the file content needs to be read first, I will keep the interfaces and mock data)
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
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'pending':
    case 'processing':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'withdrawn':
    case 'rejected':
    case 'expired':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-slate-800 text-slate-400 border-slate-700';
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
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'subjects' | 'requests' | 'consent' | 'reports')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-50 shadow-sm border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="mr-2 opacity-80">{tab.icon}</span>
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-emerald-50' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Data Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Data Subjects Registry</h3>
                <p className="text-sm text-slate-400 mt-1">Manage individuals and their consent status</p>
              </div>
              <button className="nkj-button-secondary text-sm">
                Add New Subject
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Consent Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Activity</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockDataSubjects.map((subject) => (
                    <motion.tr
                      key={subject.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">{subject.name}</td>
                      <td className="py-4 px-4 text-sm text-slate-400">{subject.email}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(subject.consentStatus)}`}>
                          {subject.consentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{subject.lastActivity}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          className="text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100"
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
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Data Subject Requests</h3>
                <p className="text-sm text-slate-400 mt-1">Track and process GDPR rights requests</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option>All Requests</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Completed</option>
                </select>
                <button className="nkj-button-secondary text-sm">
                  New Request
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDataSubjects.flatMap(subject => 
                subject.requests.map(request => (
                  <motion.div
                    key={request.id}
                    className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-bold text-slate-200 capitalize tracking-tight">
                        {request.type.replace('_', ' ')} Request
                      </h4>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{request.description}</p>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Requested</span>
                        <span className="font-medium text-slate-300">{request.requestDate}</span>
                      </div>
                      {request.completionDate && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Completed</span>
                          <span className="font-medium text-slate-300">{request.completionDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500">Subject</span>
                      <span className="text-xs font-semibold text-emerald-400">{subject.name}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Consent Management Tab */}
        {activeTab === 'consent' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Consent Records</h3>
                <p className="text-sm text-slate-400 mt-1">Audit trail of legal basis for processing</p>
              </div>
              <button className="nkj-button-secondary text-sm">
                Record Consent
              </button>
            </div>

            <div className="space-y-4">
              {mockConsentRecords.map((consent) => (
                <motion.div
                  key={consent.id}
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-200 tracking-tight mb-1">{consent.purpose}</h4>
                      <p className="text-xs font-medium text-emerald-500">{getLegalBasisLabel(consent.legalBasis)}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border self-start md:self-auto ${getStatusColor(consent.status)}`}>
                      {consent.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-slate-800 pt-4">
                    <div>
                      <span className="block text-xs font-medium text-slate-500 mb-1">Granted</span>
                      <div className="font-semibold text-slate-300">{consent.grantedDate}</div>
                    </div>
                    {consent.expiryDate && (
                      <div>
                        <span className="block text-xs font-medium text-slate-500 mb-1">Expires</span>
                        <div className="font-semibold text-slate-300">{consent.expiryDate}</div>
                      </div>
                    )}
                    {consent.withdrawnDate && (
                      <div>
                        <span className="block text-xs font-medium text-slate-500 mb-1">Withdrawn</span>
                        <div className="font-semibold text-red-400">{consent.withdrawnDate}</div>
                      </div>
                    )}
                    <div className="flex items-end justify-start md:justify-end space-x-3 mt-auto col-span-2 md:col-span-1">
                      <button className="text-emerald-500 hover:text-emerald-400 text-xs font-semibold tracking-wide transition-colors">EDIT</button>
                      {consent.status === 'active' && (
                        <button className="text-red-500 hover:text-red-400 text-xs font-semibold tracking-wide transition-colors">WITHDRAW</button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Reports Tab */}
        {activeTab === 'reports' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Compliance Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject Rights</h4>
                <div className="text-3xl font-bold text-slate-50 tracking-tight mb-2">98.5%</div>
                <p className="text-xs text-slate-500">Processed within 30 days SLA</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Consent Rate</h4>
                <div className="text-3xl font-bold text-slate-50 tracking-tight mb-2">87.2%</div>
                <p className="text-xs text-slate-500">Active compliant records</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Data Breaches</h4>
                <div className="text-3xl font-bold text-slate-50 tracking-tight mb-2">0</div>
                <p className="text-xs text-slate-500">Reported in trailing 12 months</p>
              </motion.div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Generate Documentation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-slate-950 border border-slate-800 rounded-lg p-5 text-left hover:border-emerald-500 hover:bg-slate-900 transition-all group flex flex-col">
                  <span className="text-2xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">📊</span>
                  <h5 className="font-semibold text-slate-200 mb-1 tracking-tight">Monthly Compliance Report</h5>
                  <p className="text-xs text-slate-500">Comprehensive GDPR compliance status overview</p>
                </button>
                <button className="bg-slate-950 border border-slate-800 rounded-lg p-5 text-left hover:border-emerald-500 hover:bg-slate-900 transition-all group flex flex-col">
                  <span className="text-2xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">📑</span>
                  <h5 className="font-semibold text-slate-200 mb-1 tracking-tight">Processing Activities (Art. 30)</h5>
                  <p className="text-xs text-slate-500">Official record of processing activities registry</p>
                </button>
                <button className="bg-slate-950 border border-slate-800 rounded-lg p-5 text-left hover:border-emerald-500 hover:bg-slate-900 transition-all group flex flex-col">
                  <span className="text-2xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">✅</span>
                  <h5 className="font-semibold text-slate-200 mb-1 tracking-tight">Consent Audit Trail</h5>
                  <p className="text-xs text-slate-500">Complete historical consent changes and statuses</p>
                </button>
                <button className="bg-slate-950 border border-slate-800 rounded-lg p-5 text-left hover:border-emerald-500 hover:bg-slate-900 transition-all group flex flex-col">
                  <span className="text-2xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">📋</span>
                  <h5 className="font-semibold text-slate-200 mb-1 tracking-tight">Subject Requests Log</h5>
                  <p className="text-xs text-slate-500">All DSARs, statuses, and response time metrics</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
