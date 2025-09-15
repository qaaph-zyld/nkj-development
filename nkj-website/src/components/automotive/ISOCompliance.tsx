'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
    case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'non-compliant': return 'bg-red-100 text-red-800 border-red-200';
    case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'major': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getActionStatusColor = (status: string) => {
  switch (status) {
    case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'verified': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'open': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getAuditStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ISOCompliance() {
  const [selectedTab, setSelectedTab] = useState<'standards' | 'actions' | 'audits' | 'reports'>('standards');

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            ISO Compliance Management
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Comprehensive automotive industry standards compliance tracking with automated reporting and audit management
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'standards', label: 'Standards Overview', icon: '📋' },
              { id: 'actions', label: 'Corrective Actions', icon: '🔧' },
              { id: 'audits', label: 'Audit Schedule', icon: '📅' },
              { id: 'reports', label: 'Compliance Reports', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'standards' | 'actions' | 'audits' | 'reports')}
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
          {selectedTab === 'standards' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Compliance Standards Overview</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Add Standard
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockComplianceStandards.map((standard) => (
                  <motion.div
                    key={standard.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-automotive-carbon">{standard.name}</h4>
                        <p className="text-sm text-automotive-steel">{standard.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(standard.status)}`}>
                        {standard.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-automotive-steel">Compliance Score:</span>
                        <span className="text-lg font-bold text-automotive-carbon">{standard.score.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            standard.score >= 95 ? 'bg-green-500' :
                            standard.score >= 85 ? 'bg-blue-500' :
                            standard.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${standard.score}%` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-automotive-steel">Requirements:</span>
                          <div className="font-medium text-automotive-carbon">
                            {standard.compliantRequirements}/{standard.requirements}
                          </div>
                        </div>
                        <div>
                          <span className="text-automotive-steel">Last Audit:</span>
                          <div className="font-medium text-automotive-carbon">{standard.lastAudit}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                        <div className="text-center">
                          <div className="font-bold text-red-600">{standard.criticalFindings}</div>
                          <div className="text-automotive-steel">Critical</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-orange-600">{standard.majorFindings}</div>
                          <div className="text-automotive-steel">Major</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-yellow-600">{standard.minorFindings}</div>
                          <div className="text-automotive-steel">Minor</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'actions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Corrective Actions</h3>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  + New Action
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Action ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Standard</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Requirement</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Severity</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Assigned To</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Due Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockComplianceActions.map((action) => (
                      <tr key={action.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-automotive-carbon">{action.id}</td>
                        <td className="py-4 px-4 text-automotive-steel">
                          {mockComplianceStandards.find(s => s.id === action.standardId)?.name || action.standardId}
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{action.requirement}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(action.severity)}`}>
                            {action.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActionStatusColor(action.status)}`}>
                            {action.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{action.assignedTo}</td>
                        <td className="py-4 px-4 text-automotive-steel">{action.dueDate}</td>
                        <td className="py-4 px-4">
                          <button className="text-primary-500 hover:text-primary-600 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'audits' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Audit Schedule</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Schedule Audit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-automotive-steel">Scheduled Audits</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600">2</div>
                  <div className="text-sm text-automotive-steel">In Progress</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-automotive-steel">Completed YTD</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">94.2%</div>
                  <div className="text-sm text-automotive-steel">Avg Score</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Audit ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Standard</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Auditor</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAuditSchedule.map((audit) => (
                      <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-automotive-carbon">{audit.id}</td>
                        <td className="py-4 px-4 text-automotive-steel">
                          {mockComplianceStandards.find(s => s.id === audit.standardId)?.name || audit.standardId}
                        </td>
                        <td className="py-4 px-4 text-automotive-steel capitalize">{audit.auditType}</td>
                        <td className="py-4 px-4 text-automotive-steel">{audit.scheduledDate}</td>
                        <td className="py-4 px-4 text-automotive-steel">{audit.auditor}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAuditStatusColor(audit.status)}`}>
                            {audit.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{audit.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'reports' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Compliance Reports</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Compliance Dashboard
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Executive summary of all compliance standards
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">📋</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Audit Report
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Detailed audit findings and recommendations
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">🔧</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Action Plan Report
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Corrective actions status and timeline
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Trend Analysis
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Compliance performance over time
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">⚠️</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Risk Assessment
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Compliance risk matrix and mitigation
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">📅</div>
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-2">
                    Certification Status
                  </h4>
                  <p className="text-sm text-automotive-steel">
                    Certificate validity and renewal schedule
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
