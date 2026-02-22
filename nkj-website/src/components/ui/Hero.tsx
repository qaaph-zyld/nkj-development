'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide mb-8">
            Manufacturing Analytics & Data Engineering
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-50 tracking-tight mb-8">
            Stop guessing.<br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">knowing.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            I extract trapped data from legacy ERPs (QAD, SAP) and turn it into real-time production visibility for automotive Tier 1 & 2 suppliers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/book" 
              className="nkj-button-primary px-8 py-4 text-lg w-full sm:w-auto"
            >
              Book a Discovery Call
            </Link>
            <Link 
              href="#solutions" 
              className="px-8 py-4 text-lg font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-all w-full sm:w-auto"
            >
              See the Dashboards
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Honest Metrics Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-slate-50 mb-2">10+ Years</div>
            <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Manufacturing Data Experience</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-slate-50 mb-2">QAD · SQL · Python</div>
            <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Enterprise ERP Specialist</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-slate-50 mb-2">Automotive Tier 1/2</div>
            <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Industry Focus</div>
          </div>
        </motion.div>
      </div>

      {/* Technology Credibility Bar */}
      <div className="relative z-10 w-full border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Integrating with enterprise tools and modern stacks
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tech text logos */}
            <span className="text-xl font-bold text-slate-300">QAD</span>
            <span className="text-xl font-bold text-slate-300">SAP</span>
            <span className="text-xl font-bold text-slate-300">SQL Server</span>
            <span className="text-xl font-bold text-slate-300">Python</span>
            <span className="text-xl font-bold text-slate-300">Next.js</span>
            <span className="text-xl font-bold text-slate-300">D3.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}
