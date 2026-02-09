'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 overflow-hidden">
      {/* NKJ Network Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(110, 231, 183, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(74, 222, 128, 0.1) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Geometric Network Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(74, 222, 128, 0.4)"/>
              <line x1="50" y1="50" x2="100" y2="0" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="1"/>
              <line x1="50" y1="50" x2="0" y2="100" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* NKJ Logo with Geometric Hexagon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 transform rotate-45 rounded-lg shadow-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black font-bold text-xl transform -rotate-45">NKJ</span>
              </div>
            </div>
          </div>

          <h1 className="nkj-heading-xl text-white mb-6">
            <span className="block nkj-text-gradient">
              NKJ Development
            </span>
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic Technology Consultancy • Analytical Precision • Creative Innovation
          </motion.p>

          <motion.p
            className="text-lg text-green-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming business challenges into strategic advantages through empathetic engineering and technical mastery
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="nkj-button-primary text-lg px-8 py-4">
              Explore Solutions
            </button>
            <button className="nkj-button-secondary text-lg px-8 py-4">
              Schedule Consultation
            </button>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="nkj-card text-center p-8 group">
              <div className="text-4xl md:text-5xl font-bold nkj-text-gradient mb-3">
                150+
              </div>
              <div className="text-gray-300 text-lg font-medium">Projects Delivered</div>
              <div className="text-sm text-gray-400 mt-2">Automotive Excellence</div>
            </div>
            <div className="nkj-card text-center p-8 group pulse-glow">
              <div className="text-4xl md:text-5xl font-bold nkj-text-gradient mb-3">
                98.5%
              </div>
              <div className="text-gray-300 text-lg font-medium">Client Satisfaction</div>
              <div className="text-sm text-gray-400 mt-2">Industry Leading</div>
            </div>
            <div className="nkj-card text-center p-8 group">
              <div className="text-4xl md:text-5xl font-bold nkj-text-gradient mb-3">
                24/7
              </div>
              <div className="text-gray-300 text-lg font-medium">Technical Support</div>
              <div className="text-sm text-gray-400 mt-2">Always Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-green-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
