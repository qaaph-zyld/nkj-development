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
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Manufacturing Workflow Animation
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real-time 3D visualization of production processes with interactive workflow control
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 3D Animation Viewport Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-automotive-carbon">
                  3D Workflow Animation
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isPlaying 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <h4 className="text-2xl font-bold text-automotive-carbon mb-2">Manufacturing Workflow Animation</h4>
                  <p className="text-automotive-steel mb-4">Real-time 3D visualization of production processes</p>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow">
                      <div className="text-lg font-semibold text-green-600">2 Active</div>
                      <div className="text-sm text-gray-600">Processes</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <div className="text-lg font-semibold text-blue-600">65%</div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <div className="text-lg font-semibold text-purple-600">7</div>
                      <div className="text-sm text-gray-600">Steps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-automotive-carbon mb-4">
                Animation Controls
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-automotive-steel mb-2">
                    Animation Speed
                  </label>
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
                    className="w-full"
                  />
                  <div className="text-sm text-automotive-steel mt-1">
                    {animationSettings.speed}x
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.showPaths}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        showPaths: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-automotive-steel">Show Workflow Paths</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.showLabels}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        showLabels: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-automotive-steel">Show Step Labels</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={animationSettings.autoRotate}
                      onChange={(e) => setAnimationSettings({
                        ...animationSettings,
                        autoRotate: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-automotive-steel">Auto Rotate Camera</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step Details */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-automotive-carbon mb-4">
                Workflow Steps
              </h4>
              <div className="space-y-3">
                {mockWorkflowSteps.map((step) => (
                  <motion.div
                    key={step.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedStep?.id === step.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedStep(step)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-automotive-carbon">{step.name}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        getStatusBadgeColor(step.status)
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-sm text-automotive-steel mb-2">{step.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-automotive-steel">
                        Duration: {step.duration}min
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-automotive-steel">
                          {step.progress}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Step Details */}
            {selectedStep && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-xl p-6"
              >
                <h4 className="text-lg font-semibold text-automotive-carbon mb-4">
                  Step Details: {selectedStep.name}
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-automotive-steel">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full border ${
                      getStatusBadgeColor(selectedStep.status)
                    }`}>
                      {selectedStep.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-automotive-steel">Progress:</span>
                    <span className="ml-2 text-sm text-automotive-carbon">
                      {selectedStep.progress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-automotive-steel">Duration:</span>
                    <span className="ml-2 text-sm text-automotive-carbon">
                      {selectedStep.duration} minutes
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-automotive-steel">Position:</span>
                    <span className="ml-2 text-sm text-automotive-carbon">
                      X: {selectedStep.position.x}, Y: {selectedStep.position.y}, Z: {selectedStep.position.z}
                    </span>
                  </div>
                  {selectedStep.connections.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-automotive-steel">Connections:</span>
                      <div className="mt-1 space-y-1">
                        {selectedStep.connections.map(connectionId => {
                          const connectedStep = mockWorkflowSteps.find(s => s.id === connectionId);
                          return connectedStep ? (
                            <div key={connectionId} className="text-sm text-automotive-carbon ml-2">
                              → {connectedStep.name}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
