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
      className="nkj-card p-8 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:from-green-400/30 group-hover:to-green-500/30 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed text-base">
        {description}
      </p>
      
      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></div>
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
    <div className={`grid ${getGridClass()} gap-8`}>
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
