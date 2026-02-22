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
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [lodLevel, setLodLevel] = useState(2);
  const [enableShadows, setEnableShadows] = useState(true);
  const [antialiasing, setAntialiasing] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMetrics(mockMetrics);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * (metric.id === 'draw-calls' ? 20 : 5))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [mounted]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  if (!mounted) {
    return (
      <div className="w-full mt-8 min-h-[400px] flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium tracking-wide">Loading Performance Telemetry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-6 flex items-center justify-between">
              Performance Telemetry
              <span className="px-2 py-0.5 bg-slate-800 text-[10px] text-emerald-400 rounded border border-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-slate-300 tracking-tight group-hover:text-emerald-400 transition-colors">{metric.name}</h4>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline space-x-2 mb-3">
                    <span className="text-3xl font-bold text-slate-50 tracking-tight">
                      {Math.round(metric.value)}
                    </span>
                    <span className="text-sm font-medium text-slate-500">{metric.unit}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-2">
                    <span>Current Load</span>
                    <span>Target: {metric.target} {metric.unit}</span>
                  </div>
                  
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        metric.status === 'optimal' ? 'bg-emerald-500' :
                        metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-6">Optimization Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-300 tracking-tight">Level of Detail (LOD)</h4>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Level {lodLevel}/5
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Dynamically adjust geometric complexity based on camera distance to maintain stable frame rates.
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={lodLevel}
                    onChange={(e) => setLodLevel(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-2">
                    <span>Performance</span>
                    <span>Quality</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-semibold text-slate-300 tracking-tight">Rendering Pipeline</h4>
                <div className="space-y-4">
                  <label className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={enableShadows}
                        onChange={(e) => setEnableShadows(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 border border-slate-700 rounded-full peer peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-colors"></div>
                      <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white"></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">Volumetric Shadows</span>
                  </label>
                  
                  <label className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={antialiasing}
                        onChange={(e) => setAntialiasing(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 border border-slate-700 rounded-full peer peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-colors"></div>
                      <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-slate-400 rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-white"></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">Multi-sample Anti-aliasing (MSAA)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Controls */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm h-full flex flex-col">
            <h4 className="text-sm font-bold text-slate-50 uppercase tracking-wider mb-6">Auto-Optimization Profiles</h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Apply pre-configured rendering profiles optimized for different hardware capabilities and visualization needs.
            </p>
            
            <div className="space-y-3 mb-8">
              <button className="w-full flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-emerald-500 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">⚡</span>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-slate-100 transition-colors">Maximum Performance</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-slate-800 border border-emerald-500 rounded-lg shadow-sm group">
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚖️</span>
                  <span className="text-sm font-semibold text-slate-50">Balanced Profile</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-sky-500 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">✨</span>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-slate-100 transition-colors">Maximum Quality</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-50 uppercase tracking-wider mb-4">Client Hardware Info</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded border border-slate-800/50">
                  <span className="text-xs font-medium text-slate-500">GPU</span>
                  <span className="text-xs font-mono font-medium text-slate-300 tracking-tight">RTX 4080 (Detected)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded border border-slate-800/50">
                  <span className="text-xs font-medium text-slate-500">VRAM</span>
                  <span className="text-xs font-mono font-medium text-slate-300 tracking-tight">16 GB</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded border border-slate-800/50">
                  <span className="text-xs font-medium text-slate-500">WebGL Context</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">WEBGL 2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
