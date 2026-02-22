'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sampleQualityData from '@/data/sample-quality.json';

interface QualityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdated: string;
}

interface QualityIncident {
  id: string;
  partNumber: string;
  defectType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo: string;
  description: string;
}

interface InspectionResult {
  id: string;
  batchId: string;
  partNumber: string;
  inspectionType: string;
  result: 'pass' | 'fail' | 'conditional';
  defectsFound: number;
  inspector: string;
  timestamp: string;
}

const mapSampleDataToMetrics = (): QualityMetric[] => {
  // Calculate aggregates from sample data
  const totalInspected = sampleQualityData.reduce((acc, curr) => acc + curr.inspectedUnits, 0);
  const totalDefects = sampleQualityData.reduce((acc, curr) => acc + curr.defectiveUnits, 0);
  
  const avgFpy = sampleQualityData.reduce((acc, curr) => acc + curr.firstPassYield, 0) / sampleQualityData.length;
  const defectRate = (totalDefects / totalInspected) * 100;

  return [
    {
      id: 'defect-rate',
      name: 'Defect Rate',
      value: Number(defectRate.toFixed(2)),
      target: 1.0,
      unit: '%',
      trend: 'down',
      status: defectRate < 1.0 ? 'excellent' : defectRate < 2.0 ? 'warning' : 'critical',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'first-pass-yield',
      name: 'First Pass Yield',
      value: Number(avgFpy.toFixed(1)),
      target: 97.0,
      unit: '%',
      trend: 'up',
      status: avgFpy >= 97.0 ? 'excellent' : avgFpy >= 95.0 ? 'good' : 'warning',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'customer-complaints',
      name: 'Customer Complaints',
      value: 2, // Mocked for now
      target: 5,
      unit: 'per 1000',
      trend: 'stable',
      status: 'good',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'inspection-coverage',
      name: 'Inspection Coverage',
      value: 95.2, // Mocked
      target: 98.0,
      unit: '%',
      trend: 'up',
      status: 'warning',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'supplier-quality',
      name: 'Supplier Quality Score',
      value: 94.7, // Mocked
      target: 95.0,
      unit: '%',
      trend: 'down',
      status: 'warning',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'audit-score',
      name: 'ISO Audit Score',
      value: 96.8, // Mocked
      target: 95.0,
      unit: '%',
      trend: 'up',
      status: 'excellent',
      lastUpdated: new Date().toISOString()
    }
  ];
};

const mapSampleDataToIncidents = (): QualityIncident[] => {
  // Extract top defects into incidents
  const incidents: QualityIncident[] = [];
  sampleQualityData.forEach((record, index) => {
    record.topDefectTypes.forEach((defect, dIndex) => {
      // Create an incident for severe defects
      if (defect.severity === 'critical' || defect.severity === 'major') {
        incidents.push({
          id: `QI-${1000 + index * 10 + dIndex}`,
          partNumber: record.partCategory, // Using category as part number for demo
          defectType: defect.type,
          severity: defect.severity as QualityIncident['severity'],
          detectedAt: `Line ${record.productionLine}`,
          status: defect.severity === 'critical' ? 'investigating' : 'open',
          assignedTo: 'Quality Team',
          description: `${defect.count} units found with ${defect.type} during inspection on ${record.date}`
        });
      }
    });
  });
  return incidents.slice(0, 5); // Return top 5
};

const mockInspectionResults: InspectionResult[] = [
  {
    id: 'INS-001',
    batchId: 'B-2024-001',
    partNumber: 'ENG-V8-2024',
    inspectionType: 'Dimensional',
    result: 'pass',
    defectsFound: 0,
    inspector: 'Alice Brown',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: 'INS-002',
    batchId: 'B-2024-002',
    partNumber: 'BRAKE-DISC-F1',
    inspectionType: 'Visual',
    result: 'conditional',
    defectsFound: 2,
    inspector: 'Bob Davis',
    timestamp: '2024-01-15T09:30:00Z'
  },
  {
    id: 'INS-003',
    batchId: 'B-2024-003',
    partNumber: 'SUSP-STRUT-R2',
    inspectionType: 'Functional',
    result: 'pass',
    defectsFound: 0,
    inspector: 'Carol White',
    timestamp: '2024-01-15T10:00:00Z'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'good': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'warning': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'high': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getResultColor = (result: string) => {
  switch (result) {
    case 'pass': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'conditional': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'fail': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗';
    case 'down': return '↘';
    case 'stable': return '→';
    default: return '→';
  }
};

export default function QualityControl() {
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'incidents' | 'inspections'>('metrics');
  const [metrics, setMetrics] = useState<QualityMetric[]>([]);
  const [incidents, setIncidents] = useState<QualityIncident[]>([]);

  useEffect(() => {
    setMetrics(mapSampleDataToMetrics());
    setIncidents(mapSampleDataToIncidents());
  }, []);

  const tabs = [
    { id: 'metrics', label: 'Quality Metrics', icon: '📊' },
    { id: 'incidents', label: 'Quality Incidents', icon: '⚠️' },
    { id: 'inspections', label: 'Inspection Results', icon: '🔍' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'metrics' | 'incidents' | 'inspections')}
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
        {selectedTab === 'metrics' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-50 tracking-tight">Quality Metrics Overview</h3>
              <button className="nkj-button-secondary text-sm">
                Export Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  className="bg-slate-950 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">{metric.name}</h4>
                    <span className={`text-lg ${
                      metric.trend === 'up' ? 'text-emerald-500' : 
                      metric.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                    }`}>{getTrendIcon(metric.trend)}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-slate-50 tracking-tight">
                          {metric.value}
                        </span>
                        <span className="text-sm font-medium text-slate-500 ml-1">{metric.unit}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500">Target: {metric.target}{metric.unit}</span>
                      <span className="text-slate-500">
                        {new Date(metric.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          metric.status === 'excellent' ? 'bg-emerald-500' :
                          metric.status === 'good' ? 'bg-sky-500' :
                          metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quality Trends Chart Placeholder */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center border-dashed">
              <div className="text-4xl mb-4 opacity-50 grayscale">📈</div>
              <h4 className="text-base font-semibold text-slate-300 mb-2 tracking-tight">
                Quality Trends Analysis
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Interactive charts showing quality metrics over time with predictive analytics are available in the full platform.
              </p>
            </div>
          </div>
        )}

        {selectedTab === 'incidents' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Quality Incidents</h3>
                <p className="text-sm text-slate-400 mt-1">Track and manage non-conformance reports</p>
              </div>
              <button className="nkj-button-primary text-sm whitespace-nowrap">
                Report Incident
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Part Number</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Defect Type</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned To</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {incidents.map((incident) => (
                    <motion.tr 
                      key={incident.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-slate-300">{incident.id}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">{incident.partNumber}</td>
                      <td className="py-4 px-4 text-sm text-slate-400">{incident.defectType}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(incident.status === 'resolved' ? 'good' : 'warning')}`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{incident.assignedTo}</td>
                      <td className="py-4 px-4 text-right">
                        <button className="text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100">
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

        {selectedTab === 'inspections' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Recent Inspection Results</h3>
                <p className="text-sm text-slate-400 mt-1">Review batch inspection records and defect logs</p>
              </div>
              <button className="nkj-button-secondary text-sm whitespace-nowrap">
                Schedule Inspection
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-amber-500"></div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Inspection Summary</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-500 tracking-tight">85%</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Pass Rate</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-2xl font-bold text-amber-500 tracking-tight">12%</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Conditional</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-2xl font-bold text-red-500 tracking-tight">3%</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Fail Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Inspection Types Breakdown</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-400">Dimensional</span>
                      <span className="font-bold text-slate-300">45%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '45%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-400">Visual</span>
                      <span className="font-bold text-slate-300">30%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-sky-400 h-1.5 rounded-full" style={{ width: '30%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-400">Functional</span>
                      <span className="font-bold text-slate-300">25%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-sky-300 h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Batch ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Part Number</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Result</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Defects</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Inspector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockInspectionResults.map((inspection) => (
                    <motion.tr 
                      key={inspection.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-slate-400">{inspection.id}</td>
                      <td className="py-4 px-4 font-mono text-sm text-slate-300">{inspection.batchId}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">{inspection.partNumber}</td>
                      <td className="py-4 px-4 text-sm text-slate-400">{inspection.inspectionType}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getResultColor(inspection.result)}`}>
                          {inspection.result}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-300">{inspection.defectsFound}</td>
                      <td className="py-4 px-4 text-sm text-slate-400">
                        {inspection.inspector}
                        <div className="text-[10px] text-slate-500 mt-0.5">{new Date(inspection.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
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
