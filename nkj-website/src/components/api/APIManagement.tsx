'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
      case 'GET': return 'bg-automotive-success text-white';
      case 'POST': return 'bg-primary-500 text-white';
      case 'PUT': return 'bg-automotive-warning text-white';
      case 'DELETE': return 'bg-automotive-danger text-white';
      default: return 'bg-automotive-steel text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-automotive-success';
      case 'beta': return 'text-automotive-warning';
      case 'deprecated': return 'text-automotive-danger';
      default: return 'text-automotive-steel';
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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            API Management Platform
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive API integration hub for automotive systems and third-party connectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Endpoints List */}
          <motion.div
            className="nkj-card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Available Endpoints
            </h3>
            
            <div className="space-y-4">
              {apiEndpoints.map((endpoint) => (
                <motion.div
                  key={endpoint.id}
                  className={`p-4 bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedEndpoint?.id === endpoint.id
                      ? 'border-primary-500 shadow-lg'
                      : 'border-automotive-chrome hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedEndpoint(endpoint)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className="font-semibold text-white">
                        {endpoint.name}
                      </span>
                    </div>
                    <span className={`text-sm font-medium capitalize ${getStatusColor(endpoint.status)}`}>
                      {endpoint.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    {endpoint.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{endpoint.path}</span>
                    <div className="flex space-x-4">
                      <span>{endpoint.responseTime}ms</span>
                      <span>{endpoint.usage}% uptime</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* API Testing Interface */}
          <motion.div
            className="nkj-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              API Testing Console
            </h3>
            
            {selectedEndpoint ? (
              <div>
                <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    {selectedEndpoint.name}
                  </h4>
                  <p className="text-sm text-gray-300 mb-3">
                    {selectedEndpoint.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </span>
                    <code className="text-sm bg-gray-700 text-green-400 px-2 py-1 rounded">
                      {selectedEndpoint.path}
                    </code>
                  </div>
                  
                  <button
                    onClick={() => testEndpoint(selectedEndpoint)}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Test Endpoint
                  </button>
                </div>
                
                {testResult && (
                  <motion.div
                    className="bg-automotive-carbon text-white p-4 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h5 className="font-semibold mb-2">Response:</h5>
                    <pre className="text-sm overflow-x-auto">
                      {testResult}
                    </pre>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔌</div>
                <p className="text-automotive-steel">
                  Select an endpoint to test
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Integration Partners */}
        <motion.div
          className="mt-12 bg-slate-50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-automotive-carbon mb-6">
            Integration Partners
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🏢</div>
              <h4 className="font-semibold text-automotive-carbon">SAP ERP</h4>
              <p className="text-sm text-automotive-steel">Enterprise Resource Planning</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">⚙️</div>
              <h4 className="font-semibold text-automotive-carbon">QAD MFG</h4>
              <p className="text-sm text-automotive-steel">Manufacturing Execution</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-semibold text-automotive-carbon">Ariba</h4>
              <p className="text-sm text-automotive-steel">Supplier Network</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-automotive-carbon">Power BI</h4>
              <p className="text-sm text-automotive-steel">Business Intelligence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
