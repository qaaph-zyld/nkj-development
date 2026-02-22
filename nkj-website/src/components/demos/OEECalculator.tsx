'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sampleProductionData from '@/data/sample-production.json';

export default function OEECalculator() {
  const [availability, setAvailability] = useState(85);
  const [performance, setPerformance] = useState(90);
  const [quality, setQuality] = useState(95);
  const [oee, setOee] = useState(0);
  const [isUsingSampleData, setIsUsingSampleData] = useState(false);

  useEffect(() => {
    // Calculate OEE: (A * P * Q) / 10000
    const calculatedOee = (availability * performance * quality) / 10000;
    setOee(calculatedOee);
  }, [availability, performance, quality]);

  const loadSampleData = () => {
    // Let's use the first item from sample data that has OEE
    const sample = sampleProductionData.find(d => d.oee !== null);
    if (sample && sample.oee) {
      setAvailability(sample.oee.availability);
      setPerformance(sample.oee.performance);
      setQuality(sample.oee.quality);
      setIsUsingSampleData(true);
    }
  };

  const getOeeColor = (value: number) => {
    if (value >= 85) return 'text-emerald-400';
    if (value >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getOeeBgColor = (value: number) => {
    if (value >= 85) return 'bg-emerald-500';
    if (value >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">Interactive OEE Calculator</h2>
          <p className="text-sm text-slate-400">Adjust the metrics below or load sample data from our production dataset.</p>
        </div>
        <button
          onClick={loadSampleData}
          className="nkj-button-secondary text-sm px-4 py-2"
          disabled={isUsingSampleData}
        >
          {isUsingSampleData ? 'Using Sample Data ✓' : 'Load Sample Data'}
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sliders */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Availability</h3>
                <p className="text-xs text-slate-500">Planned vs Actual Run Time</p>
              </div>
              <span className="text-xl font-bold text-slate-50">{availability.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={availability}
              onChange={(e) => {
                setAvailability(parseFloat(e.target.value));
                setIsUsingSampleData(false);
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Performance</h3>
                <p className="text-xs text-slate-500">Ideal vs Actual Cycle Time</p>
              </div>
              <span className="text-xl font-bold text-slate-50">{performance.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={performance}
              onChange={(e) => {
                setPerformance(parseFloat(e.target.value));
                setIsUsingSampleData(false);
              }}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Quality</h3>
                <p className="text-xs text-slate-500">Good vs Total Parts Produced</p>
              </div>
              <span className="text-xl font-bold text-slate-50">{quality.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={quality}
              onChange={(e) => {
                setQuality(parseFloat(e.target.value));
                setIsUsingSampleData(false);
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* What-if Scenarios */}
          <div className="pt-8 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">"What If" Scenarios</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setAvailability(Math.min(100, availability + 5));
                  setIsUsingSampleData(false);
                }}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-lg text-left transition-colors"
              >
                <div className="text-emerald-400 text-lg mb-1">+5%</div>
                <div className="text-xs font-medium text-slate-300">Reduce Downtime</div>
              </button>
              <button
                onClick={() => {
                  setQuality(Math.min(100, quality + 2));
                  setIsUsingSampleData(false);
                }}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-lg text-left transition-colors"
              >
                <div className="text-indigo-400 text-lg mb-1">+2%</div>
                <div className="text-xs font-medium text-slate-300">Reduce Scrap</div>
              </button>
            </div>
          </div>
        </div>

        {/* Gauge & Results */}
        <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-xl p-8">
          <div className="relative w-64 h-64 flex flex-col items-center justify-center mb-8">
            {/* SVG Gauge Background */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="#1e293b"
                strokeWidth="20"
                strokeDasharray="691" // 2 * PI * 110
              />
              <motion.circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray="691"
                strokeDashoffset={691 - (691 * oee) / 100}
                className={getOeeColor(oee)}
                initial={{ strokeDashoffset: 691 }}
                animate={{ strokeDashoffset: 691 - (691 * oee) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute text-center">
              <div className={`text-6xl font-bold tracking-tighter ${getOeeColor(oee)}`}>
                {oee.toFixed(1)}<span className="text-2xl">%</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">
                Overall OEE
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-center mb-4">Industry Benchmarks</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-300 font-medium">World Class</span>
                <span className="text-emerald-400 font-bold">85.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-300 font-medium">Typical</span>
                <span className="text-amber-400 font-bold">60.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800 relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getOeeBgColor(oee)}`}></div>
                <span className="text-slate-50 font-medium pl-2">Your Input</span>
                <span className={`font-bold ${getOeeColor(oee)}`}>{oee.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-950 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Calculating OEE in a spreadsheet is easy. Tracking it in real-time across 50 production lines requires specialized data architecture.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Want to see this connected to your real production data? Book a call.
        </a>
      </div>
    </div>
  );
}
