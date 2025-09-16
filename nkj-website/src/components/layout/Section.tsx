'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'showcase' | 'footer';
  background?: 'dark' | 'gradient' | 'network';
}

export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '', 
  variant = 'default',
  background = 'dark'
}: SectionProps) {
  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-br from-slate-900 to-blue-900';
      case 'network':
        return 'bg-gradient-to-br from-gray-900 to-black relative overflow-hidden';
      default:
        return 'bg-gray-900';
    }
  };

  const getSectionPadding = () => {
    switch (variant) {
      case 'hero':
        return 'py-20 lg:py-32';
      case 'showcase':
        return 'py-16 lg:py-24';
      case 'footer':
        return 'py-12';
      default:
        return 'py-16';
    }
  };

  return (
    <section 
      id={id}
      className={`${getBackgroundClass()} ${getSectionPadding()} ${className}`}
    >
      {background === 'network' && (
        <div className="absolute inset-0 opacity-10">
          <div className="network-bg"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
}
