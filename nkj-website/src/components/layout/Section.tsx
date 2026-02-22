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
        return 'bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800/50';
      case 'network':
        return 'bg-slate-950 relative overflow-hidden';
      default:
        return 'bg-slate-950';
    }
  };

  const getSectionPadding = () => {
    switch (variant) {
      case 'hero':
        return 'py-24 lg:py-32';
      case 'showcase':
        return 'py-20 lg:py-28';
      case 'footer':
        return 'py-16';
      default:
        return 'py-20 lg:py-24';
    }
  };

  return (
    <section 
      id={id}
      className={`${getBackgroundClass()} ${getSectionPadding()} ${className}`}
    >
      {background === 'network' && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <motion.div
            className="max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-400 leading-relaxed">
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
