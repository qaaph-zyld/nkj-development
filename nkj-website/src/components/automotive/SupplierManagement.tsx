'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sampleSuppliersData from '@/data/sample-suppliers.json';

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
  status: 'active' | 'pending' | 'suspended' | 'terminated' | 'under_review';
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

const mapSampleDataToSuppliers = (): Supplier[] => {
  return sampleSuppliersData.map(sup => ({
    id: sup.supplierId,
    name: sup.name,
    category: sup.category,
    location: sup.country,
    qualityRating: 100 - (sup.metrics.qualityPPM / 100), // Simple conversion for demo
    deliveryRating: sup.metrics.onTimeDelivery,
    costRating: 90, // Not in sample, mock it
    overallScore: sup.metrics.overallScore,
    certifications: sup.certifications.map(c => c.name),
    status: sup.status as Supplier['status'],
    riskLevel: sup.riskLevel as Supplier['riskLevel'],
    lastAudit: '2023-11-15', // Mock
    nextAudit: sup.certifications[0]?.validUntil || '2024-12-31',
    contractValue: sup.annualSpend
  }));
};

const automotiveCertifications: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    description: 'Quality Management Systems',
    required: true,
    validityPeriod: '3 years'
  },
  {
    id: 'iatf-16949',
    name: 'IATF 16949:2016',
    description: 'Automotive Quality Management Standard',
    required: true,
    validityPeriod: '3 years'
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    description: 'Environmental Management Systems',
    required: false,
    validityPeriod: '3 years'
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001:2022',
    description: 'Information Security Management',
    required: false,
    validityPeriod: '3 years'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'pending': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'under_review': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'suspended': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    case 'terminated': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'high': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-emerald-400';
  if (score >= 85) return 'text-sky-400';
  if (score >= 75) return 'text-amber-400';
  return 'text-red-400';
};

export default function SupplierManagement() {
  const [selectedTab, setSelectedTab] = useState<'suppliers' | 'performance' | 'certifications' | 'audits'>('suppliers');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    setSuppliers(mapSampleDataToSuppliers());
  }, []);

  const tabs = [
    { id: 'suppliers', label: 'Supplier Directory', icon: '🏢' },
    { id: 'performance', label: 'Performance Metrics', icon: '📈' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'audits', label: 'Audit Schedule', icon: '🔍' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'suppliers' | 'performance' | 'certifications' | 'audits')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center whitespace-nowrap ${
                selectedTab === tab.id
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

      {/* Content Panels */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {selectedTab === 'suppliers' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Supplier Directory</h3>
                <p className="text-sm text-slate-400 mt-1">Manage automotive supplier lifecycle and risk (Loaded from sample data)</p>
              </div>
              <div className="flex space-x-2">
                <button className="nkj-button-secondary text-sm whitespace-nowrap">
                  Import Suppliers
                </button>
                <button className="nkj-button-primary text-sm whitespace-nowrap">
                  + Add Supplier
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {suppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.id}
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors tracking-tight">{supplier.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{supplier.category}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{supplier.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(supplier.status)}`}>
                        {supplier.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Overall Score</span>
                      <span className={`text-xl font-bold tracking-tight ${getScoreColor(supplier.overallScore)}`}>
                        {supplier.overallScore.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Quality</div>
                        <div className="font-medium text-slate-300">{supplier.qualityRating.toFixed(1)}%</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Delivery</div>
                        <div className="font-medium text-slate-300">{supplier.deliveryRating.toFixed(1)}%</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Cost</div>
                        <div className="font-medium text-slate-300">{supplier.costRating.toFixed(1)}%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-t border-slate-800">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(supplier.riskLevel)}`}>
                        {supplier.riskLevel}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm py-2 border-t border-slate-800">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Annual Spend</span>
                      <span className="font-mono text-slate-300">£{(supplier.contractValue / 1000000).toFixed(1)}M</span>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-800">
                      <div className="flex flex-wrap gap-1.5">
                        {supplier.certifications.slice(0, 3).map((cert) => (
                          <span key={cert} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-medium rounded border border-slate-700">
                            {cert}
                          </span>
                        ))}
                        {supplier.certifications.length > 3 && (
                          <span className="px-2 py-1 bg-slate-900 text-slate-500 text-[10px] font-medium rounded border border-slate-800">
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
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Supplier Performance Metrics</h3>
                <p className="text-sm text-slate-400 mt-1">Aggregated performance and risk indicators</p>
              </div>
              <button className="nkj-button-primary text-sm whitespace-nowrap">
                Generate Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-emerald-500 tracking-tight mb-2">94.2%</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Avg On-Time Delivery</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-sky-500 tracking-tight mb-2">96.8%</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Avg Quality Score</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-indigo-500 tracking-tight mb-2">2.3%</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Cost Variance</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-amber-500 tracking-tight mb-2">8</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Active Incidents</div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center border-dashed">
              <div className="text-4xl mb-4 opacity-50 grayscale">📊</div>
              <h4 className="text-base font-semibold text-slate-300 mb-2 tracking-tight">
                Performance Analytics Dashboard
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Interactive charts showing supplier performance trends, benchmarking, and predictive analytics are available in the full platform.
              </p>
            </div>
          </div>
        )}

        {selectedTab === 'certifications' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Automotive Certifications</h3>
                <p className="text-sm text-slate-400 mt-1">Track compliance with industry standards</p>
              </div>
              <button className="nkj-button-primary text-sm whitespace-nowrap">
                Certification Audit
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {automotiveCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors tracking-tight">{cert.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{cert.description}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      cert.required ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                    }`}>
                      {cert.required ? 'REQUIRED' : 'OPTIONAL'}
                    </span>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Validity Period</span>
                      <span className="font-mono text-sm text-slate-300">{cert.validityPeriod}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Rate</span>
                        <span className="font-mono text-slate-300">
                          {suppliers.filter(s => s.certifications.includes(cert.name)).length} / {suppliers.length}
                        </span>
                      </div>
                      
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${suppliers.length > 0 ? (suppliers.filter(s => s.certifications.includes(cert.name)).length / suppliers.length) * 100 : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'audits' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Audit Schedule & Results</h3>
                <p className="text-sm text-slate-400 mt-1">Manage supplier audits and corrective actions</p>
              </div>
              <button className="nkj-button-primary text-sm whitespace-nowrap">
                Schedule Audit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-amber-500 tracking-tight mb-2">3</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Pending Audits</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-sky-500 tracking-tight mb-2">12</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Completed This Year</div>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-bold text-emerald-500 tracking-tight mb-2">92%</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Avg Audit Score</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Audit</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Audit</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {suppliers.map((supplier) => (
                    <motion.tr 
                      key={supplier.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-slate-200">{supplier.name}</div>
                          <div className="text-xs text-slate-500 mt-1">{supplier.category}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{supplier.lastAudit}</td>
                      <td className="py-4 px-4">
                        <span className={`font-bold tracking-tight ${getScoreColor(supplier.overallScore)}`}>
                          {supplier.overallScore.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{supplier.nextAudit}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          new Date(supplier.nextAudit) < new Date() ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          new Date(supplier.nextAudit) < new Date(Date.now() + 30*24*60*60*1000) ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {new Date(supplier.nextAudit) < new Date() ? 'OVERDUE' : 
                           new Date(supplier.nextAudit) < new Date(Date.now() + 30*24*60*60*1000) ? 'DUE SOON' : 'SCHEDULED'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100">
                          View Report
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
