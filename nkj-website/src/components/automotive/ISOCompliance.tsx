'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// ... (rest of the file content needs to be read first, I will keep the interfaces and mock data)
interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  lastAudit: string;
  nextAudit: string;
  score: number;
  requirements: number;
  compliantRequirements: number;
  criticalFindings: number;
  majorFindings: number;
  minorFindings: number;
}

interface ComplianceAction {
  id: string;
  standardId: string;
  requirement: string;
  finding: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'in-progress' | 'resolved' | 'verified';
  assignedTo: string;
  dueDate: string;
  description: string;
}

interface AuditSchedule {
  id: string;
  standardId: string;
  auditType: 'internal' | 'external' | 'surveillance' | 'recertification';
  scheduledDate: string;
  auditor: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scope: string;
}

const mockComplianceStandards: ComplianceStandard[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    description: 'Quality Management Systems - Requirements',
    version: '2015',
    status: 'compliant',
    lastAudit: '2023-11-15',
    nextAudit: '2024-11-15',
    score: 96.8,
    requirements: 125,
    compliantRequirements: 121,
    criticalFindings: 0,
    majorFindings: 2,
    minorFindings: 8
  },
  {
    id: 'ts-16949',
    name: 'IATF 16949:2016',
    description: 'Automotive Quality Management System Standard',
    version: '2016',
    status: 'compliant',
    lastAudit: '2023-12-08',
    nextAudit: '2024-12-08',
    score: 94.2,
    requirements: 186,
    compliantRequirements: 175,
    criticalFindings: 0,
    majorFindings: 3,
    minorFindings: 12
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    description: 'Environmental Management Systems',
    version: '2015',
    status: 'partial',
    lastAudit: '2023-10-22',
    nextAudit: '2024-04-22',
    score: 87.5,
    requirements: 98,
    compliantRequirements: 86,
    criticalFindings: 1,
    majorFindings: 4,
    minorFindings: 7
  },
  {
    id: 'iso-45001',
    name: 'ISO 45001:2018',
    description: 'Occupational Health and Safety Management Systems',
    version: '2018',
    status: 'pending',
    lastAudit: '2023-09-10',
    nextAudit: '2024-03-10',
    score: 82.3,
    requirements: 112,
    compliantRequirements: 92,
    criticalFindings: 2,
    majorFindings: 6,
    minorFindings: 12
  }
];

const mockComplianceActions: ComplianceAction[] = [
  {
    id: 'CA-001',
    standardId: 'iso-14001',
    requirement: '6.1.2 Environmental Aspects',
    finding: 'Environmental aspects register needs updating for new production line',
    severity: 'critical',
    status: 'in-progress',
    assignedTo: 'Environmental Manager',
    dueDate: '2024-02-15',
    description: 'Update environmental aspects register to include new automotive paint line operations'
  },
  {
    id: 'CA-002',
    standardId: 'ts-16949',
    requirement: '8.3.2.3 Product Design Output',
    finding: 'Design output documentation incomplete for brake component specifications',
    severity: 'major',
    status: 'open',
    assignedTo: 'Design Engineer',
    dueDate: '2024-02-28',
    description: 'Complete design output documentation including material specifications and testing requirements'
  },
  {
    id: 'CA-003',
    standardId: 'iso-45001',
    requirement: '8.1.1 Operational Planning',
    finding: 'Risk assessment for new equipment installation not documented',
    severity: 'major',
    status: 'resolved',
    assignedTo: 'Safety Officer',
    dueDate: '2024-01-30',
    description: 'Conduct and document risk assessment for new automated assembly equipment'
  }
];

const mockAuditSchedule: AuditSchedule[] = [
  {
    id: 'AUD-001',
    standardId: 'iso-9001',
    auditType: 'surveillance',
    scheduledDate: '2024-02-20',
    auditor: 'BSI Group',
    status: 'scheduled',
    scope: 'Quality Management System - Production and Design'
  },
  {
    id: 'AUD-002',
    standardId: 'ts-16949',
    auditType: 'internal',
    scheduledDate: '2024-02-15',
    auditor: 'Internal Audit Team',
    status: 'in-progress',
    scope: 'Customer-Specific Requirements and Product Safety'
  },
  {
    id: 'AUD-003',
    standardId: 'iso-14001',
    auditType: 'recertification',
    scheduledDate: '2024-03-10',
    auditor: 'Lloyd\'s Register',
    status: 'scheduled',
    scope: 'Environmental Management System - Full Scope'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'partial': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'non-compliant': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'pending': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'major': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'minor': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getActionStatusColor = (status: string) => {
  switch (status) {
    case 'resolved': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'in-progress': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'verified': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    case 'open': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getAuditStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'in-progress': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'scheduled': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'cancelled': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

export default function ISOCompliance() {
  const [selectedTab, setSelectedTab] = useState<'standards' | 'actions' | 'audits' | 'reports'>('standards');

  const tabs = [
    { id: 'standards', label: 'Standards Overview', icon: '📋' },
    { id: 'actions', label: 'Corrective Actions', icon: '🔧' },
    { id: 'audits', label: 'Audit Schedule', icon: '📅' },
    { id: 'reports', label: 'Compliance Reports', icon: '📊' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'standards' | 'actions' | 'audits' | 'reports')}
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
        {selectedTab === 'standards' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Compliance Standards Overview</h3>
                <p className="text-sm text-slate-400 mt-1">Track alignment against international standards</p>
              </div>
              <button className="nkj-button-secondary text-sm whitespace-nowrap">
                Add Standard
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockComplianceStandards.map((standard, index) => (
                <motion.div
                  key={standard.id}
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-base font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors tracking-tight">{standard.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-[250px] line-clamp-2">{standard.description}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(standard.status)}`}>
                      {standard.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance Score</span>
                      <span className="text-lg font-bold text-slate-50 tracking-tight">{standard.score.toFixed(1)}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          standard.score >= 95 ? 'bg-emerald-500' :
                          standard.score >= 85 ? 'bg-sky-500' :
                          standard.score >= 75 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${standard.score}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-6 mb-2">
                      <div>
                        <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Requirements</span>
                        <div className="font-mono text-slate-300">
                          {standard.compliantRequirements}/{standard.requirements}
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Last Audit</span>
                        <div className="font-medium text-slate-300">
                          {new Date(standard.lastAudit).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800">
                      <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800/50">
                        <div className="font-bold text-red-500">{standard.criticalFindings}</div>
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Critical</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800/50">
                        <div className="font-bold text-amber-500">{standard.majorFindings}</div>
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Major</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800/50">
                        <div className="font-bold text-sky-500">{standard.minorFindings}</div>
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Minor</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'actions' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Corrective Actions</h3>
                <p className="text-sm text-slate-400 mt-1">Manage and track audit findings and remediation</p>
              </div>
              <button className="nkj-button-primary bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm whitespace-nowrap">
                New Action Plan
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Standard</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Finding</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned To</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockComplianceActions.map((action) => (
                    <motion.tr 
                      key={action.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-slate-400">{action.id}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">
                        {mockComplianceStandards.find(s => s.id === action.standardId)?.name || action.standardId}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400 max-w-xs truncate" title={action.finding}>
                        {action.finding}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(action.severity)}`}>
                          {action.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getActionStatusColor(action.status)}`}>
                          {action.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-300">{action.assignedTo}</td>
                      <td className="py-4 px-4 text-sm text-slate-400 whitespace-nowrap">
                        {new Date(action.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'audits' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Audit Schedule</h3>
                <p className="text-sm text-slate-400 mt-1">Manage internal and external certification audits</p>
              </div>
              <button className="nkj-button-secondary text-sm whitespace-nowrap">
                Schedule Audit
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm text-center">
                <div className="text-2xl font-bold text-sky-500 tracking-tight mb-1">6</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Scheduled</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm text-center">
                <div className="text-2xl font-bold text-amber-500 tracking-tight mb-1">2</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">In Progress</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm text-center">
                <div className="text-2xl font-bold text-emerald-500 tracking-tight mb-1">12</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Completed YTD</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm text-center">
                <div className="text-2xl font-bold text-indigo-500 tracking-tight mb-1">94.2%</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Avg Score</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Standard</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Auditor</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockAuditSchedule.map((audit) => (
                    <motion.tr 
                      key={audit.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-slate-400">{audit.id}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">
                        {mockComplianceStandards.find(s => s.id === audit.standardId)?.name || audit.standardId}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400 capitalize">{audit.auditType}</td>
                      <td className="py-4 px-4 text-sm text-slate-400 whitespace-nowrap">
                        {new Date(audit.scheduledDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-300">{audit.auditor}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getAuditStatusColor(audit.status)}`}>
                          {audit.status.replace('-', ' ')}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Compliance Reporting</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
                <div className="text-3xl mb-4 opacity-80">📊</div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-1">Executive Summary</h4>
                <p className="text-xs text-slate-500">Overall compliance status</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <div className="text-3xl mb-4 opacity-80">📋</div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-1">Audit Findings</h4>
                <p className="text-xs text-slate-500">Detailed gap analysis</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                <div className="text-3xl mb-4 opacity-80">🔧</div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-1">Action Plan Status</h4>
                <p className="text-xs text-slate-500">Remediation tracking</p>
              </motion.div>

              <motion.div
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <div className="text-3xl mb-4 opacity-80">📅</div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-1">Certification Matrix</h4>
                <p className="text-xs text-slate-500">Renewal schedules</p>
              </motion.div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Generate New Report</h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center border-dashed">
                <div className="text-4xl mb-4 opacity-50 grayscale">📑</div>
                <h4 className="text-base font-semibold text-slate-300 mb-2 tracking-tight">
                  Custom Report Builder
                </h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                  Select specific standards, date ranges, and output formats to generate customized compliance documentation.
                </p>
                <button className="nkj-button-primary text-sm">
                  Launch Report Builder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
