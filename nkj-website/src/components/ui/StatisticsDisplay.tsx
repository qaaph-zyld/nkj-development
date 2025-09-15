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
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      fill: true,
    },
    {
      label: 'Quality Score',
      data: [97, 98, 98.5, 99, 99.1, 99.2],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
      borderColor: '#22d3ee',
      backgroundColor: 'rgba(34, 211, 238, 0.1)',
      fill: true,
    },
    {
      label: 'Inventory Optimization',
      data: [1800, 2100, 2300, 2500],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
    },
  ],
};

export default function StatisticsDisplay() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-green-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Strategic Performance Analytics
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Precision metrics that drive strategic decision-making and operational excellence
          </p>
        </motion.div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {automotiveKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <KPICard {...kpi} />
            </motion.div>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          className="mt-12 bg-white rounded-lg shadow-lg p-6 border border-automotive-chrome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-automotive-carbon mb-6">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-automotive-success rounded-full animate-pulse-slow"></div>
              <span className="text-automotive-steel">Production Lines: Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-automotive-success rounded-full animate-pulse-slow"></div>
              <span className="text-automotive-steel">Quality Control: Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-automotive-electric rounded-full animate-pulse-slow"></div>
              <span className="text-automotive-steel">AI Models: Processing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
