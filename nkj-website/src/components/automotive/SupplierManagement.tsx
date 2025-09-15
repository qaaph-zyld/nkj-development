'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  qualityRating: number;
  deliveryRating: number;
  costRating: number;
  overallScore: number;
  certifications: string[];
  status: 'active' | 'pending' | 'suspended' | 'terminated';
  riskLevel: 'low' | 'medium' | 'high';
  lastAudit: string;
  nextAudit: string;
  contractValue: number;
}


interface Certification {
  id: string;
  name: string;
  description: string;
  required: boolean;
  validityPeriod: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Premium Auto Components Ltd',
    category: 'Engine Parts',
    location: 'Birmingham, UK',
    qualityRating: 96.5,
    deliveryRating: 94.2,
    costRating: 88.7,
    overallScore: 93.1,
    certifications: ['ISO 9001', 'TS 16949', 'ISO 14001'],
    status: 'active',
    riskLevel: 'low',
    lastAudit: '2023-11-15',
    nextAudit: '2024-05-15',
    contractValue: 2500000
  },
  {
    id: 'SUP-002',
    name: 'European Brake Systems GmbH',
    category: 'Brake Components',
    location: 'Stuttgart, Germany',
    qualityRating: 98.2,
    deliveryRating: 96.8,
    costRating: 85.3,
    overallScore: 93.4,
    certifications: ['ISO 9001', 'TS 16949', 'VDA 6.3'],
    status: 'active',
    riskLevel: 'low',
    lastAudit: '2023-12-08',
    nextAudit: '2024-06-08',
    contractValue: 1800000
  },
  {
    id: 'SUP-003',
    name: 'Advanced Materials Inc',
    category: 'Raw Materials',
    location: 'Detroit, USA',
    qualityRating: 89.5,
    deliveryRating: 87.3,
    costRating: 92.1,
    overallScore: 89.6,
    certifications: ['ISO 9001', 'OHSAS 18001'],
    status: 'pending',
    riskLevel: 'medium',
    lastAudit: '2023-09-22',
    nextAudit: '2024-03-22',
    contractValue: 950000
  },
  {
    id: 'SUP-004',
    name: 'Precision Electronics Co',
    category: 'Electronics',
    location: 'Shenzhen, China',
    qualityRating: 85.7,
    deliveryRating: 82.4,
    costRating: 95.8,
    overallScore: 87.9,
    certifications: ['ISO 9001', 'IPC-A-610'],
    status: 'active',
    riskLevel: 'high',
    lastAudit: '2023-10-10',
    nextAudit: '2024-04-10',
    contractValue: 750000
  }
];

const automotiveCertifications: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001',
    description: 'Quality Management Systems',
    required: true,
    validityPeriod: '3 years'
  },
  {
    id: 'ts-16949',
    name: 'TS 16949',
    description: 'Automotive Quality Management Standard',
    required: true,
    validityPeriod: '3 years'
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001',
    description: 'Environmental Management Systems',
    required: false,
    validityPeriod: '3 years'
  },
  {
    id: 'vda-63',
    name: 'VDA 6.3',
    description: 'Process Audit Standard',
    required: false,
    validityPeriod: '3 years'
  },
  {
    id: 'ohsas-18001',
    name: 'OHSAS 18001',
    description: 'Occupational Health and Safety',
    required: false,
    validityPeriod: '3 years'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'suspended': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600';
  if (score >= 85) return 'text-blue-600';
  if (score >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

export default function SupplierManagement() {
  const [selectedTab, setSelectedTab] = useState<'suppliers' | 'performance' | 'certifications' | 'audits'>('suppliers');
  const [suppliers] = useState<Supplier[]>(mockSuppliers);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            Supplier Management System
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Comprehensive automotive supplier lifecycle management with quality tracking, certification monitoring, and risk assessment
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'suppliers', label: 'Supplier Directory', icon: '🏢' },
              { id: 'performance', label: 'Performance Metrics', icon: '📈' },
              { id: 'certifications', label: 'Certifications', icon: '🏆' },
              { id: 'audits', label: 'Audit Schedule', icon: '🔍' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'suppliers' | 'performance' | 'certifications' | 'audits')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedTab === tab.id
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

        {/* Content Panels */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          {selectedTab === 'suppliers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Supplier Directory</h3>
                <div className="flex space-x-2">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Import Suppliers
                  </button>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    + Add Supplier
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {suppliers.map((supplier) => (
                  <motion.div
                    key={supplier.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-automotive-carbon">{supplier.name}</h4>
                        <p className="text-sm text-automotive-steel">{supplier.category}</p>
                        <p className="text-sm text-automotive-steel">{supplier.location}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(supplier.status)}`}>
                          {supplier.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-automotive-steel">Overall Score:</span>
                        <span className={`text-lg font-bold ${getScoreColor(supplier.overallScore)}`}>
                          {supplier.overallScore.toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-automotive-steel">Quality:</span>
                          <span className="font-medium">{supplier.qualityRating.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-automotive-steel">Delivery:</span>
                          <span className="font-medium">{supplier.deliveryRating.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-automotive-steel">Cost:</span>
                          <span className="font-medium">{supplier.costRating.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-automotive-steel">Risk Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(supplier.riskLevel)}`}>
                          {supplier.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-automotive-steel">Contract Value:</span>
                        <span className="font-medium">£{supplier.contractValue.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.slice(0, 3).map((cert) => (
                            <span key={cert} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {cert}
                            </span>
                          ))}
                          {supplier.certifications.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{supplier.certifications.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'performance' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Supplier Performance Metrics</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-automotive-steel">Avg On-Time Delivery</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">96.8%</div>
                  <div className="text-sm text-automotive-steel">Avg Quality Score</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">2.3%</div>
                  <div className="text-sm text-automotive-steel">Cost Variance</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-automotive-steel">Active Incidents</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h4 className="text-xl font-semibold text-automotive-carbon mb-2">
                  Performance Analytics Dashboard
                </h4>
                <p className="text-automotive-steel mb-4">
                  Interactive charts showing supplier performance trends, benchmarking, and predictive analytics
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'certifications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Automotive Certifications</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Certification Audit
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {automotiveCertifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-automotive-carbon">{cert.name}</h4>
                        <p className="text-sm text-automotive-steel">{cert.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        cert.required ? 'bg-red-100 text-red-800 border-red-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {cert.required ? 'REQUIRED' : 'OPTIONAL'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-automotive-steel">Validity Period:</span>
                        <span className="font-medium text-automotive-carbon">{cert.validityPeriod}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-automotive-steel">Suppliers with this cert:</span>
                        <span className="font-medium text-automotive-carbon">
                          {suppliers.filter(s => s.certifications.includes(cert.name)).length} / {suppliers.length}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(suppliers.filter(s => s.certifications.includes(cert.name)).length / suppliers.length) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'audits' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Audit Schedule & Results</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Schedule Audit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-automotive-steel">Pending Audits</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-automotive-steel">Completed This Quarter</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-automotive-steel">Avg Audit Score</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Supplier</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Last Audit</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Next Audit</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-automotive-carbon">{supplier.name}</div>
                            <div className="text-sm text-automotive-steel">{supplier.category}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{supplier.lastAudit}</td>
                        <td className="py-4 px-4">
                          <span className={`font-medium ${getScoreColor(supplier.overallScore)}`}>
                            {supplier.overallScore.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{supplier.nextAudit}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            new Date(supplier.nextAudit) < new Date() ? 'bg-red-100 text-red-800 border-red-200' : 
                            new Date(supplier.nextAudit) < new Date(Date.now() + 30*24*60*60*1000) ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }`}>
                            {new Date(supplier.nextAudit) < new Date() ? 'OVERDUE' : 
                             new Date(supplier.nextAudit) < new Date(Date.now() + 30*24*60*60*1000) ? 'DUE SOON' : 'SCHEDULED'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-primary-500 hover:text-primary-600 font-medium">
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
