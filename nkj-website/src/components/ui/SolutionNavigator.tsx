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
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'quality-control',
    title: 'Quality Control',
    description: 'Real-time quality monitoring and predictive defect detection using advanced analytics.',
    icon: '✅',
    features: ['Defect Detection', 'Statistical Process Control', 'Root Cause Analysis', 'Quality Metrics'],
    benefits: ['99.2% quality score', 'Reduced waste', 'Compliance assurance'],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Optimization',
    description: 'End-to-end visibility and optimization of your automotive supply chain network.',
    icon: '🔗',
    features: ['Supplier Management', 'Inventory Optimization', 'Demand Forecasting', 'Risk Assessment'],
    benefits: ['30% inventory reduction', 'Improved delivery times', 'Cost optimization'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance',
    description: 'Prevent equipment failures with AI-powered predictive maintenance solutions.',
    icon: '🔧',
    features: ['Equipment Monitoring', 'Failure Prediction', 'Maintenance Scheduling', 'Performance Analytics'],
    benefits: ['40% less downtime', 'Extended equipment life', 'Reduced maintenance costs'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'logistics',
    title: 'Logistics & Distribution',
    description: 'Optimize transportation routes and warehouse operations for maximum efficiency.',
    icon: '🚛',
    features: ['Route Optimization', 'Warehouse Management', 'Fleet Tracking', 'Delivery Analytics'],
    benefits: ['25% cost reduction', 'Faster deliveries', 'Better customer satisfaction'],
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    description: 'Ensure full compliance with automotive industry standards and regulations.',
    icon: '📋',
    features: ['ISO Standards', 'Audit Management', 'Documentation Control', 'Compliance Tracking'],
    benefits: ['100% compliance rate', 'Reduced audit time', 'Risk mitigation'],
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Transform data into actionable insights with powerful analytics and reporting tools.',
    icon: '📊',
    features: ['Real-time Dashboards', 'Custom Reports', 'Data Visualization', 'Trend Analysis'],
    benefits: ['Data-driven decisions', 'Improved visibility', 'Strategic insights'],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'integration',
    title: 'System Integration',
    description: 'Seamlessly connect with existing ERP, MES, and other automotive systems.',
    icon: '🔌',
    features: ['ERP Integration', 'API Connectivity', 'Data Synchronization', 'Legacy System Support'],
    benefits: ['Unified data view', 'Reduced silos', 'Improved efficiency'],
    color: 'from-teal-500 to-teal-600'
  }
];

export default function SolutionNavigator() {
  const [activeTab, setActiveTab] = useState(automotiveSolutions[0].id);
  const activeSolution = automotiveSolutions.find(s => s.id === activeTab) || automotiveSolutions[0];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Automotive Solutions Portfolio
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive supply chain management solutions tailored for the automotive industry
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {automotiveSolutions.map((solution, index) => (
              <motion.button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === solution.id
                    ? 'bg-green-500 text-black shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-green-500/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{solution.icon}</span>
                {solution.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Solution Overview */}
              <div>
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeSolution.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {activeSolution.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">
                      {activeSolution.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {activeSolution.description}
                </p>

                {/* Key Benefits */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Key Benefits
                  </h4>
                  <div className="space-y-2">
                    {activeSolution.benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Core Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSolution.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="bg-gray-800 border border-green-500/30 rounded-lg p-4 shadow-sm hover:border-green-400/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeSolution.color} flex items-center justify-center mr-3`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="font-medium text-white text-sm">
                          {feature}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Learn More About {activeSolution.title}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
