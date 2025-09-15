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
    color: 'blue',
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
    color: 'green',
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
    color: 'purple',
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
    color: 'yellow',
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
    color: 'red',
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
    case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
    case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

const getCategoryColor = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    emerald: 'from-emerald-500 to-emerald-600'
  };
  return colors[color] || 'from-gray-500 to-gray-600';
};

export default function AutomotiveKPIs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('production');

  const currentCategory = mockAutomotiveKPIs.find(cat => cat.id === selectedCategory);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-automotive-carbon mb-4">
            Automotive KPI Monitoring
          </h2>
          <p className="text-xl text-automotive-steel max-w-3xl mx-auto">
            Comprehensive automotive industry key performance indicators with real-time monitoring and trend analysis
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {mockAutomotiveKPIs.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${getCategoryColor(category.color)} text-white shadow-lg`
                  : 'bg-white text-automotive-steel hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockAutomotiveKPIs.map((category) => {
            const avgScore = category.metrics.reduce((acc, metric) => 
              acc + (metric.value / metric.target * 100), 0) / category.metrics.length;
            
            return (
              <motion.div
                key={category.id}
                className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <span className={`text-2xl font-bold ${
                    avgScore >= 100 ? 'text-green-600' :
                    avgScore >= 90 ? 'text-blue-600' :
                    avgScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {avgScore.toFixed(0)}%
                  </span>
                </div>
                <h3 className="font-semibold text-automotive-carbon mb-2">{category.name}</h3>
                <div className="text-sm text-automotive-steel">
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{currentCategory.icon}</span>
                <h3 className="text-2xl font-semibold text-automotive-carbon">
                  {currentCategory.name}
                </h3>
              </div>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Export Data
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentCategory.metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {/* Future: setSelectedMetric(metric) */}}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-automotive-carbon">{metric.name}</h4>
                    <span className="text-xl">{getTrendIcon(metric.trend)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline">
                        <AnimatedCounter 
                          end={metric.value} 
                          decimals={metric.unit === '%' || metric.unit.includes('per') ? 1 : 2}
                          className="text-3xl font-bold text-automotive-carbon"
                        />
                        <span className="text-lg text-automotive-steel ml-1">{metric.unit}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-automotive-steel">Target: {metric.target}{metric.unit}</span>
                      <span className={`font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '' : '±'}{metric.trendValue.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metric.status === 'excellent' ? 'bg-green-500' :
                          metric.status === 'good' ? 'bg-blue-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                        }}
                      />
                    </div>
                    
                    <p className="text-xs text-automotive-steel">{metric.description}</p>
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center"
        >
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-2xl font-semibold text-automotive-carbon mb-4">
            Advanced KPI Analytics
          </h4>
          <p className="text-automotive-steel mb-6 max-w-2xl mx-auto">
            Interactive dashboards with predictive analytics, benchmarking against industry standards, 
            and automated alerting for critical KPI deviations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-automotive-steel">Real-time Monitoring</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-automotive-steel">Prediction Accuracy</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-automotive-steel">KPIs Tracked</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
