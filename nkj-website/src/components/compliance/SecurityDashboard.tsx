'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'secure' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  category: 'encryption' | 'access' | 'monitoring' | 'compliance';
}

interface SecurityIncident {
  id: string;
  type: 'breach_attempt' | 'unauthorized_access' | 'malware' | 'phishing' | 'data_leak';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'investigating' | 'contained' | 'resolved';
  timestamp: string;
  description: string;
  affectedSystems: string[];
  responseTime: number;
}

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  compliance: number;
  lastAudit: string;
  nextAudit: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  requirements: {
    total: number;
    met: number;
    pending: number;
  };
}

const mockSecurityMetrics: SecurityMetric[] = [
  {
    id: 'encryption-coverage',
    name: 'Data Encryption Coverage',
    value: 99.8,
    target: 100,
    unit: '%',
    status: 'secure',
    trend: 'up',
    category: 'encryption'
  },
  {
    id: 'access-control',
    name: 'Access Control Compliance',
    value: 97.5,
    target: 98,
    unit: '%',
    status: 'secure',
    trend: 'stable',
    category: 'access'
  },
  {
    id: 'threat-detection',
    name: 'Threat Detection Rate',
    value: 99.2,
    target: 99,
    unit: '%',
    status: 'secure',
    trend: 'up',
    category: 'monitoring'
  },
  {
    id: 'incident-response',
    name: 'Incident Response Time',
    value: 12,
    target: 15,
    unit: 'min',
    status: 'secure',
    trend: 'down',
    category: 'monitoring'
  },
  {
    id: 'vulnerability-patching',
    name: 'Vulnerability Patching',
    value: 94.8,
    target: 95,
    unit: '%',
    status: 'warning',
    trend: 'up',
    category: 'compliance'
  },
  {
    id: 'user-training',
    name: 'Security Training Completion',
    value: 89.3,
    target: 95,
    unit: '%',
    status: 'warning',
    trend: 'up',
    category: 'compliance'
  }
];

const mockSecurityIncidents: SecurityIncident[] = [
  {
    id: 'inc-001',
    type: 'breach_attempt',
    severity: 'high',
    status: 'resolved',
    timestamp: '2024-01-15T14:30:00Z',
    description: 'Attempted SQL injection on production database',
    affectedSystems: ['Production DB', 'Web Application'],
    responseTime: 8
  },
  {
    id: 'inc-002',
    type: 'unauthorized_access',
    severity: 'medium',
    status: 'investigating',
    timestamp: '2024-01-14T09:15:00Z',
    description: 'Multiple failed login attempts from suspicious IP',
    affectedSystems: ['Authentication Service'],
    responseTime: 15
  },
  {
    id: 'inc-003',
    type: 'phishing',
    severity: 'low',
    status: 'contained',
    timestamp: '2024-01-13T16:45:00Z',
    description: 'Phishing email detected and quarantined',
    affectedSystems: ['Email System'],
    responseTime: 5
  }
];

const mockComplianceStandards: ComplianceStandard[] = [
  {
    id: 'iso-27001',
    name: 'ISO 27001',
    description: 'Information Security Management System',
    compliance: 96.5,
    lastAudit: '2023-11-15',
    nextAudit: '2024-11-15',
    status: 'compliant',
    requirements: { total: 114, met: 110, pending: 4 }
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    compliance: 94.2,
    lastAudit: '2023-12-01',
    nextAudit: '2024-06-01',
    status: 'compliant',
    requirements: { total: 99, met: 93, pending: 6 }
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2',
    compliance: 91.8,
    lastAudit: '2023-10-20',
    nextAudit: '2024-10-20',
    status: 'partial',
    requirements: { total: 64, met: 59, pending: 5 }
  }
];

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'compliance' | 'encryption'>('overview');
  const [metrics, setMetrics] = useState(mockSecurityMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'compliant':
      case 'resolved':
      case 'contained':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
      case 'partial':
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
      case 'non_compliant':
      case 'detected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: '🛡️' },
    { id: 'incidents', label: 'Security Incidents', icon: '🚨' },
    { id: 'compliance', label: 'Compliance Status', icon: '✅' },
    { id: 'encryption', label: 'Encryption & Keys', icon: '🔐' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Security & Encryption Dashboard
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive security monitoring, threat detection, and compliance management for automotive data protection
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'incidents' | 'compliance' | 'encryption')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Security Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Security Metrics Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    className="bg-slate-700 rounded-lg p-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-white">{metric.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-end space-x-2 mb-4">
                      <AnimatedCounter
                        end={metric.value}
                        decimals={metric.unit === '%' ? 1 : 0}
                        suffix={metric.unit}
                        className="text-3xl font-bold text-blue-400"
                      />
                      <span className="text-sm text-slate-300">
                        / {metric.target} {metric.unit}
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metric.status === 'secure' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Security Status</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Overall Security Score</span>
                      <span className="text-2xl font-bold text-green-400">A+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Active Threats</span>
                      <span className="text-xl font-bold text-yellow-400">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Systems Protected</span>
                      <span className="text-xl font-bold text-blue-400">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Last Security Scan</span>
                      <span className="text-sm text-slate-300">2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Firewall rules updated</span>
                      <span className="text-xs text-slate-400">5 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">SSL certificates renewed</span>
                      <span className="text-xs text-slate-400">1 hour ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Security scan completed</span>
                      <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Threat detected and blocked</span>
                      <span className="text-xs text-slate-400">4 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Incidents Tab */}
          {activeTab === 'incidents' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Security Incidents</h3>
                <div className="flex space-x-2">
                  <select className="bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2">
                    <option>All Incidents</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Report Incident
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {mockSecurityIncidents.map((incident) => (
                  <motion.div
                    key={incident.id}
                    className="bg-slate-700 rounded-lg p-4"
                    whileHover={{ backgroundColor: '#475569' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-white capitalize">
                          {incident.type.replace('_', ' ')}
                        </h4>
                        <p className="text-sm text-slate-300">{incident.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                          {incident.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Timestamp:</span>
                        <div className="text-slate-300">{new Date(incident.timestamp).toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Response Time:</span>
                        <div className="text-slate-300">{incident.responseTime} minutes</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Affected Systems:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {incident.affectedSystems.map((system) => (
                            <span key={system} className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                              {system}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Status Tab */}
          {activeTab === 'compliance' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Compliance Standards</h3>
              
              <div className="space-y-6">
                {mockComplianceStandards.map((standard) => (
                  <motion.div
                    key={standard.id}
                    className="bg-slate-700 rounded-lg p-6"
                    whileHover={{ backgroundColor: '#475569' }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-white text-lg">{standard.name}</h4>
                        <p className="text-sm text-slate-300">{standard.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(standard.status)}`}>
                        {standard.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-1">
                          <AnimatedCounter end={standard.compliance} decimals={1} suffix="%" />
                        </div>
                        <div className="text-sm text-slate-400">Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">{standard.requirements.met}</div>
                        <div className="text-sm text-slate-400">Requirements Met</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{standard.requirements.pending}</div>
                        <div className="text-sm text-slate-400">Pending</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-300 mb-1">Next Audit</div>
                        <div className="text-sm text-slate-400">{standard.nextAudit}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${standard.compliance}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Encryption & Keys Tab */}
          {activeTab === 'encryption' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Encryption & Key Management</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Encryption Status</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Data at Rest</span>
                        <span className="text-green-400 font-medium">AES-256 ✓</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Data in Transit</span>
                        <span className="text-green-400 font-medium">TLS 1.3 ✓</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Database Encryption</span>
                        <span className="text-green-400 font-medium">Enabled ✓</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Backup Encryption</span>
                        <span className="text-green-400 font-medium">AES-256 ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Management</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Active Keys</span>
                        <span className="text-blue-400 font-medium">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Keys Expiring Soon</span>
                        <span className="text-yellow-400 font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Key Rotation Frequency</span>
                        <span className="text-slate-300">90 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">HSM Status</span>
                        <span className="text-green-400 font-medium">Online ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Certificate Management</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                        <div>
                          <div className="text-white font-medium">*.nkj-development.com</div>
                          <div className="text-sm text-slate-400">Expires: 2024-12-15</div>
                        </div>
                        <span className="text-green-400">Valid</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                        <div>
                          <div className="text-white font-medium">api.nkj-development.com</div>
                          <div className="text-sm text-slate-400">Expires: 2024-08-20</div>
                        </div>
                        <span className="text-yellow-400">Expiring Soon</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                        <div>
                          <div className="text-white font-medium">admin.nkj-development.com</div>
                          <div className="text-sm text-slate-400">Expires: 2025-03-10</div>
                        </div>
                        <span className="text-green-400">Valid</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Security Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Rotate Encryption Keys
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Renew Certificates
                      </button>
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        Generate Security Report
                      </button>
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                        Run Security Audit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
