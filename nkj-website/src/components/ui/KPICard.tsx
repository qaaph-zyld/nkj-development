'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  icon?: React.ReactNode;
  className?: string;
  decimals?: number;
}

export default function KPICard({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = 'neutral',
  trendValue,
  icon,
  className = '',
  decimals = 0
}: KPICardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'down':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-400 bg-slate-800/50 border-slate-700/50';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className={`bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {title}
        </h3>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 transition-colors shadow-sm">
            <span className="text-sm">{icon}</span>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className="text-3xl font-bold text-slate-50 tracking-tight"
        />
      </div>
      
      {trendValue !== undefined && (
        <div className="flex items-center text-sm">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            {Math.abs(trendValue)}%
          </span>
          <span className="ml-2 text-slate-500 text-xs">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
