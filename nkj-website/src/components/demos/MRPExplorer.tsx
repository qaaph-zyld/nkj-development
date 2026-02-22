'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sampleBomData from '@/data/sample-bom.json';

interface BomItem {
  itemNumber: string;
  description: string;
  qtyPer: number;
  uom: string;
  leadTimeDays: number;
  standardCost: number;
  level: number;
  supplierId?: string;
  components?: BomItem[];
}

export default function MRPExplorer() {
  const [demandQty, setDemandQty] = useState(100);
  const [lotSizing, setLotSizing] = useState<'lfl' | 'fixed' | 'eoq'>('lfl');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({'BRK-ASSY-FR': true});
  
  // Shortage Simulation State
  const [simulatedShortages, setSimulatedShortages] = useState<Record<string, number>>({});
  
  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const triggerShortage = (itemNumber: string, delayDays: number) => {
    setSimulatedShortages(prev => ({
      ...prev,
      [itemNumber]: (prev[itemNumber] || 0) + delayDays
    }));
  };

  const clearShortages = () => {
    setSimulatedShortages({});
  };

  const calculateRequirements = (item: BomItem, parentQty: number, parentDelay: number = 0) => {
    let grossReq = item.qtyPer * parentQty;

    // Simple lot sizing logic
    if (lotSizing === 'fixed') {
      grossReq = Math.ceil(grossReq / 50) * 50; // Round up to nearest 50
    } else if (lotSizing === 'eoq') {
      grossReq = Math.max(grossReq, 100); // Minimum order quantity of 100
    }

    const itemDelay = simulatedShortages[item.itemNumber] || 0;
    const totalLeadTime = item.leadTimeDays + parentDelay + itemDelay;

    // Stable mock on-hand logic based on item number to prevent flickering
    const hash = item.itemNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const mockOnHand = hash % 50; 
    
    const netReq = Math.max(0, grossReq - mockOnHand);

    return {
      grossReq,
      onHand: mockOnHand, 
      netReq,
      cost: grossReq * item.standardCost,
      totalLeadTime,
      hasShortage: itemDelay > 0
    };
  };

  const renderBomTree = (item: BomItem, parentQty: number = 1, parentDelay: number = 0) => {
    const isExpanded = expandedNodes[item.itemNumber] !== false;
    const reqs = calculateRequirements(item, parentQty, parentDelay);
    const hasChildren = item.components && item.components.length > 0;

    return (
      <div key={item.itemNumber} className="relative">
        {/* Connection Line */}
        {item.level > 0 && (
          <div 
            className="absolute -left-6 top-6 w-6 h-px bg-slate-700" 
          />
        )}

        <motion.div 
          className={`flex items-center gap-4 p-4 rounded-xl border transition-all mb-2 relative z-10 ${
            reqs.hasShortage 
              ? 'bg-red-500/10 border-red-500/30' 
              : item.level === 0 
                ? 'bg-slate-900 border-slate-700 shadow-sm' 
                : 'bg-slate-900/50 border-slate-800'
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          layout
        >
          {/* Node Control */}
          <div className="w-6 flex items-center justify-center">
            {hasChildren && (
              <button 
                onClick={() => toggleNode(item.itemNumber)}
                className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors z-20"
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
          </div>

          {/* Item Info */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-slate-200">{item.itemNumber}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                item.level === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                item.level === 1 ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                Lvl {item.level}
              </span>
              {reqs.hasShortage && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider bg-red-500/10 text-red-400 border-red-500/20 animate-pulse">
                  Delayed
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">{item.description}</p>
          </div>

          {/* MRP Math */}
          <div className="grid grid-cols-4 gap-4 text-right min-w-[320px] shrink-0 hidden sm:grid">
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Qty/Per</div>
              <div className="font-mono text-sm text-slate-300">{item.qtyPer} {item.uom}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Gross Req</div>
              <div className="font-mono text-sm font-medium text-slate-200">{reqs.grossReq}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">On Hand</div>
              <div className="font-mono text-sm text-slate-400">{reqs.onHand}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Net Req</div>
              <div className={`font-mono text-sm font-bold ${reqs.netReq > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {reqs.netReq}
              </div>
            </div>
          </div>
          
          {/* Lead Time & Actions */}
          <div className="flex flex-col items-end min-w-[120px] shrink-0">
             <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Cum. Lead Time</div>
             <div className={`font-mono text-sm font-bold flex items-center gap-1 ${reqs.hasShortage ? 'text-red-400' : 'text-slate-300'}`}>
                {reqs.hasShortage && <span>⚠️</span>}
                {reqs.totalLeadTime} Days
             </div>
             
             {item.level > 0 && !hasChildren && (
                 <button 
                    onClick={() => triggerShortage(item.itemNumber, 5)}
                    className="text-[10px] mt-2 text-slate-500 hover:text-red-400 transition-colors underline decoration-dotted"
                 >
                    Simulate Delay
                 </button>
             )}
          </div>
        </motion.div>

        {/* Render Components */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div 
              className="ml-8 relative"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute left-3 top-0 bottom-6 w-px bg-slate-800" />
              {item.components!.map(child => renderBomTree(child, reqs.grossReq, reqs.totalLeadTime - item.leadTimeDays))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Top Controls Bar */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">Multi-Level MRP Explosion</h2>
          <p className="text-sm text-slate-400">See how top-level demand cascades down through the Bill of Materials.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Lot Sizing */}
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
            <button 
              onClick={() => setLotSizing('lfl')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                lotSizing === 'lfl' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Lot-for-Lot
            </button>
            <button 
              onClick={() => setLotSizing('fixed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                lotSizing === 'fixed' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Fixed Qty
            </button>
            <button 
              onClick={() => setLotSizing('eoq')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                lotSizing === 'eoq' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Min/EOQ
            </button>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden md:block"></div>

          {/* Master Demand Input */}
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2 rounded-lg">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-2">Master Demand</span>
            <input 
              type="number" 
              value={demandQty}
              onChange={(e) => setDemandQty(Math.max(1, parseInt(e.target.value) || 0))}
              className="bg-slate-900 border border-slate-700 text-slate-50 font-mono text-sm rounded px-3 py-1.5 w-24 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          
          {Object.keys(simulatedShortages).length > 0 && (
             <button 
                onClick={clearShortages}
                className="text-xs px-3 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-colors"
             >
                 Clear Delays
             </button>
          )}
        </div>
      </div>

      {/* BOM Tree Area */}
      <div className="p-6 md:p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Headers */}
          <div className="flex items-center gap-4 px-4 pb-4 mb-4 border-b border-slate-800">
            <div className="w-6"></div>
            <div className="flex-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item & Description</div>
            <div className="w-[320px] text-xs font-semibold text-slate-500 uppercase tracking-wider text-right hidden sm:block pr-8">Requirements Planning</div>
            <div className="w-[120px] text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Lead Time</div>
          </div>

          {/* Render the Tree */}
          {renderBomTree(sampleBomData as BomItem, demandQty)}
        </div>
      </div>
      
      {/* Bottom Educational Note */}
      <div className="p-6 bg-slate-900 border-t border-slate-800">
        <div className="flex items-start gap-4 max-w-3xl mx-auto">
          <div className="text-2xl opacity-50 grayscale">💡</div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-1">Real-Time MRP Calculation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Legacy ERPs often require overnight batch runs to calculate MRP. Modern microservice architectures allow for sub-second, event-driven MRP explosions. Change the Master Demand above or simulate a delay on a component to instantly see the cascading effect on the entire BOM structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
