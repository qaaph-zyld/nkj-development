'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductionOrder {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  startDate: string;
  endDate: string;
  assignedLine: string;
  progress: number;
}

interface ProductionLine {
  id: string;
  name: string;
  capacity: number;
  currentLoad: number;
  efficiency: number;
  status: 'active' | 'maintenance' | 'idle';
  nextMaintenance: string;
}

const mockProductionOrders: ProductionOrder[] = [
  {
    id: 'PO-001',
    partNumber: 'ENG-V8-2024',
    description: 'V8 Engine Block Assembly',
    quantity: 150,
    priority: 'high',
    status: 'in-progress',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    assignedLine: 'Line A',
    progress: 65
  },
  {
    id: 'PO-002',
    partNumber: 'TRANS-AUTO-X7',
    description: 'Automatic Transmission Unit',
    quantity: 200,
    priority: 'medium',
    status: 'planned',
    startDate: '2024-01-20',
    endDate: '2024-01-28',
    assignedLine: 'Line B',
    progress: 0
  },
  {
    id: 'PO-003',
    partNumber: 'BRAKE-DISC-F1',
    description: 'Front Brake Disc Set',
    quantity: 500,
    priority: 'high',
    status: 'completed',
    startDate: '2024-01-10',
    endDate: '2024-01-18',
    assignedLine: 'Line C',
    progress: 100
  },
  {
    id: 'PO-004',
    partNumber: 'SUSP-STRUT-R2',
    description: 'Rear Suspension Strut',
    quantity: 300,
    priority: 'low',
    status: 'delayed',
    startDate: '2024-01-12',
    endDate: '2024-01-25',
    assignedLine: 'Line A',
    progress: 45
  }
];

const mockProductionLines: ProductionLine[] = [
  {
    id: 'line-a',
    name: 'Line A - Engine Assembly',
    capacity: 100,
    currentLoad: 85,
    efficiency: 94.2,
    status: 'active',
    nextMaintenance: '2024-01-30'
  },
  {
    id: 'line-b',
    name: 'Line B - Transmission',
    capacity: 80,
    currentLoad: 60,
    efficiency: 91.8,
    status: 'active',
    nextMaintenance: '2024-02-05'
  },
  {
    id: 'line-c',
    name: 'Line C - Components',
    capacity: 150,
    currentLoad: 120,
    efficiency: 96.5,
    status: 'active',
    nextMaintenance: '2024-01-28'
  },
  {
    id: 'line-d',
    name: 'Line D - Quality Control',
    capacity: 200,
    currentLoad: 0,
    efficiency: 0,
    status: 'maintenance',
    nextMaintenance: '2024-01-25'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'planned': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getLineStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600';
    case 'maintenance': return 'text-orange-600';
    case 'idle': return 'text-gray-600';
    default: return 'text-gray-600';
  }
};

export default function ProductionPlanning() {
  const [selectedTab, setSelectedTab] = useState<'orders' | 'lines' | 'schedule'>('orders');
  const [orders] = useState<ProductionOrder[]>(mockProductionOrders);
  const [lines] = useState<ProductionLine[]>(mockProductionLines);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            Production Planning & Optimization
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Advanced automotive manufacturing workflow management with real-time capacity planning and resource optimization
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'orders', label: 'Production Orders', icon: '📋' },
              { id: 'lines', label: 'Production Lines', icon: '🏭' },
              { id: 'schedule', label: 'Schedule View', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'orders' | 'lines' | 'schedule')}
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
          {selectedTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Production Orders</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  + New Order
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Part Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-automotive-carbon">Line</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-automotive-carbon">{order.id}</td>
                        <td className="py-4 px-4 text-automotive-steel">{order.partNumber}</td>
                        <td className="py-4 px-4 text-automotive-steel">{order.description}</td>
                        <td className="py-4 px-4 text-automotive-steel">{order.quantity.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-automotive-steel">{order.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-automotive-steel">{order.assignedLine}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'lines' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Production Lines Status</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Schedule Maintenance
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lines.map((line) => (
                  <motion.div
                    key={line.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-automotive-carbon">{line.name}</h4>
                      <span className={`text-sm font-medium ${getLineStatusColor(line.status)}`}>
                        ● {line.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-automotive-steel">Capacity Utilization:</span>
                        <span className="font-medium text-automotive-carbon">
                          {line.currentLoad}/{line.capacity} ({Math.round((line.currentLoad / line.capacity) * 100)}%)
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            (line.currentLoad / line.capacity) > 0.9 ? 'bg-red-500' :
                            (line.currentLoad / line.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(line.currentLoad / line.capacity) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-automotive-steel">Efficiency:</span>
                        <span className="font-medium text-automotive-carbon">{line.efficiency}%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-automotive-steel">Next Maintenance:</span>
                        <span className="font-medium text-automotive-carbon">{line.nextMaintenance}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-automotive-carbon">Production Schedule</h3>
                <div className="flex space-x-2">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Week View
                  </button>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    Month View
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h4 className="text-xl font-semibold text-automotive-carbon mb-2">
                  Advanced Scheduling Interface
                </h4>
                <p className="text-automotive-steel mb-4">
                  Interactive Gantt chart with drag-and-drop scheduling, resource allocation, and bottleneck analysis
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-primary-500">24</div>
                    <div className="text-sm text-automotive-steel">Active Orders</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-green-500">94.2%</div>
                    <div className="text-sm text-automotive-steel">Avg Efficiency</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-orange-500">3</div>
                    <div className="text-sm text-automotive-steel">Bottlenecks</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
