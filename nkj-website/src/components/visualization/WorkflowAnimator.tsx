'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  status: 'pending' | 'active' | 'completed' | 'blocked';
  progress: number;
  position: { x: number; y: number; z: number };
  connections: string[];
}

interface AnimationSettings {
  speed: number;
  showPaths: boolean;
  showLabels: boolean;
  autoRotate: boolean;
}

const mockWorkflowSteps: WorkflowStep[] = [
  {
    id: 'material-intake',
    name: 'Material Intake',
    description: 'Raw materials received and inspected',
    duration: 15,
    status: 'completed',
    progress: 100,
    position: { x: -30, y: 0, z: 0 },
    connections: ['pre-processing']
  },
  {
    id: 'pre-processing',
    name: 'Pre-Processing',
    description: 'Material preparation and sorting',
    duration: 20,
    status: 'completed',
    progress: 100,
    position: { x: -15, y: 0, z: 0 },
    connections: ['machining', 'assembly-prep']
  },
  {
    id: 'machining',
    name: 'CNC Machining',
    description: 'Precision machining operations',
    duration: 45,
    status: 'active',
    progress: 65,
    position: { x: 0, y: 0, z: -15 },
    connections: ['quality-check-1']
  },
  {
    id: 'assembly-prep',
    name: 'Assembly Preparation',
    description: 'Component preparation for assembly',
    duration: 25,
    status: 'active',
    progress: 40,
    position: { x: 0, y: 0, z: 15 },
    connections: ['final-assembly']
  },
  {
    id: 'quality-check-1',
    name: 'Quality Check 1',
    description: 'Initial quality inspection',
    duration: 15,
    status: 'pending',
    progress: 0,
    position: { x: 15, y: 0, z: -15 },
    connections: ['final-assembly']
  },
  {
    id: 'final-assembly',
    name: 'Final Assembly',
    description: 'Complete product assembly',
    duration: 35,
    status: 'pending',
    progress: 0,
    position: { x: 30, y: 0, z: 0 },
    connections: ['final-inspection']
  },
  {
    id: 'final-inspection',
    name: 'Final Inspection',
    description: 'Comprehensive quality validation',
    duration: 20,
    status: 'pending',
    progress: 0,
    position: { x: 45, y: 0, z: 0 },
    connections: []
  }
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'active': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'pending': return 'bg-slate-800 text-slate-400 border border-slate-700';
    case 'blocked': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border border-slate-700';
  }
};

export default function WorkflowAnimator() {
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [animationSettings, setAnimationSettings] = useState<AnimationSettings>({
    speed: 1.0,
    showPaths: true,
    showLabels: true,
    autoRotate: true
  });
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* 3D Animation Viewport Placeholder */}
        <div className="xl:col-span-3 flex flex-col h-full min-h-[600px]">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/50">
              <div>
                <h3 className="text-lg font-bold text-slate-50 tracking-tight">
                  3D Workflow Animation
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                  Process simulation running
                </p>
              </div>
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isPlaying 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-slate-200' 
                      : 'bg-emerald-500 text-slate-50 border border-emerald-400 hover:bg-emerald-600'
                  }`}
                >
                  {isPlaying ? (
                    <><span className="w-2 h-2 rounded-full bg-amber-500"></span> Pause</>
                  ) : (
                    <><span className="w-2 h-2 rounded-full bg-slate-50"></span> Play</>
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
                    <pattern id="grid-3d-anim" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-3d-anim)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]"></div>
              </div>
              
              <div className="text-center relative z-10 p-8">
                <div className="text-6xl mb-6 opacity-50 grayscale animate-[spin_10s_linear_infinite]">🔄</div>
                <h4 className="text-xl font-bold text-slate-300 mb-2">Manufacturing Workflow Canvas</h4>
                <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">Real-time 3D visualization of production processes tracking parts through manufacturing stages.</p>
                
                <div className="flex justify-center space-x-4">
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm text-center min-w-24">
                    <div className="text-lg font-bold text-emerald-400">2</div>
                    <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase mt-1">Active</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm text-center min-w-24">
                    <div className="text-lg font-bold text-sky-400">65%</div>
                    <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase mt-1">Progress</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-4 shadow-sm text-center min-w-24">
                    <div className="text-lg font-bold text-indigo-400">7</div>
                    <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase mt-1">Steps</div>
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

        {/* Control Panels */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-5">
              Animation Controls
            </h4>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Playback Speed
                  </label>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {animationSettings.speed}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="4"
                  step="0.25"
                  value={animationSettings.speed}
                  onChange={(e) => setAnimationSettings({
                    ...animationSettings,
                    speed: parseFloat(e.target.value)
                  })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.showPaths}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        showPaths: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 border border-slate-700 rounded-full peer peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-colors"></div>
                    <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">Show Workflow Paths</span>
                </label>
                
                <label className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.showLabels}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        showLabels: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 border border-slate-700 rounded-full peer peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-colors"></div>
                    <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">Show Step Labels</span>
                </label>
                
                <label className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.autoRotate}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        autoRotate: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 border border-slate-700 rounded-full peer peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-colors"></div>
                    <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">Auto Rotate Camera</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-5">
              Workflow Steps
            </h4>
            <div className="space-y-3 h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {mockWorkflowSteps.map((step) => (
                <motion.div
                  key={step.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 group ${
                    selectedStep?.id === step.id
                      ? 'border-emerald-500 bg-slate-800 shadow-sm'
                      : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-slate-200 text-sm tracking-tight group-hover:text-emerald-400 transition-colors w-2/3 truncate">
                      {step.name}
                    </h5>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      getStatusBadgeColor(step.status)
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-1">{step.description}</p>
                  
                  {selectedStep?.id === step.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-slate-400 mb-3 bg-slate-950 p-3 rounded border border-slate-800"
                    >
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <span className="text-slate-500 block">Position</span>
                          <span className="font-mono text-emerald-400">[{step.position.x}, {step.position.y}, {step.position.z}]</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Duration</span>
                          <span className="font-mono text-sky-400">{step.duration} min</span>
                        </div>
                      </div>
                      {step.connections.length > 0 && (
                        <div className="pt-2 border-t border-slate-800">
                          <span className="text-slate-500 block mb-1">Flows to:</span>
                          <ul className="list-disc pl-4 space-y-1">
                            {step.connections.map(c => (
                              <li key={c} className="text-slate-300">{mockWorkflowSteps.find(s => s.id === c)?.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      {step.duration}m est.
                    </span>
                    <div className="flex items-center space-x-2 flex-grow max-w-[120px] ml-4">
                      <div className="flex-grow bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            step.status === 'completed' ? 'bg-emerald-500' :
                            step.status === 'active' ? 'bg-sky-500' : 'bg-slate-500'
                          }`}
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 w-6 text-right">
                        {step.progress}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
