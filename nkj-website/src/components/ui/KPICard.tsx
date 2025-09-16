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
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
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
      className={`bg-gray-900 border border-green-500/30 rounded-lg shadow-xl p-6 hover:shadow-2xl hover:border-green-400/50 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className="text-green-400 text-2xl">
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
          className="text-3xl font-bold text-white"
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
