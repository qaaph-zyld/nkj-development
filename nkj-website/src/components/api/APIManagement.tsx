'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  status: 'active' | 'deprecated' | 'beta';
  responseTime: number;
  usage: number;
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: '1',
    name: 'Production Data',
    method: 'GET',
    path: '/api/v1/production/metrics',
    description: 'Real-time production efficiency metrics',
    status: 'active',
    responseTime: 45,
    usage: 98.7
  },
  {
    id: '2',
    name: 'Quality Analytics',
    method: 'GET',
    path: '/api/v1/quality/scores',
    description: 'Quality control data and predictions',
    status: 'active',
    responseTime: 32,
    usage: 94.2
  },
  {
    id: '3',
    name: 'Supply Chain',
    method: 'POST',
    path: '/api/v1/supply-chain/optimize',
    description: 'Supply chain optimization requests',
    status: 'beta',
    responseTime: 156,
    usage: 78.5
  },
  {
    id: '4',
    name: 'Predictive Models',
    method: 'POST',
    path: '/api/v1/ml/predict',
    description: 'Machine learning prediction endpoints',
    status: 'active',
    responseTime: 89,
    usage: 91.3
  }
];

export default function APIManagement() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'POST': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default: return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'beta': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'deprecated': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-500 bg-slate-800 border-slate-700';
    }
  };

  const testEndpoint = async (endpoint: APIEndpoint) => {
    setTestResult('Testing...');
    
    // Simulate API test
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        responseTime: endpoint.responseTime,
        data: {
          success: true,
          message: `${endpoint.name} API is functioning correctly`,
          timestamp: new Date().toISOString()
        }
      };
      
      setTestResult(JSON.stringify(mockResponse, null, 2));
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Endpoints List */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-50 tracking-tight">
              Available Endpoints
            </h3>
            <span className="text-sm font-medium text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              v1.0.0
            </span>
          </div>
          
          <div className="space-y-4">
            {apiEndpoints.map((endpoint) => (
              <motion.div
                key={endpoint.id}
                className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 group ${
                  selectedEndpoint?.id === endpoint.id
                    ? 'bg-slate-800/80 border-emerald-500 shadow-sm'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
                onClick={() => setSelectedEndpoint(endpoint)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wider ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {endpoint.name}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(endpoint.status)}`}>
                    {endpoint.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-400 mb-4">
                  {endpoint.description}
                </p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
                  <code className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {endpoint.path}
                  </code>
                  <div className="flex space-x-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                      {endpoint.responseTime}ms
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50"></span>
                      {endpoint.usage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Testing Interface */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-50 tracking-tight">
              API Testing Console
            </h3>
            <span className="text-xl text-slate-600">⚡</span>
          </div>
          
          {selectedEndpoint ? (
            <div className="flex flex-col h-full">
              <div className="mb-6 p-5 bg-slate-950 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-slate-200 mb-2">
                  {selectedEndpoint.name}
                </h4>
                <p className="text-sm text-slate-400 mb-4">
                  {selectedEndpoint.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-6">
                  <span className={`inline-flex self-start px-2.5 py-1 rounded text-xs font-bold tracking-wider ${getMethodColor(selectedEndpoint.method)}`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 break-all">
                    {selectedEndpoint.path}
                  </code>
                </div>
                
                <button
                  onClick={() => testEndpoint(selectedEndpoint)}
                  className="w-full nkj-button-primary"
                >
                  Execute Request
                </button>
              </div>
              
              <div className="flex-grow flex flex-col">
                <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Response Output</h5>
                {testResult ? (
                  <motion.div
                    className="flex-grow bg-[#0d1117] text-slate-300 p-5 rounded-lg border border-slate-800 relative overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {testResult}
                    </pre>
                  </motion.div>
                ) : (
                  <div className="flex-grow flex items-center justify-center bg-slate-950/50 rounded-lg border border-slate-800 border-dashed p-8">
                    <p className="text-sm text-slate-500 font-medium">
                      Execute a request to see the response
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 bg-slate-950/30 rounded-lg border border-slate-800 border-dashed">
              <div className="text-5xl mb-6 opacity-50 grayscale">🔌</div>
              <h4 className="text-lg font-medium text-slate-300 mb-2">No Endpoint Selected</h4>
              <p className="text-sm text-slate-500 max-w-xs">
                Select an endpoint from the list to view its details and test the connection
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Integration Partners */}
      <motion.div
        className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Supported Enterprise Integrations
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-400 rounded">Seamless Connectivity</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center p-6 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏢</div>
            <h4 className="font-semibold text-slate-200 mb-1 text-center">SAP ERP</h4>
            <p className="text-xs text-slate-500 text-center">Enterprise Resource Planning</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚙️</div>
            <h4 className="font-semibold text-slate-200 mb-1 text-center">QAD MFG</h4>
            <p className="text-xs text-slate-500 text-center">Manufacturing Execution</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🤝</div>
            <h4 className="font-semibold text-slate-200 mb-1 text-center">Ariba</h4>
            <p className="text-xs text-slate-500 text-center">Supplier Network</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📊</div>
            <h4 className="font-semibold text-slate-200 mb-1 text-center">Power BI</h4>
            <p className="text-xs text-slate-500 text-center">Business Intelligence</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
