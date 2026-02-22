'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  coordinates?: { lat: number; lng: number };
}

export default function SupplyChainScorer() {
  const [data, setData] = useState<Supplier[]>(sampleSupplierData.map(s => ({
    ...s,
    coordinates: getMockCoordinates(s.country)
  })));
  
  const [weights, setWeights] = useState({
    delivery: 40,
    quality: 40,
    incidents: 20
  });

  const [activeAlerts, setActiveAlerts] = useState<{id: string, supplier: string, type: string, message: string, severity: 'high'|'medium'}[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  function getMockCoordinates(country: string) {
    const coords: Record<string, {lat: number, lng: number}> = {
      'USA': { lat: 39.8, lng: -98.5 },
      'Mexico': { lat: 23.6, lng: -102.5 },
      'Germany': { lat: 51.1, lng: 10.4 },
      'China': { lat: 35.8, lng: 104.1 },
      'Japan': { lat: 36.2, lng: 138.2 },
      'Taiwan': { lat: 36.2, lng: 138.2 },
      'South Korea': { lat: 35.9, lng: 127.7 },
      'Canada': { lat: 56.1, lng: -106.3 },
      'UK': { lat: 56.1, lng: -106.3 },
      'Italy': { lat: 51.1, lng: 10.4 }
    };
    const base = coords[country] || { lat: 0, lng: 0 };
    return {
      lat: base.lat + (Math.random() - 0.5) * 5,
      lng: base.lng + (Math.random() - 0.5) * 5
    };
  }

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const calculateDynamicScore = (supplier: Supplier) => {
    const totalWeight = weights.delivery + weights.quality + weights.incidents;
    if (totalWeight === 0) return 0;

    const deliveryScore = supplier.metrics.onTimeDelivery;
    const qualityScore = Math.max(0, 100 - (supplier.metrics.qualityPPM / 5));
    const incidentScore = Math.max(0, 100 - (supplier.incidents * 20));

    return (
      (deliveryScore * (weights.delivery / totalWeight)) +
      (qualityScore * (weights.quality / totalWeight)) +
      (incidentScore * (weights.incidents / totalWeight))
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  const sortedSuppliers = [...data].sort((a, b) => calculateDynamicScore(b) - calculateDynamicScore(a));

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const randomSupplier = data[Math.floor(Math.random() * data.length)];
        const alertTypes = [
          { type: 'Weather', msg: 'Port closure due to severe weather.', sev: 'high' as const },
          { type: 'Logistics', msg: 'Container delayed at customs.', sev: 'medium' as const },
          { type: 'Quality', msg: 'Spike in inbound inspection failures.', sev: 'high' as const },
          { type: 'Geopolitical', msg: 'New export restrictions announced.', sev: 'medium' as const }
        ];
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const newAlert = {
          id: Date.now().toString(),
          supplier: randomSupplier.name,
          type: randomAlert.type,
          message: randomAlert.msg,
          severity: randomAlert.sev
        };

        setActiveAlerts(prev => [newAlert, ...prev].slice(0, 5));

        setData(prevData => prevData.map(s => {
          if (s.supplierId === randomSupplier.supplierId) {
            return {
              ...s,
              incidents: s.incidents + 1,
              metrics: {
                ...s.metrics,
                onTimeDelivery: Math.max(0, s.metrics.onTimeDelivery - 5)
              }
            };
          }
          return s;
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, data]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">Supply Chain Risk Monitor</h2>
          <p className="text-sm text-slate-400">Dynamically rank suppliers and monitor global risk events in real-time.</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
            isLive 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/50 hover:bg-amber-500/20' 
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
          }`}
        >
          {isLive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Pause Risk Simulator
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              Start Risk Simulator
            </>
          )}
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
              <span>Risk/Incidents</span>
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

          <div className="mt-auto pt-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              {isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
              Active Alerts
            </h3>
            <div className="space-y-3 min-h-[150px]">
              <AnimatePresence>
                {activeAlerts.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500 text-center py-4">
                    {isLive ? 'Monitoring for global events...' : 'Start simulator to monitor events.'}
                  </motion.div>
                ) : (
                  activeAlerts.map(alert => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-3 rounded-lg border text-xs ${
                        alert.severity === 'high' 
                          ? 'bg-red-500/10 border-red-500/30' 
                          : 'bg-amber-500/10 border-amber-500/30'
                      }`}
                    >
                      <div className={`font-bold mb-1 ${alert.severity === 'high' ? 'text-red-400' : 'text-amber-400'}`}>
                        {alert.type} Alert
                      </div>
                      <div className="text-slate-300 mb-1">{alert.supplier}</div>
                      <div className="text-slate-400 text-[10px]">{alert.message}</div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-slate-950 flex flex-col">
          <div className="h-64 border-b border-slate-800 relative bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {sortedSuppliers.map(supplier => {
              const score = calculateDynamicScore(supplier);
              const colorClass = score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-amber-500' : 'bg-red-500';
              const top = `${50 - (supplier.coordinates!.lat / 90 * 40)}%`;
              const left = `${50 + (supplier.coordinates!.lng / 180 * 40)}%`;
              
              const isSelected = selectedSupplier?.supplierId === supplier.supplierId;
              
              return (
                <div 
                  key={supplier.supplierId}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top, left }}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  {score < 75 && <div className={`absolute inset-0 rounded-full ${colorClass} animate-ping opacity-75`}></div>}
                  <div className={`relative w-4 h-4 rounded-full ${colorClass} border-2 border-slate-950 transition-transform ${isSelected ? 'scale-150' : 'hover:scale-125'}`}></div>
                  
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-800 text-xs px-2 py-1 rounded shadow-lg transition-opacity z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="font-bold text-slate-200">{supplier.name}</div>
                    <div className="text-slate-400">Score: {score.toFixed(1)}</div>
                  </div>
                </div>
              );
            })}
            
            <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded">
              Global Supplier Network View
            </div>
          </div>

          <div className="p-8 flex-1 overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              {sortedSuppliers.map((supplier, index) => {
                const score = calculateDynamicScore(supplier);
                const isSelected = selectedSupplier?.supplierId === supplier.supplierId;
                
                return (
                  <motion.div
                    key={supplier.supplierId}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedSupplier(supplier)}
                    className={`bg-slate-900 border rounded-xl p-5 flex flex-col sm:flex-row gap-6 items-center cursor-pointer transition-colors ${
                      isSelected ? 'border-sky-500/50 bg-slate-800/50' : 'border-slate-800 hover:border-slate-700'
                    }`}
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
                        <div className={`text-sm font-mono ${supplier.metrics.onTimeDelivery < 85 ? 'text-amber-400' : 'text-slate-300'}`}>
                          {supplier.metrics.onTimeDelivery}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">PPM</div>
                        <div className="text-sm font-mono text-slate-300">{supplier.metrics.qualityPPM}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Incidents</div>
                        <div className={`text-sm font-mono ${supplier.incidents > 0 ? 'text-red-400' : 'text-slate-300'}`}>
                          {supplier.incidents}
                        </div>
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
      </div>

      <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Static quarterly scorecards are obsolete. Connect your inbound receiving data and external threat intelligence APIs for live supplier risk assessment.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Ditch the spreadsheets.
        </a>
      </div>
    </div>
  );
}
