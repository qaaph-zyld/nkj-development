'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features?: string[];
  delay?: number;
}

interface ServiceGridProps {
  services: ServiceCardProps[];
  columns?: 2 | 3 | 4;
}

function ServiceCard({ icon, title, description, features, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-gray-800 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-900/30 border border-green-500/30 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
          {title}
        </h3>
      </div>
      
      <p className="text-gray-300 mb-4 leading-relaxed">
        {description}
      </p>
      
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function ServiceGrid({ services, columns = 3 }: ServiceGridProps) {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          {...service}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
