'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FacilityLayout {
  id: string;
  name: string;
  type: 'production' | 'warehouse' | 'office' | 'quality';
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number; depth: number };
  status: 'active' | 'maintenance' | 'idle' | 'offline';
  utilization: number;
  capacity: number;
}

interface WorkflowStep {
  id: string;
  name: string;
  fromFacility: string;
  toFacility: string;
  duration: number;
  status: 'active' | 'completed' | 'pending' | 'blocked';
  progress: number;
}

const mockFacilityLayouts: FacilityLayout[] = [
  {
    id: 'prod-line-1',
    name: 'Production Line 1 - Engine Assembly',
    type: 'production',
    position: { x: -20, y: 0, z: 0 },
    dimensions: { width: 15, height: 5, depth: 8 },
    status: 'active',
    utilization: 85,
    capacity: 100
  },
  {
    id: 'prod-line-2',
    name: 'Production Line 2 - Transmission',
    type: 'production',
    position: { x: 0, y: 0, z: 0 },
    dimensions: { width: 12, height: 5, depth: 6 },
    status: 'active',
    utilization: 72,
    capacity: 80
  },
  {
    id: 'quality-station',
    name: 'Quality Control Station',
    type: 'quality',
    position: { x: 20, y: 0, z: 0 },
    dimensions: { width: 8, height: 4, depth: 6 },
    status: 'active',
    utilization: 95,
    capacity: 100
  },
  {
    id: 'warehouse-1',
    name: 'Raw Materials Warehouse',
    type: 'warehouse',
    position: { x: -10, y: 0, z: -15 },
    dimensions: { width: 20, height: 8, depth: 10 },
    status: 'active',
    utilization: 68,
    capacity: 1000
  },
  {
    id: 'warehouse-2',
    name: 'Finished Goods Warehouse',
    type: 'warehouse',
    position: { x: 10, y: 0, z: 15 },
    dimensions: { width: 18, height: 8, depth: 12 },
    status: 'active',
    utilization: 45,
    capacity: 800
  },
  {
    id: 'office-1',
    name: 'Administrative Office',
    type: 'office',
    position: { x: -25, y: 0, z: 15 },
    dimensions: { width: 10, height: 6, depth: 8 },
    status: 'active',
    utilization: 60,
    capacity: 50
  }
];

const mockWorkflowSteps: WorkflowStep[] = [
  {
    id: 'step-1',
    name: 'Material Transfer to Production',
    fromFacility: 'warehouse-1',
    toFacility: 'prod-line-1',
    duration: 15,
    status: 'active',
    progress: 65
  },
  {
    id: 'step-2',
    name: 'Engine to Transmission Assembly',
    fromFacility: 'prod-line-1',
    toFacility: 'prod-line-2',
    duration: 30,
    status: 'active',
    progress: 40
  },
  {
    id: 'step-3',
    name: 'Quality Inspection',
    fromFacility: 'prod-line-2',
    toFacility: 'quality-station',
    duration: 20,
    status: 'pending',
    progress: 0
  },
  {
    id: 'step-4',
    name: 'Finished Goods Storage',
    fromFacility: 'quality-station',
    toFacility: 'warehouse-2',
    duration: 10,
    status: 'completed',
    progress: 100
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 border-green-200';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'idle': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'offline': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function FacilityVisualization() {
  const [selectedView, setSelectedView] = useState<'overview' | 'production' | 'warehouse' | 'workflow'>('overview');
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            3D Facility Visualization
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Interactive 3D visualization of automotive manufacturing facilities with real-time workflow animation and performance monitoring
          </p>
        </motion.div>

        {/* View Controls */}
        <div className="flex justify-center mb-8">
          <div className="nkj-card p-1">
            {[
              { id: 'overview', label: 'Facility Overview', icon: '🏭' },
              { id: 'production', label: 'Production Lines', icon: '⚙️' },
              { id: 'warehouse', label: 'Warehouses', icon: '📦' },
              { id: 'workflow', label: 'Workflow Animation', icon: '🔄' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id as 'overview' | 'production' | 'warehouse' | 'workflow')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedView === view.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{view.icon}</span>
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 3D Visualization Placeholder */}
          <div className="lg:col-span-3">
            <div className="nkj-card overflow-hidden">
              <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Interactive 3D Factory Layout
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isAnimating 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isAnimating ? 'Stop Animation' : 'Start Animation'}
                  </button>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    Reset View
                  </button>
                </div>
              </div>
              <div className="w-full h-96 lg:h-[600px] bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏭</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">3D Factory Visualization</h4>
                  <p className="text-gray-600 mb-4">Interactive WebGL-based facility layout with real-time monitoring</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-gray-800 rounded-lg p-3 shadow">
                      <div className="text-2xl mb-1">⚙️</div>
                      <div className="text-sm font-medium text-white">Production Lines</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 shadow">
                      <div className="text-2xl mb-1">📦</div>
                      <div className="text-sm font-medium text-white">Warehouses</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 shadow">
                      <div className="text-2xl mb-1">🔍</div>
                      <div className="text-sm font-medium text-white">Quality Control</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 shadow">
                      <div className="text-2xl mb-1">🏢</div>
                      <div className="text-sm font-medium text-white">Administration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Facility Information Panel */}
          <div className="space-y-6">
            <div className="nkj-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Facility Status
              </h4>
              <div className="space-y-4">
                {mockFacilityLayouts.slice(0, 4).map((facility) => (
                  <motion.div
                    key={facility.id}
                    className="p-3 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => console.log('Selected facility:', facility.name)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-white text-sm">
                        {facility.name}
                      </h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(facility.status)}`}>
                        {facility.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Utilization:</span>
                      <span className="font-medium text-white">{facility.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${facility.utilization}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="nkj-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Active Workflows
              </h4>
              <div className="space-y-3">
                {mockWorkflowSteps.map((step) => (
                  <div key={step.id} className="p-3 rounded-lg bg-gray-800">
                    <div className="text-sm font-medium text-white mb-1">
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      {step.duration} min duration
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">Progress:</span>
                      <span className="font-medium text-white">{step.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          step.status === 'active' ? 'bg-blue-500' :
                          step.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🎮</div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Interactive Controls
              </h4>
              <p className="text-sm text-automotive-steel">
                Click and drag to rotate • Scroll to zoom • Click facilities for details
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
