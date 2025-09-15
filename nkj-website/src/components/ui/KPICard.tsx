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
        return 'text-automotive-success';
      case 'down':
        return 'text-automotive-danger';
      default:
        return 'text-automotive-steel';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 border border-automotive-chrome hover:shadow-xl transition-shadow duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-automotive-steel uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className="text-primary-500 text-2xl">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className="text-3xl font-bold text-automotive-carbon"
        />
      </div>
      
      {trendValue !== undefined && (
        <div className={`flex items-center text-sm ${getTrendColor()}`}>
          <span className="mr-1">{getTrendIcon()}</span>
          <span className="font-medium">
            {Math.abs(trendValue)}% vs last month
          </span>
        </div>
      )}
    </motion.div>
  );
}
