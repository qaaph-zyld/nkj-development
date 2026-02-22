'use client';

import { useState, useEffect } from 'react';
import sampleQualityData from '@/data/sample-quality.json';

interface QualityRecord {
  id?: string;
  date: string;
  productionLine: string;
  partCategory: string;
  inspectedUnits: number;
  defectiveUnits: number;
  firstPassYield: number;
  topDefectTypes: { type: string; count: number; severity: string }[];
  supplierId: string;
}

// Helper for SPC Chart (Statistical Process Control)
const generateSpcData = (baseMean: number, points: number) => {
  return Array.from({ length: points }).map((_, i) => {
    // Simulate natural process variation + occasional special cause
    const isSpecialCause = Math.random() > 0.95;
    const variation = isSpecialCause ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 2;
    return {
      id: i,
      value: Math.max(0, Math.min(100, baseMean + variation)),
      ucl: baseMean + 4, // Upper Control Limit
      lcl: baseMean - 4, // Lower Control Limit
      mean: baseMean,
      isOutlier: isSpecialCause
    };
  });
};

export default function QualityDashboardDemo() {
  const [data] = useState<QualityRecord[]>(sampleQualityData);
  const [selectedLine, setSelectedLine] = useState<string>('All');
  
  // Live Simulation State
  const [isLive, setIsLive] = useState(false);
  const [liveInspections, setLiveInspections] = useState<{id: number, part: string, status: 'pass'|'fail', defect?: string, time: string}[]>([]);
  const [spcData, setSpcData] = useState(generateSpcData(96.5, 30));
  const [liveFpy, setLiveFpy] = useState(96.5);

  const filteredData = selectedLine === 'All'
    ? data
    : data.filter(d => d.productionLine === selectedLine);

  const totalInspected = filteredData.reduce((acc, curr) => acc + curr.inspectedUnits, 0);
  const totalDefects = filteredData.reduce((acc, curr) => acc + curr.defectiveUnits, 0);
  
  // Use live FPY if in live mode, otherwise use static calculated FPY
  const displayFpy = isLive ? liveFpy.toFixed(1) : (filteredData.length > 0
    ? (filteredData.reduce((acc, curr) => acc + curr.firstPassYield, 0) / filteredData.length).toFixed(1)
    : '0.0');

  // Use live defect rate if in live mode
  const displayDefectRate = isLive ? (100 - liveFpy).toFixed(2) : (totalInspected > 0 ? ((totalDefects / totalInspected) * 100).toFixed(2) : '0.00');

  // Live Simulation Effect
  useEffect(() => {
    if (!isLive) return;

    const parts = ['Housing', 'Stator', 'Rotor', 'Bearing', 'Shaft'];
    const defects = ['Scratches', 'Dimensional', 'Porosity', 'Assembly', 'Contamination'];

    const interval = setInterval(() => {
      const isFail = Math.random() > 0.96; // ~4% fail rate
      const newInspection = {
        id: Date.now(),
        part: parts[Math.floor(Math.random() * parts.length)],
        status: isFail ? 'fail' as const : 'pass' as const,
        defect: isFail ? defects[Math.floor(Math.random() * defects.length)] : undefined,
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' })
      };

      setLiveInspections(prev => [newInspection, ...prev].slice(0, 8)); // Keep last 8

      // Update SPC Chart
      setSpcData(prev => {
        const newValue = isFail ? prev[prev.length-1].value - (Math.random() * 2) : prev[prev.length-1].value + (Math.random() * 0.5);
        const clampedValue = Math.max(90, Math.min(100, newValue));
        
        // Update live FPY smoothing
        setLiveFpy(current => (current * 0.9) + (clampedValue * 0.1));

        return [...prev.slice(1), {
          id: Date.now(),
          value: clampedValue,
          ucl: 99.5,
          lcl: 92.5,
          mean: 96.5,
          isOutlier: clampedValue > 99.5 || clampedValue < 92.5
        }];
      });

    }, 1500); // New inspection every 1.5s

    return () => clearInterval(interval);
  }, [isLive]);


  // Aggregate defects for Pareto (only for static view for simplicity)
  const defectCounts: Record<string, number> = {};
  filteredData.forEach(record => {
    record.topDefectTypes.forEach(defect => {
      defectCounts[defect.type] = (defectCounts[defect.type] || 0) + defect.count;
    });
  });

  const paretoData = Object.entries(defectCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  const lines = ['All', ...Array.from(new Set(data.map(d => d.productionLine)))];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Quality Intelligence</h2>
          <p className="text-sm text-slate-400 mt-1">Real-time defect analysis and process control</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-400">Line:</span>
            <select
              value={selectedLine}
              onChange={(e) => {
                setSelectedLine(e.target.value);
                setIsLive(false); // Reset live mode if line changes
              }}
              disabled={isLive}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 disabled:opacity-50"
            >
              {lines.map(line => (
                <option key={line} value={line}>{line === 'All' ? 'All Lines' : `Line ${line}`}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              isLive 
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            {isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                Stop Live Feed
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-950"></span>
                Start Live Feed
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-b border-slate-800">
        <div className="p-6 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Inspected</div>
          <div className="text-3xl font-bold text-slate-200 tracking-tight">
            {isLive ? 'LIVE' : totalInspected.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1">Units this period</div>
        </div>
        <div className="p-6 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Avg FPY</div>
          <div className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${isLive && liveFpy < 94 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {displayFpy}%
          </div>
          <div className="text-xs text-slate-500 mt-1">First Pass Yield</div>
        </div>
        <div className="p-6 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Defect Rate</div>
          <div className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${isLive && liveFpy < 94 ? 'text-red-400' : 'text-amber-400'}`}>
            {displayDefectRate}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {isLive ? 'Current instantaneous rate' : `${totalDefects} total defects`}
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Dynamic Content based on Live Mode */}
        {isLive ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live SPC Chart (FPY)
              </h3>
            </div>
            
            <div className="relative flex-1 min-h-[250px] w-full mt-4">
              {/* SPC Chart Visualization */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {/* Control Limits */}
                <div className="absolute top-[10%] left-0 right-0 border-t border-dashed border-red-500/30 z-0">
                  <span className="absolute -top-5 right-0 text-[10px] text-red-500/70 font-mono">UCL</span>
                </div>
                <div className="absolute top-[50%] left-0 right-0 border-t border-slate-700/50 z-0">
                  <span className="absolute -top-5 right-0 text-[10px] text-slate-500 font-mono">MEAN</span>
                </div>
                <div className="absolute bottom-[10%] left-0 right-0 border-t border-dashed border-amber-500/30 z-0">
                  <span className="absolute -top-5 right-0 text-[10px] text-amber-500/70 font-mono">LCL</span>
                </div>

                {/* Data Points */}
                {spcData.map((point, i) => {
                  const heightPct = Math.max(0, Math.min(100, (point.value - 85) / 15 * 100)); // Map 85-100 to 0-100%
                  
                  return (
                    <div key={point.id} className="relative w-2 h-full flex items-end group z-10">
                      <div 
                        className={`w-2 rounded-t-sm transition-all duration-300 ${
                          point.isOutlier ? 'bg-red-500' : 'bg-emerald-500/80 hover:bg-emerald-400'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      ></div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-xs text-slate-200 px-2 py-1 rounded whitespace-nowrap z-20">
                        {point.value.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6">Defect Pareto Analysis</h3>
            <div className="space-y-4">
              {paretoData.map((item, index) => {
                const percentage = (item.count / totalDefects) * 100;
                return (
                  <div key={item.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-300">{item.type}</span>
                      <span className="font-bold text-slate-400">{item.count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Column: Dynamic Content */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6">
            {isLive ? 'Real-Time Inspection Feed' : 'Recent Inspection Batches'}
          </h3>
          
          <div className="space-y-3">
            {isLive ? (
              // Live Feed
              liveInspections.map((insp) => (
                <div key={insp.id} className="flex justify-between items-center p-3 bg-slate-900 border border-slate-800 rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${insp.status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="font-medium text-slate-200 text-sm">{insp.part}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{insp.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {insp.status === 'pass' ? (
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">PASS</span>
                    ) : (
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded mb-1">REJECT</span>
                        <span className="text-[10px] text-slate-400 uppercase">{insp.defect}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Static Recent Batches
              filteredData.map((record, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
                  <div>
                    <div className="font-medium text-slate-200 text-sm">{record.partCategory}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{record.date} | Line {record.productionLine}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-sm ${record.firstPassYield >= 97 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {record.firstPassYield}% FPY
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{record.defectiveUnits} defects</div>
                  </div>
                </div>
              ))
            )}
            
            {isLive && liveInspections.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm animate-pulse">
                Waiting for inspection data...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Static reports mask underlying trends. We build live dashboards that connect directly to your QMS and ERP databases, enabling immediate response to quality excursions.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Upgrade your Quality Reporting.
        </a>
      </div>
    </div>
  );
}
