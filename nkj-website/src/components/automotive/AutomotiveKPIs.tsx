'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  category: 'production' | 'quality' | 'delivery' | 'cost' | 'safety' | 'environmental';
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  lastUpdated: string;
}

interface KPICategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  metrics: KPIMetric[];
}

const mockAutomotiveKPIs: KPICategory[] = [
  {
    id: 'production',
    name: 'Production Excellence',
    icon: '🏭',
    color: 'emerald',
    metrics: [
      {
        id: 'oee',
        name: 'Overall Equipment Effectiveness (OEE)',
        value: 87.5,
        target: 85.0,
        unit: '%',
        category: 'production',
        trend: 'up',
        trendValue: 2.3,
        status: 'excellent',
        description: 'Measures manufacturing productivity combining availability, performance, and quality',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'cycle-time',
        name: 'Average Cycle Time',
        value: 45.2,
        target: 50.0,
        unit: 'minutes',
        category: 'production',
        trend: 'down',
        trendValue: -1.8,
        status: 'excellent',
        description: 'Time required to complete one production cycle',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'throughput',
        name: 'Production Throughput',
        value: 1247,
        target: 1200,
        unit: 'units/day',
        category: 'production',
        trend: 'up',
        trendValue: 3.9,
        status: 'excellent',
        description: 'Daily production output across all lines',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'downtime',
        name: 'Unplanned Downtime',
        value: 2.1,
        target: 3.0,
        unit: '%',
        category: 'production',
        trend: 'down',
        trendValue: -0.5,
        status: 'good',
        description: 'Percentage of time production lines are down unexpectedly',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'quality',
    name: 'Quality Assurance',
    icon: '🎯',
    color: 'emerald',
    metrics: [
      {
        id: 'first-pass-yield',
        name: 'First Pass Yield',
        value: 98.7,
        target: 97.0,
        unit: '%',
        category: 'quality',
        trend: 'up',
        trendValue: 0.8,
        status: 'excellent',
        description: 'Percentage of products passing quality inspection on first attempt',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'defect-rate',
        name: 'Defect Rate',
        value: 0.65,
        target: 1.0,
        unit: '%',
        category: 'quality',
        trend: 'down',
        trendValue: -0.15,
        status: 'excellent',
        description: 'Percentage of products with defects',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'customer-complaints',
        name: 'Customer Complaints',
        value: 1.8,
        target: 3.0,
        unit: 'per 1000',
        category: 'quality',
        trend: 'stable',
        trendValue: 0.1,
        status: 'good',
        description: 'Customer complaints per 1000 units shipped',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'warranty-claims',
        name: 'Warranty Claims',
        value: 0.42,
        target: 0.5,
        unit: '%',
        category: 'quality',
        trend: 'down',
        trendValue: -0.08,
        status: 'excellent',
        description: 'Percentage of products with warranty claims',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'delivery',
    name: 'Delivery Performance',
    icon: '🚚',
    color: 'sky',
    metrics: [
      {
        id: 'on-time-delivery',
        name: 'On-Time Delivery',
        value: 96.3,
        target: 95.0,
        unit: '%',
        category: 'delivery',
        trend: 'up',
        trendValue: 1.2,
        status: 'excellent',
        description: 'Percentage of orders delivered on or before promised date',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'lead-time',
        name: 'Average Lead Time',
        value: 12.5,
        target: 14.0,
        unit: 'days',
        category: 'delivery',
        trend: 'down',
        trendValue: -1.5,
        status: 'excellent',
        description: 'Average time from order to delivery',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'fill-rate',
        name: 'Order Fill Rate',
        value: 94.8,
        target: 95.0,
        unit: '%',
        category: 'delivery',
        trend: 'stable',
        trendValue: -0.2,
        status: 'warning',
        description: 'Percentage of orders fulfilled completely',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'cost',
    name: 'Cost Management',
    icon: '💰',
    color: 'slate',
    metrics: [
      {
        id: 'cost-per-unit',
        name: 'Cost Per Unit',
        value: 127.50,
        target: 135.00,
        unit: '£',
        category: 'cost',
        trend: 'down',
        trendValue: -5.6,
        status: 'excellent',
        description: 'Average manufacturing cost per unit',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'material-variance',
        name: 'Material Cost Variance',
        value: 2.3,
        target: 5.0,
        unit: '%',
        category: 'cost',
        trend: 'up',
        trendValue: 0.8,
        status: 'good',
        description: 'Variance from standard material costs',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'labor-efficiency',
        name: 'Labor Efficiency',
        value: 92.1,
        target: 90.0,
        unit: '%',
        category: 'cost',
        trend: 'up',
        trendValue: 1.5,
        status: 'excellent',
        description: 'Actual vs. standard labor hours',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'safety',
    name: 'Safety & Health',
    icon: '🦺',
    color: 'indigo',
    metrics: [
      {
        id: 'ltir',
        name: 'Lost Time Injury Rate',
        value: 0.8,
        target: 1.5,
        unit: 'per 200k hours',
        category: 'safety',
        trend: 'down',
        trendValue: -0.3,
        status: 'excellent',
        description: 'Number of lost time injuries per 200,000 work hours',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'near-misses',
        name: 'Near Miss Reports',
        value: 45,
        target: 40,
        unit: 'per month',
        category: 'safety',
        trend: 'up',
        trendValue: 12.5,
        status: 'warning',
        description: 'Number of near miss incidents reported monthly',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'safety-training',
        name: 'Safety Training Completion',
        value: 98.2,
        target: 100.0,
        unit: '%',
        category: 'safety',
        trend: 'up',
        trendValue: 2.1,
        status: 'good',
        description: 'Percentage of employees with current safety training',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'environmental',
    name: 'Environmental Impact',
    icon: '🌱',
    color: 'emerald',
    metrics: [
      {
        id: 'energy-consumption',
        name: 'Energy Consumption',
        value: 2.45,
        target: 2.8,
        unit: 'kWh/unit',
        category: 'environmental',
        trend: 'down',
        trendValue: -12.5,
        status: 'excellent',
        description: 'Energy consumption per unit produced',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'waste-reduction',
        name: 'Waste Reduction',
        value: 15.7,
        target: 10.0,
        unit: '%',
        category: 'environmental',
        trend: 'up',
        trendValue: 5.7,
        status: 'excellent',
        description: 'Percentage reduction in waste generation',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'carbon-footprint',
        name: 'Carbon Footprint',
        value: 1.85,
        target: 2.0,
        unit: 'kg CO2/unit',
        category: 'environmental',
        trend: 'down',
        trendValue: -7.5,
        status: 'excellent',
        description: 'Carbon emissions per unit produced',
        lastUpdated: '2024-01-15T10:30:00Z'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'good': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-slate-800 text-slate-400 border-slate-700';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗';
    case 'down': return '↘';
    case 'stable': return '→';
    default: return '→';
  }
};

const getCategoryColor = (color: string) => {
  const colors: Record<string, string> = {
    sky: 'from-sky-500 to-sky-600',
    emerald: 'from-emerald-500 to-emerald-600',
    indigo: 'from-indigo-500 to-indigo-600',
    slate: 'from-slate-600 to-slate-700',
    red: 'from-red-500 to-red-600'
  };
  return colors[color] || 'from-slate-600 to-slate-700';
};

export default function AutomotiveKPIs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('production');

  const currentCategory = mockAutomotiveKPIs.find(cat => cat.id === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max md:min-w-0">
          {mockAutomotiveKPIs.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-slate-50 shadow-sm border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockAutomotiveKPIs.slice(0, 4).map((category) => {
          const avgScore = category.metrics.reduce((acc, metric) => 
            acc + (metric.value / metric.target * 100), 0) / category.metrics.length;
          
          return (
            <motion.div
              key={category.id}
              className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 hover:border-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{category.icon}</span>
                <span className={`text-xl font-bold tracking-tight ${
                  avgScore >= 100 ? 'text-emerald-500' :
                  avgScore >= 90 ? 'text-sky-500' :
                  avgScore >= 80 ? 'text-amber-500' : 'text-red-500'
                }`}>
                  {avgScore.toFixed(0)}%
                </span>
              </div>
              <h3 className="font-semibold text-slate-50 mb-1 tracking-tight">{category.name}</h3>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {category.metrics.length} metrics tracked
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed KPI Metrics */}
      {currentCategory && (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <span className="text-3xl mr-4 bg-slate-800 p-2 rounded-lg border border-slate-700 shadow-sm">{currentCategory.icon}</span>
              <h3 className="text-2xl font-bold text-slate-50 tracking-tight">
                {currentCategory.name}
              </h3>
            </div>
            <button className="nkj-button-secondary text-sm">
              Export Data Report
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCategory.metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="bg-slate-950 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">{metric.name}</h4>
                  <span className={`text-lg ${
                    metric.trend === 'up' ? 'text-emerald-500' : 
                    metric.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                  }`}>{getTrendIcon(metric.trend)}</span>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline">
                      <AnimatedCounter 
                        end={metric.value} 
                        decimals={metric.unit === '%' || metric.unit.includes('per') ? 1 : 2}
                        className="text-3xl font-bold text-slate-50 tracking-tight"
                      />
                      <span className="text-sm font-medium text-slate-500 ml-2">{metric.unit}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(metric.status)}`}>
                      {metric.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-500">Target: {metric.target}{metric.unit}</span>
                    <span className={`${
                      metric.trend === 'up' ? 'text-emerald-500' : 
                      metric.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                    }`}>
                      {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '' : '±'}{metric.trendValue.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.status === 'excellent' ? 'bg-emerald-500' :
                        metric.status === 'good' ? 'bg-sky-500' :
                        metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* KPI Trends Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-6 text-2xl shadow-sm text-emerald-400">
          📊
        </div>
        <h4 className="text-xl font-bold text-slate-50 mb-4 tracking-tight">
          Advanced Analytics Integration
        </h4>
        <p className="text-slate-400 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
          Interactive dashboards with predictive models, enterprise benchmarking, 
          and automated alerting for critical deviations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm">
            <div className="text-2xl font-bold text-emerald-500 tracking-tight mb-1">24/7</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Real-time Monitoring</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm">
            <div className="text-2xl font-bold text-sky-500 tracking-tight mb-1">98%</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Prediction Accuracy</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-sm">
            <div className="text-2xl font-bold text-indigo-500 tracking-tight mb-1">100+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">KPIs Tracked</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
