'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import sampleQualityData from '@/data/sample-quality.json';

interface QualityRecord {
  date: string;
  productionLine: string;
  partCategory: string;
  inspectedUnits: number;
  defectiveUnits: number;
  firstPassYield: number;
  topDefectTypes: { type: string; count: number; severity: string }[];
  supplierId: string;
}

export default function QualityDashboardDemo() {
  const [data] = useState<QualityRecord[]>(sampleQualityData);
  const [selectedLine, setSelectedLine] = useState<string>('All');
  
  const filteredData = selectedLine === 'All' 
    ? data 
    : data.filter(d => d.productionLine === selectedLine);

  const totalInspected = filteredData.reduce((acc, curr) => acc + curr.inspectedUnits, 0);
  const totalDefects = filteredData.reduce((acc, curr) => acc + curr.defectiveUnits, 0);
  const defectRate = totalInspected > 0 ? ((totalDefects / totalInspected) * 100).toFixed(2) : '0.00';
  const avgFpy = filteredData.length > 0 
    ? (filteredData.reduce((acc, curr) => acc + curr.firstPassYield, 0) / filteredData.length).toFixed(1)
    : '0.0';

  // Aggregate defects for Pareto
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
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">Quality Analytics Explorer</h2>
          <p className="text-sm text-slate-400">Interactive defect tracking and root cause analysis.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 font-medium">Filter Line:</span>
          <select 
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          >
            {lines.map(line => (
              <option key={line} value={line}>{line === 'All' ? 'All Lines' : `Line ${line}`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-800">
        <div className="p-6 md:border-r border-b md:border-b-0 border-slate-800 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Inspected</div>
          <div className="text-3xl font-bold text-slate-50 tracking-tight">{totalInspected.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Units this period</div>
        </div>
        <div className="p-6 md:border-r border-b md:border-b-0 border-slate-800 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Avg FPY</div>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight">{avgFpy}%</div>
          <div className="text-xs text-slate-500 mt-1">First Pass Yield</div>
        </div>
        <div className="p-6 text-center">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Defect Rate</div>
          <div className="text-3xl font-bold text-red-400 tracking-tight">{defectRate}%</div>
          <div className="text-xs text-slate-500 mt-1">{totalDefects} total defects</div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pareto Chart approximation */}
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
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-red-500' :
                        index === 1 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
            {paretoData.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">No defects found for this selection.</div>
            )}
          </div>
        </div>

        {/* Recent Batches */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6">Recent Inspection Batches</h3>
          <div className="space-y-3">
            {filteredData.map((record, index) => (
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
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Static reports mask underlying trends. We build live dashboards that connect directly to your QMS and ERP databases.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Upgrade your Quality Reporting.
        </a>
      </div>
    </div>
  );
}
