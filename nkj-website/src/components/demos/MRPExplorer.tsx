'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateRequirements = (item: BomItem, parentQty: number) => {
    let grossReq = item.qtyPer * parentQty;
    
    // Simple lot sizing logic
    if (lotSizing === 'fixed') {
      grossReq = Math.ceil(grossReq / 50) * 50; // Round up to nearest 50
    } else if (lotSizing === 'eoq') {
      grossReq = Math.max(grossReq, 100); // Minimum order quantity of 100
    }

    return {
      grossReq,
      onHand: Math.floor(Math.random() * 50), // Mock on-hand for demo
      netReq: Math.max(0, grossReq - Math.floor(Math.random() * 50)),
      cost: grossReq * item.standardCost
    };
  };

  const renderBomTree = (item: BomItem, parentQty: number = 1) => {
    const isExpanded = expandedNodes[item.itemNumber] || false;
    const hasChildren = item.components && item.components.length > 0;
    const reqs = calculateRequirements(item, parentQty);

    return (
      <div key={item.itemNumber} className="relative">
        <div 
          className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
            item.level === 0 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-slate-900/50 border-slate-800/50 hover:bg-slate-800/80'
          }`}
          style={{ marginLeft: `${item.level * 2}rem` }}
        >
          {/* Collapse/Expand Toggle */}
          <div className="w-6 flex justify-center">
            {hasChildren && (
              <button 
                onClick={() => toggleNode(item.itemNumber)}
                className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
          </div>

          {/* Item Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-slate-200">{item.itemNumber}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                item.level === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                item.level === 1 ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                Level {item.level}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{item.description}</p>
          </div>

          {/* MRP Math */}
          <div className="grid grid-cols-4 gap-4 text-right min-w-[320px]">
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
              <div className="font-mono text-sm text-amber-400">{reqs.onHand}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Net Req</div>
              <div className="font-mono text-sm font-bold text-emerald-400">{reqs.netReq}</div>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2 relative"
          >
            {/* Tree Line */}
            <div 
              className="absolute top-0 bottom-6 border-l border-slate-700"
              style={{ left: `${(item.level * 2) + 1.2}rem` }}
            />
            {item.components!.map(child => renderBomTree(child as BomItem, reqs.grossReq))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-2">MRP Explosion Engine</h2>
        <p className="text-sm text-slate-400">See how top-level demand cascades through a multi-level Bill of Materials in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-slate-800">
        <div className="p-6 lg:border-r border-slate-800 flex flex-col justify-center">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Top Level Demand
          </label>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={demandQty}
              onChange={(e) => setDemandQty(Math.max(1, parseInt(e.target.value) || 0))}
              className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 w-full font-mono text-lg focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <span className="text-slate-400 font-medium">EA</span>
          </div>
        </div>

        <div className="p-6 lg:col-span-3 flex items-center gap-6 overflow-x-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Lot Sizing Policy
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => setLotSizing('lfl')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lotSizing === 'lfl' ? 'bg-emerald-500 text-slate-50' : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Lot-for-Lot
              </button>
              <button 
                onClick={() => setLotSizing('fixed')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lotSizing === 'fixed' ? 'bg-emerald-500 text-slate-50' : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Fixed (50s)
              </button>
              <button 
                onClick={() => setLotSizing('eoq')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lotSizing === 'eoq' ? 'bg-emerald-500 text-slate-50' : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Min Qty (100)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-950 min-h-[500px]">
        <div className="space-y-2">
          {renderBomTree(sampleBomData as BomItem, demandQty)}
        </div>
      </div>

      <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Does your MRP run take hours overnight? We build optimized SQL extraction pipelines that calculate requirements in seconds.
        </p>
        <a href="/book" className="nkj-button-primary inline-block">
          Let's talk about MRP optimization.
        </a>
      </div>
    </div>
  );
}
