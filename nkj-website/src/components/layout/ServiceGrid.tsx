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
      className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300 group shadow-sm hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mr-4 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-50 group-hover:text-emerald-400 transition-colors duration-300 tracking-tight">
          {title}
        </h3>
      </div>
      
      <p className="text-slate-400 mb-6 leading-relaxed text-sm">
        {description}
      </p>
      
      {features && features.length > 0 && (
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
              <span className="text-emerald-500 mr-2 mt-0.5 text-[10px]">■</span>
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
