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
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'warning':
      case 'partial':
      case 'investigating':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'critical':
      case 'non_compliant':
      case 'detected':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default: return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: '🛡️' },
    { id: 'incidents', label: 'Security Incidents', icon: '🚨' },
    { id: 'compliance', label: 'Compliance Status', icon: '✅' },
    { id: 'encryption', label: 'Encryption & Keys', icon: '🔐' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'incidents' | 'compliance' | 'encryption')}
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
        {/* Security Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Security Metrics Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors tracking-tight">{metric.name}</h4>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline space-x-2 mb-4">
                    <AnimatedCounter
                      end={metric.value}
                      decimals={metric.unit === '%' ? 1 : 0}
                      suffix={metric.unit}
                      className="text-3xl font-bold text-slate-50 tracking-tight"
                    />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      / {metric.target} {metric.unit} target
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        metric.status === 'secure' ? 'bg-emerald-500' :
                        metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Security Posture</h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                    <span className="text-sm font-medium text-slate-400">Overall Security Score</span>
                    <span className="text-2xl font-bold text-emerald-400 tracking-tight">A+</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                    <span className="text-sm font-medium text-slate-400">Active Threats Detected</span>
                    <span className="text-xl font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">2</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                    <span className="text-sm font-medium text-slate-400">Systems Protected</span>
                    <span className="text-xl font-bold text-sky-400">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Last Vulnerability Scan</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">System Audit Trail</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-slate-300">Firewall rules updated</h5>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">5 min ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-slate-300">SSL certificates renewed</h5>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">1 hour ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-slate-300">Security scan completed</h5>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">2 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-slate-300">Threat detected and blocked</h5>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">4 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Security Incidents</h3>
                <p className="text-sm text-slate-400 mt-1">Track and manage security events and breaches</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option>All Incidents</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <button className="nkj-button-primary text-sm whitespace-nowrap bg-red-600 hover:bg-red-700 text-white">
                  Report Incident
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {mockSecurityIncidents.map((incident) => (
                <motion.div
                  key={incident.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-200 capitalize tracking-tight group-hover:text-sky-400 transition-colors">
                        {incident.type.replace('_', ' ')}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">{incident.description}</p>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/50">
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Timestamp</span>
                      <div className="text-sm font-medium text-slate-300">{new Date(incident.timestamp).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Response Time</span>
                      <div className="text-sm font-mono text-slate-300">{incident.responseTime} minutes</div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Affected Systems</span>
                      <div className="flex flex-wrap gap-1.5">
                        {incident.affectedSystems.map((system) => (
                          <span key={system} className="px-2 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded text-[10px] font-medium">
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
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Security Compliance Standards</h3>
            
            <div className="space-y-6">
              {mockComplianceStandards.map((standard) => (
                <motion.div
                  key={standard.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                      <h4 className="font-bold text-slate-50 text-lg tracking-tight mb-1">{standard.name}</h4>
                      <p className="text-sm text-slate-400">{standard.description}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(standard.status)}`}>
                      {standard.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
                    <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-800/50">
                      <div className="text-3xl font-bold text-sky-500 tracking-tight mb-1">
                        <AnimatedCounter end={standard.compliance} decimals={1} suffix="%" />
                      </div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Overall Compliance</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-800/50">
                      <div className="text-2xl font-bold text-emerald-500 tracking-tight mb-2">{standard.requirements.met}</div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Requirements Met</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-800/50">
                      <div className="text-2xl font-bold text-amber-500 tracking-tight mb-2">{standard.requirements.pending}</div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Pending Action</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-800/50">
                      <div className="text-base font-semibold text-slate-300 mb-3">{new Date(standard.nextAudit).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Next Scheduled Audit</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completion Progress</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-sky-500 h-full rounded-full transition-all duration-1000 ease-out"
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
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-50 tracking-tight mb-8">Encryption & Key Management</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Encryption Status</h4>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Data at Rest</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">AES-256 ✓</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Data in Transit</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">TLS 1.3 ✓</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Database Encryption</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">ACTIVE ✓</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Backup Encryption</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">AES-256 ✓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Key Management</h4>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Active Keys</span>
                      <span className="text-xl font-bold text-sky-400 tracking-tight">24</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Keys Expiring Soon</span>
                      <span className="text-xl font-bold text-amber-400 tracking-tight bg-amber-500/10 px-3 py-0.5 rounded border border-amber-500/20">3</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                      <span className="text-sm font-medium text-slate-400">Key Rotation Frequency</span>
                      <span className="text-sm font-mono text-slate-300">90 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">HSM Status</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">ONLINE ✓</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Certificate Lifecycle Management</h4>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900 border border-slate-800 rounded-lg gap-3">
                      <div>
                        <div className="text-sm font-mono font-medium text-slate-200 tracking-tight">*.nkj-development.com</div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Expires: Dec 15, 2024</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-wider">Valid</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900 border border-slate-800 rounded-lg gap-3">
                      <div>
                        <div className="text-sm font-mono font-medium text-slate-200 tracking-tight">api.nkj-development.com</div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Expires: Aug 20, 2024</div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 uppercase tracking-wider">Expiring Soon</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900 border border-slate-800 rounded-lg gap-3">
                      <div>
                        <div className="text-sm font-mono font-medium text-slate-200 tracking-tight">admin.nkj-development.com</div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Expires: Mar 10, 2025</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-wider">Valid</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Security Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="nkj-button-secondary text-sm flex flex-col items-center justify-center p-4 h-24 hover:bg-slate-800 group">
                      <span className="text-xl mb-2 group-hover:scale-110 transition-transform">🔑</span>
                      <span>Rotate Keys</span>
                    </button>
                    <button className="nkj-button-secondary text-sm flex flex-col items-center justify-center p-4 h-24 hover:bg-slate-800 group">
                      <span className="text-xl mb-2 group-hover:scale-110 transition-transform">📜</span>
                      <span>Renew Certs</span>
                    </button>
                    <button className="nkj-button-secondary text-sm flex flex-col items-center justify-center p-4 h-24 hover:bg-slate-800 group">
                      <span className="text-xl mb-2 group-hover:scale-110 transition-transform">📊</span>
                      <span>Security Report</span>
                    </button>
                    <button className="nkj-button-secondary text-sm flex flex-col items-center justify-center p-4 h-24 hover:bg-slate-800 group border-amber-500/30 text-amber-400 hover:border-amber-500">
                      <span className="text-xl mb-2 group-hover:scale-110 transition-transform">🔍</span>
                      <span>Run Audit</span>
                    </button>
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
