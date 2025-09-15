'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

const mockQualityMetrics: QualityMetric[] = [
  {
    id: 'defect-rate',
    name: 'Defect Rate',
    value: 0.8,
    target: 1.0,
    unit: '%',
    trend: 'down',
    status: 'excellent',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'first-pass-yield',
    name: 'First Pass Yield',
    value: 98.5,
    target: 97.0,
    unit: '%',
    trend: 'up',
    status: 'excellent',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'customer-complaints',
    name: 'Customer Complaints',
    value: 2,
    target: 5,
    unit: 'per 1000',
    trend: 'stable',
    status: 'good',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'inspection-coverage',
    name: 'Inspection Coverage',
    value: 95.2,
    target: 98.0,
    unit: '%',
    trend: 'up',
    status: 'warning',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'supplier-quality',
    name: 'Supplier Quality Score',
    value: 94.7,
    target: 95.0,
    unit: '%',
    trend: 'down',
    status: 'warning',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'audit-score',
    name: 'ISO Audit Score',
    value: 96.8,
    target: 95.0,
    unit: '%',
    trend: 'up',
    status: 'excellent',
    lastUpdated: '2024-01-15T10:30:00Z'
  }
];

const mockQualityIncidents: QualityIncident[] = [
  {
    id: 'QI-001',
    partNumber: 'ENG-V8-2024',
    defectType: 'Surface Roughness',
    severity: 'medium',
    detectedAt: 'Final Inspection',
    status: 'investigating',
    assignedTo: 'John Smith',
    description: 'Surface roughness exceeds specification on cylinder head'
  },
  {
    id: 'QI-002',
    partNumber: 'BRAKE-DISC-F1',
    defectType: 'Dimensional Variance',
    severity: 'high',
    detectedAt: 'In-Process Check',
    status: 'open',
    assignedTo: 'Sarah Johnson',
    description: 'Brake disc thickness variance beyond tolerance'
  },
  {
    id: 'QI-003',
    partNumber: 'TRANS-AUTO-X7',
    defectType: 'Material Defect',
    severity: 'critical',
    detectedAt: 'Incoming Inspection',
    status: 'resolved',
    assignedTo: 'Mike Wilson',
    description: 'Material hardness below specification'
  }
];

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
    case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
    case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getResultColor = (result: string) => {
  switch (result) {
    case 'pass': return 'bg-green-100 text-green-800 border-green-200';
    case 'conditional': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'fail': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export default function QualityControl() {
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'incidents' | 'inspections'>('metrics');

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            Quality Control Dashboard
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Comprehensive automotive quality management with real-time metrics, incident tracking, and ISO compliance monitoring
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'metrics', label: 'Quality Metrics', icon: '📊' },
              { id: 'incidents', label: 'Quality Incidents', icon: '⚠️' },
              { id: 'inspections', label: 'Inspection Results', icon: '🔍' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'metrics' | 'incidents' | 'inspections')}
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
          {selectedTab === 'metrics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Quality Metrics Overview</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Export Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {mockQualityMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-automotive-carbon">{metric.name}</h4>
                      <span className="text-xl">{getTrendIcon(metric.trend)}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold text-automotive-carbon">
                          {metric.value}
                        </span>
                        <span className="text-lg text-automotive-steel">{metric.unit}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-automotive-steel">Target: {metric.target}{metric.unit}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(metric.status)}`}>
                          {metric.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
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
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">📈</div>
                <h4 className="text-xl font-semibold text-automotive-carbon mb-2">
                  Quality Trends Analysis
                </h4>
                <p className="text-automotive-steel mb-4">
                  Interactive charts showing quality metrics over time with predictive analytics
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'incidents' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Quality Incidents</h3>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  + Report Incident
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Incident ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Part Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Defect Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Severity</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Detected At</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Assigned To</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockQualityIncidents.map((incident) => (
                      <tr key={incident.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-automotive-carbon">{incident.id}</td>
                        <td className="py-4 px-4 text-automotive-steel">{incident.partNumber}</td>
                        <td className="py-4 px-4 text-automotive-steel">{incident.defectType}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{incident.detectedAt}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status === 'resolved' ? 'good' : 'warning')}`}>
                            {incident.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{incident.assignedTo}</td>
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

          {selectedTab === 'inspections' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Recent Inspection Results</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Schedule Inspection
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-4">Inspection Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">85%</div>
                      <div className="text-sm text-automotive-steel">Pass Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">12%</div>
                      <div className="text-sm text-automotive-steel">Conditional</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">3%</div>
                      <div className="text-sm text-automotive-steel">Fail Rate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-automotive-carbon mb-4">Inspection Types</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-automotive-steel">Dimensional</span>
                      <span className="font-medium text-automotive-carbon">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-automotive-steel">Visual</span>
                      <span className="font-medium text-automotive-carbon">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-automotive-steel">Functional</span>
                      <span className="font-medium text-automotive-carbon">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Inspection ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Batch ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Part Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Result</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Defects</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Inspector</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInspectionResults.map((inspection) => (
                      <tr key={inspection.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-automotive-carbon">{inspection.id}</td>
                        <td className="py-4 px-4 text-automotive-steel">{inspection.batchId}</td>
                        <td className="py-4 px-4 text-automotive-steel">{inspection.partNumber}</td>
                        <td className="py-4 px-4 text-automotive-steel">{inspection.inspectionType}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getResultColor(inspection.result)}`}>
                            {inspection.result.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{inspection.defectsFound}</td>
                        <td className="py-4 px-4 text-automotive-steel">{inspection.inspector}</td>
                        <td className="py-4 px-4 text-automotive-steel">
                          {new Date(inspection.timestamp).toLocaleString()}
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
