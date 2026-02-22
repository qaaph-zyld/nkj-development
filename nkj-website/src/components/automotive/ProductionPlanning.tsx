'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// ... (rest of the file content needs to be read first, I will keep the interfaces and mock data)
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
    case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default: return 'bg-slate-800 text-slate-400 border-slate-700';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'in-progress': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    case 'planned': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'delayed': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border-slate-700';
  }
};

const getLineStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-emerald-400';
    case 'maintenance': return 'text-amber-400';
    case 'idle': return 'text-slate-400';
    default: return 'text-slate-400';
  }
};

export default function ProductionPlanning() {
  const [selectedTab, setSelectedTab] = useState<'orders' | 'lines' | 'schedule'>('orders');
  const [orders] = useState<ProductionOrder[]>(mockProductionOrders);
  const [lines] = useState<ProductionLine[]>(mockProductionLines);

  const tabs = [
    { id: 'orders', label: 'Production Orders', icon: '📋' },
    { id: 'lines', label: 'Production Lines', icon: '🏭' },
    { id: 'schedule', label: 'Schedule View', icon: '📅' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'orders' | 'lines' | 'schedule')}
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
        {selectedTab === 'orders' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Production Orders</h3>
                <p className="text-sm text-slate-400 mt-1">Manage and track active manufacturing orders</p>
              </div>
              <button className="nkj-button-secondary text-sm whitespace-nowrap">
                New Order
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order ID</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Part Number</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantity</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Line</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {orders.map((order) => (
                    <motion.tr 
                      key={order.id} 
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-slate-300">{order.id}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-200">{order.partNumber}</td>
                      <td className="py-4 px-4 text-sm text-slate-400">{order.description}</td>
                      <td className="py-4 px-4 text-sm font-mono text-slate-300">{order.quantity.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(order.priority)}`}>
                          {order.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3 w-32">
                          <div className="flex-grow bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-400 w-8 text-right">{order.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{order.assignedLine}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'lines' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Production Lines Status</h3>
                <p className="text-sm text-slate-400 mt-1">Monitor real-time capacity and efficiency</p>
              </div>
              <button className="nkj-button-secondary text-sm whitespace-nowrap">
                Schedule Maintenance
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lines.map((line, index) => (
                <motion.div
                  key={line.id}
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-base font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">{line.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${line.status === 'active' ? 'bg-emerald-500 animate-pulse' : line.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-500'}`}></span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${getLineStatusColor(line.status)}`}>
                        {line.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400 font-medium">Capacity Utilization</span>
                        <span className="font-mono text-slate-300">
                          {line.currentLoad}/{line.capacity} <span className="text-slate-500 ml-1">({Math.round((line.currentLoad / line.capacity) * 100)}%)</span>
                        </span>
                      </div>
                      
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            (line.currentLoad / line.capacity) > 0.9 ? 'bg-red-500' :
                            (line.currentLoad / line.capacity) > 0.7 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(line.currentLoad / line.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                      <div>
                        <span className="block text-xs font-medium text-slate-500 mb-1">Efficiency</span>
                        <div className="font-semibold text-emerald-400 text-lg tracking-tight">{line.efficiency}%</div>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-slate-500 mb-1">Next Maintenance</span>
                        <div className="font-medium text-slate-300">{new Date(line.nextMaintenance).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'schedule' && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">Production Schedule</h3>
                <p className="text-sm text-slate-400 mt-1">Interactive timeline of planned manufacturing operations</p>
              </div>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 shadow-sm">
                  Week
                </button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                  Month
                </button>
              </div>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center border-dashed mb-8">
              <div className="text-4xl mb-4 opacity-50 grayscale">📅</div>
              <h4 className="text-base font-semibold text-slate-300 mb-2 tracking-tight">
                Advanced Scheduling Interface
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Interactive Gantt chart with drag-and-drop scheduling, resource allocation, and bottleneck analysis available in the full platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm flex flex-col items-center">
                <div className="text-2xl font-bold text-emerald-500 tracking-tight mb-1">24</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Active Orders</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm flex flex-col items-center">
                <div className="text-2xl font-bold text-sky-500 tracking-tight mb-1">94.2%</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Avg Efficiency</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm flex flex-col items-center">
                <div className="text-2xl font-bold text-amber-500 tracking-tight mb-1">3</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Bottlenecks</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
