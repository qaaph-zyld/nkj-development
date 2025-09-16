'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Data Analytics', href: '#analytics' },
        { label: 'AI/ML Solutions', href: '#ml' },
        { label: 'Automotive Systems', href: '#automotive' },
        { label: 'API Integration', href: '#api' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Production Planning', href: '#production' },
        { label: 'Quality Control', href: '#quality' },
        { label: 'Supply Chain', href: '#supply' },
        { label: 'Compliance', href: '#compliance' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-500 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg rotate-45 flex items-center justify-center">
                <span className="text-green-400 font-bold text-sm -rotate-45">NKJ</span>
              </div>
              <span className="font-bold text-xl">NKJ Development</span>
            </div>
            <p className="text-black/80 mb-4 leading-relaxed">
              Transforming automotive industries with cutting-edge data analytics, 
              AI/ML solutions, and comprehensive digital transformation services.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm">📧</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm">💼</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm">🐙</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-black/80 hover:text-black transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-black/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-black/80 text-sm mb-4 md:mb-0">
            © 2024 NKJ Development. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-black/80 hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-black/80 hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-black/80 hover:text-black transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
