'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  color: string;
}

const automotiveSolutions: Solution[] = [
  {
    id: 'production-planning',
    title: 'Production Planning',
    description: 'Optimize manufacturing schedules and resource allocation with AI-driven planning algorithms.',
    icon: '🏭',
    features: ['Capacity Planning', 'Resource Optimization', 'Schedule Automation', 'Bottleneck Analysis'],
    benefits: ['15% efficiency increase', 'Reduced downtime', 'Better resource utilization'],
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'quality-control',
    title: 'Quality Control',
    description: 'Real-time quality monitoring and predictive defect detection using advanced analytics.',
    icon: '✅',
    features: ['Defect Detection', 'Statistical Process Control', 'Root Cause Analysis', 'Quality Metrics'],
    benefits: ['99.2% quality score', 'Reduced waste', 'Compliance assurance'],
    color: 'from-emerald-400 to-emerald-500'
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Optimization',
    description: 'End-to-end visibility and optimization of your automotive supply chain network.',
    icon: '🔗',
    features: ['Supplier Management', 'Inventory Optimization', 'Demand Forecasting', 'Risk Assessment'],
    benefits: ['30% inventory reduction', 'Improved delivery times', 'Cost optimization'],
    color: 'from-slate-600 to-slate-700'
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance',
    description: 'Prevent equipment failures with AI-powered predictive maintenance solutions.',
    icon: '🔧',
    features: ['Equipment Monitoring', 'Failure Prediction', 'Maintenance Scheduling', 'Performance Analytics'],
    benefits: ['40% less downtime', 'Extended equipment life', 'Reduced maintenance costs'],
    color: 'from-sky-500 to-sky-600'
  },
  {
    id: 'logistics',
    title: 'Logistics & Distribution',
    description: 'Optimize transportation routes and warehouse operations for maximum efficiency.',
    icon: '🚛',
    features: ['Route Optimization', 'Warehouse Management', 'Fleet Tracking', 'Delivery Analytics'],
    benefits: ['25% cost reduction', 'Faster deliveries', 'Better customer satisfaction'],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    description: 'Ensure full compliance with automotive industry standards and regulations.',
    icon: '📋',
    features: ['ISO Standards', 'Audit Management', 'Documentation Control', 'Compliance Tracking'],
    benefits: ['100% compliance rate', 'Reduced audit time', 'Risk mitigation'],
    color: 'from-slate-500 to-slate-600'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Transform data into actionable insights with powerful analytics and reporting tools.',
    icon: '📊',
    features: ['Real-time Dashboards', 'Custom Reports', 'Data Visualization', 'Trend Analysis'],
    benefits: ['Data-driven decisions', 'Improved visibility', 'Strategic insights'],
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 'integration',
    title: 'System Integration',
    description: 'Seamlessly connect with existing ERP, MES, and other automotive systems.',
    icon: '🔌',
    features: ['ERP Integration', 'API Connectivity', 'Data Synchronization', 'Legacy System Support'],
    benefits: ['Unified data view', 'Reduced silos', 'Improved efficiency'],
    color: 'from-sky-600 to-sky-700'
  }
];

export default function SolutionNavigator() {
  const [activeTab, setActiveTab] = useState(automotiveSolutions[0].id);
  const activeSolution = automotiveSolutions.find(s => s.id === activeTab) || automotiveSolutions[0];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max md:min-w-0">
          {automotiveSolutions.map((solution) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(solution.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === solution.id
                  ? 'bg-emerald-500 text-slate-50 shadow-sm border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="mr-2">{solution.icon}</span>
              {solution.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Solution Overview */}
            <div>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${activeSolution.color} flex items-center justify-center text-xl shadow-sm`}>
                  {activeSolution.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-slate-50 tracking-tight">
                    {activeSolution.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-slate-400 text-base mb-8 leading-relaxed">
                {activeSolution.description}
              </p>

              {/* Key Benefits */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                  Key Business Outcomes
                </h4>
                <div className="space-y-3">
                  {activeSolution.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      className="flex items-center text-slate-400 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="text-emerald-500 mr-3">✓</span>
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-slate-950 rounded-lg p-6 border border-slate-800/50">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">
                Core Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSolution.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${activeSolution.color} mr-3`}></div>
                      <span className="font-medium text-slate-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                className="mt-8 pt-6 border-t border-slate-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <button className="w-full nkj-button-secondary text-sm">
                  View Technical Specifications
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
