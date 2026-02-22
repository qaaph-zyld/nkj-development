'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import sampleSupplierData from '@/data/sample-suppliers.json';

interface SupplierMetric {
  overallScore: number;
  onTimeDelivery: number;
  qualityPPM: number;
  responsiveness: number;
}

interface Supplier {
  supplierId: string;
  name: string;
  country: string;
  category: string;
  metrics: SupplierMetric;
  certifications: { name: string; validUntil: string }[];
  incidents: number;
  annualSpend: number;
}

export default function SupplyChainScorer() {
  const [data] = useState<Supplier[]>(sampleSupplierData);
  const [weights, setWeights] = useState({
    delivery: 40,
    quality: 40,
    incidents: 20
  });

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    // Basic normalization: if I increase one, roughly decrease others
    // For demo simplicity, we'll just let them sum to whatever and normalize during calculation
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const calculateDynamicScore = (supplier: Supplier) => {
    const totalWeight = weights.delivery + weights.quality + weights.incidents;
    if (totalWeight === 0) return 0;

    const deliveryScore = supplier.metrics.onTimeDelivery;
    
    // Convert PPM to a 0-100 score (e.g., 0 PPM = 100, 500 PPM = 0)
    const qualityScore = Math.max(0, 100 - (supplier.metrics.qualityPPM / 5));
    
    // Incidents (0 = 100, 5 = 0)
    const incidentScore = Math.max(0, 100 - (supplier.incidents * 20));

    const finalScore = (
      (deliveryScore * weights.delivery) +
      (qualityScore * weights.quality) +
      (incidentScore * weights.incidents)
    ) / totalWeight;

    return finalScore;
  };

  const sortedSuppliers = [...data].sort((a, b) => calculateDynamicScore(b) - calculateDynamicScore(a));

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 75) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">Supplier Risk Scorer</h2>
          <p className="text-sm text-slate-400">Dynamically rank suppliers based on custom weighting criteria.</p>
        </div>
        <button className="nkj-button-secondary text-sm px-4 py-2 opacity-50 cursor-not-allowed" title="Available in full version">
          Upload Custom CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-slate-800">
        <div className="p-6 lg:border-r border-slate-800 flex flex-col gap-6 bg-slate-950/50">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Priority Weights</h3>
          
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Delivery (OTD)</span>
              <span>{weights.delivery}</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.delivery} 
              onChange={(e) => handleWeightChange('delivery', parseInt(e.target.value))}
              className="w-full accent-sky-500" 
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Quality (PPM)</span>
              <span>{weights.quality}</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.quality} 
              onChange={(e) => handleWeightChange('quality', parseInt(e.target.value))}
              className="w-full accent-emerald-500" 
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Incidents/Risk</span>
              <span>{weights.incidents}</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.incidents} 
              onChange={(e) => handleWeightChange('incidents', parseInt(e.target.value))}
              className="w-full accent-red-500" 
            />
          </div>
          
          <div className="pt-4 border-t border-slate-800">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Adjusting sliders recalculates supplier rankings in real-time. The final score normalizes all weights to 100%.
            </p>
          </div>
        </div>

        <div className="p-8 lg:col-span-3 bg-slate-950">
          <div className="grid grid-cols-1 gap-4">
            {sortedSuppliers.map((supplier, index) => {
              const score = calculateDynamicScore(supplier);
              return (
                <motion.div 
                  key={supplier.supplierId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="flex items-center gap-4 w-full sm:w-1/3">
                    <div className="text-xl font-bold text-slate-600 w-8">{index + 1}</div>
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm tracking-tight">{supplier.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{supplier.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-3 gap-4 w-full">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">OTD</div>
                      <div className="text-sm font-mono text-slate-300">{supplier.metrics.onTimeDelivery}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">PPM</div>
                      <div className="text-sm font-mono text-slate-300">{supplier.metrics.qualityPPM}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Incidents</div>
                      <div className="text-sm font-mono text-slate-300">{supplier.incidents}</div>
                    </div>
                  </div>

                  <div className="w-full sm:w-24 text-right flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Dynamic Score</span>
                    <span className={`px-3 py-1 rounded text-lg font-bold border tracking-tight ${getScoreColor(score)}`}>
                      {score.toFixed(1)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Static quarterly scorecards are obsolete. Connect your inbound receiving data for live supplier risk assessment.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Ditch the spreadsheets.
        </a>
      </div>
    </div>
  );
}
