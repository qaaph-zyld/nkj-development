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
    case 'active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'maintenance': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'idle': return 'bg-slate-800 text-slate-400 border border-slate-700';
    case 'offline': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

export default function FacilityVisualization() {
  const [selectedView, setSelectedView] = useState<'overview' | 'production' | 'warehouse' | 'workflow'>('overview');
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="w-full">
      {/* View Controls */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start gap-2 min-w-max md:min-w-0">
          {[
            { id: 'overview', label: 'Facility Overview', icon: '🏭' },
            { id: 'production', label: 'Production Lines', icon: '⚙️' },
            { id: 'warehouse', label: 'Warehouses', icon: '📦' },
            { id: 'workflow', label: 'Workflow Animation', icon: '🔄' }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as 'overview' | 'production' | 'warehouse' | 'workflow')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center whitespace-nowrap ${
                selectedView === view.id
                  ? 'bg-emerald-500 text-slate-50 shadow-sm border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="mr-2 opacity-80">{view.icon}</span>
              {view.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* 3D Visualization Placeholder */}
        <div className="xl:col-span-3 flex flex-col h-full min-h-[600px]">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/50">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">
                  Interactive 3D Factory Layout
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live telemetry active
                </p>
              </div>
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isAnimating 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-slate-200' 
                      : 'bg-emerald-500 text-slate-50 border border-emerald-400 hover:bg-emerald-600'
                  }`}
                >
                  {isAnimating ? (
                    <><span className="w-2 h-2 rounded-full bg-amber-500"></span> Pause</>
                  ) : (
                    <><span className="w-2 h-2 rounded-full bg-slate-50"></span> Resume</>
                  )}
                </button>
                <button className="flex-1 sm:flex-none nkj-button-secondary text-sm">
                  Reset View
                </button>
              </div>
            </div>
            
            <div className="flex-grow bg-[#0f172a] relative flex items-center justify-center min-h-[500px]">
              {/* Subtle grid background for the 3D viewport */}
              <div className="absolute inset-0 opacity-20">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-3d" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-3d)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]"></div>
              </div>
              
              <div className="text-center relative z-10 p-8">
                <div className="text-6xl mb-6 opacity-50 grayscale">🏭</div>
                <h4 className="text-xl font-bold text-slate-300 mb-2">3D WebGL Canvas Placeholder</h4>
                <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">The Three.js canvas will render here, displaying real-time facility telemetry and supply chain workflows.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2 opacity-80">⚙️</div>
                    <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Production</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2 opacity-80">📦</div>
                    <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Warehouses</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2 opacity-80">🔍</div>
                    <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Quality</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2 opacity-80">🏢</div>
                    <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Admin</div>
                  </div>
                </div>
              </div>
              
              {/* Overlaid Controls overlay */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-slate-600 shadow-sm transition-colors">+</button>
                <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-slate-600 shadow-sm transition-colors">−</button>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Information Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm h-full flex flex-col">
            <h4 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-5 flex items-center justify-between">
              Facility Telemetry
              <span className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded border border-slate-700">LIVE</span>
            </h4>
            
            <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {mockFacilityLayouts.slice(0, 4).map((facility) => (
                <motion.div
                  key={facility.id}
                  className="p-4 rounded-lg border border-slate-800 bg-slate-950/50 cursor-pointer hover:bg-slate-800 hover:border-slate-700 transition-colors group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-semibold text-slate-200 text-sm tracking-tight group-hover:text-emerald-400 transition-colors w-2/3 truncate">
                      {facility.name}
                    </h5>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(facility.status)}`}>
                      {facility.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium text-slate-500">Utilization</span>
                    <span className="font-bold text-slate-300">{facility.utilization}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        facility.utilization > 90 ? 'bg-emerald-500' :
                        facility.utilization > 70 ? 'bg-sky-500' :
                        facility.utilization > 50 ? 'bg-amber-500' : 'bg-slate-500'
                      }`}
                      style={{ width: `${facility.utilization}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-4">
                Active Workflows
              </h4>
              <div className="space-y-3">
                {mockWorkflowSteps.slice(0,2).map((step) => (
                  <div key={step.id} className="p-3 rounded-lg border border-slate-800 bg-slate-950/30">
                    <div className="text-xs font-semibold text-slate-300 mb-1 truncate">
                      {step.name}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                        {step.duration} min est.
                      </span>
                      <span className="text-[10px] font-bold text-sky-400">{step.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          step.status === 'active' ? 'bg-sky-500' :
                          step.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
