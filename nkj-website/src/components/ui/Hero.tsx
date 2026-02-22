'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Enterprise Subtle Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 100% 100%, rgba(15, 23, 42, 1) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Subtle Grid Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* subtle badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Enterprise Supply Chain Intelligence
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-50 mb-6 tracking-tight">
            Strategic Optimization for
            <span className="block text-emerald-400 mt-2">Automotive Manufacturing</span>
          </h1>
          
          <motion.p
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform complex supply chain data into actionable intelligence. 
            Built specifically for European automotive leaders requiring GDPR compliance, 
            real-time analytics, and ISO-certified quality control.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/book" className="nkj-button-primary text-base px-8 py-3.5 w-full sm:w-auto text-center inline-block">
              Schedule Consultation
            </Link>
            <Link href="#solutions" className="nkj-button-secondary text-base px-8 py-3.5 w-full sm:w-auto text-center inline-block">
              Explore Solutions
            </Link>
          </motion.div>

          {/* Key Stats - Honest Credibility */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-slate-50 mb-1 tracking-tight">10+</div>
              <div className="text-sm font-medium text-emerald-400 mb-1">Years Experience</div>
              <div className="text-xs text-slate-500">Manufacturing Analytics</div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
              <div className="text-3xl font-bold text-slate-50 mb-1 tracking-tight">Tier 1/2</div>
              <div className="text-sm font-medium text-emerald-400 mb-1">Automotive Specialist</div>
              <div className="text-xs text-slate-500">European market focus</div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-slate-50 mb-1 tracking-tight">Expert</div>
              <div className="text-sm font-medium text-emerald-400 mb-1">QAD · SAP · SQL</div>
              <div className="text-xs text-slate-500">Seamless ERP integration</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}
