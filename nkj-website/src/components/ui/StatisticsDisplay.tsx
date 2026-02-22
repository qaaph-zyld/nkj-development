'use client';

import { motion } from 'framer-motion';
import KPICard from './KPICard';
import PerformanceChart from './PerformanceChart';

const automotiveKPIs = [
  {
    title: 'Production Efficiency',
    value: 94.7,
    suffix: '%',
    trend: 'up' as const,
    trendValue: 2.3,
    icon: '⚙️',
    decimals: 1
  },
  {
    title: 'Quality Score',
    value: 99.2,
    suffix: '%',
    trend: 'up' as const,
    trendValue: 0.8,
    icon: '✓',
    decimals: 1
  },
  {
    title: 'On-Time Delivery',
    value: 96.5,
    suffix: '%',
    trend: 'neutral' as const,
    trendValue: 0.2,
    icon: '🚚',
    decimals: 1
  },
  {
    title: 'Cost Reduction',
    value: 12.4,
    suffix: '%',
    trend: 'up' as const,
    trendValue: 3.1,
    icon: '💰',
    decimals: 1
  }
];

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Production Efficiency',
      data: [89, 91, 93, 94, 95, 94.7],
      borderColor: '#10b981', // Emerald 500
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
    },
    {
      label: 'Quality Score',
      data: [97, 98, 98.5, 99, 99.1, 99.2],
      borderColor: '#34d399', // Emerald 400
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
      fill: true,
    },
  ],
};

const predictionsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Demand Forecast',
      data: [2400, 2600, 2800, 3200],
      borderColor: '#38bdf8', // Sky 400
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      fill: true,
    },
    {
      label: 'Inventory Optimization',
      data: [1800, 2100, 2300, 2500],
      borderColor: '#8b5cf6', // Sky 500
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
    },
  ],
};

export default function StatisticsDisplay() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 tracking-tight">
            Strategic Performance Analytics
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Precision metrics that drive strategic decision-making and operational excellence
          </p>
        </motion.div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {automotiveKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <KPICard {...kpi} />
            </motion.div>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            title="Performance Trends"
            data={performanceData}
            height={350}
          />
          <PerformanceChart
            title="AI Predictions"
            data={predictionsData}
            height={350}
          />
        </div>

        {/* Real-time Status Indicators */}
        <motion.div
          className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-50 uppercase tracking-wider mb-4 md:mb-0">
              System Status
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm text-slate-400 font-medium">Production Lines: <span className="text-slate-300">Online</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm text-slate-400 font-medium">Quality Control: <span className="text-slate-300">Active</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                <span className="text-sm text-slate-400 font-medium">AI Models: <span className="text-slate-300">Processing</span></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
