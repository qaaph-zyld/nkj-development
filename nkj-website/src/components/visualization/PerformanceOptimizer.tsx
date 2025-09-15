'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetric {
  id: string;
  name: string;
  category: 'gpu' | 'memory' | 'network' | 'rendering';
  value: number;
  target: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const mockMetrics: PerformanceMetric[] = [
  {
    id: 'fps',
    name: 'Frame Rate',
    category: 'rendering',
    value: 58,
    target: 60,
    unit: 'fps',
    status: 'optimal',
    trend: 'stable'
  },
  {
    id: 'gpu-usage',
    name: 'GPU Utilization',
    category: 'gpu',
    value: 72,
    target: 80,
    unit: '%',
    status: 'optimal',
    trend: 'up'
  },
  {
    id: 'memory',
    name: 'Memory Usage',
    category: 'memory',
    value: 245,
    target: 512,
    unit: 'MB',
    status: 'optimal',
    trend: 'stable'
  },
  {
    id: 'draw-calls',
    name: 'Draw Calls',
    category: 'rendering',
    value: 156,
    target: 200,
    unit: 'calls',
    status: 'optimal',
    trend: 'down'
  }
];

export default function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(mockMetrics);
  const [lodLevel, setLodLevel] = useState(2);
  const [enableShadows, setEnableShadows] = useState(true);
  const [antialiasing, setAntialiasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 5
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 bg-green-900/20';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20';
      case 'critical': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            3D Performance Optimization
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real-time performance monitoring and GPU optimization for complex 3D automotive visualizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    className="bg-slate-700 rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{metric.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="flex items-end space-x-2 mb-2">
                      <span className="text-2xl font-bold text-blue-400">
                        {Math.round(metric.value)}
                      </span>
                      <span className="text-sm text-slate-300">{metric.unit}</span>
                      <span className="text-xs text-slate-400">
                        / {metric.target} {metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Optimization Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Level of Detail (LOD)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Detail Level</span>
                      <span className="text-white">{lodLevel}/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={lodLevel}
                      onChange={(e) => setLodLevel(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-400">
                      Higher levels show more detail but reduce performance
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Rendering Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enableShadows}
                        onChange={(e) => setEnableShadows(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-slate-300">Enable Shadows</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={antialiasing}
                        onChange={(e) => setAntialiasing(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-slate-300">Anti-aliasing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization Controls */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Auto-Optimization</h4>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Optimize for Performance
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Optimize for Quality
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Balanced Mode
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">System Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">GPU:</span>
                  <span className="text-white">RTX 4080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">VRAM:</span>
                  <span className="text-white">16GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">WebGL:</span>
                  <span className="text-green-400">2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
