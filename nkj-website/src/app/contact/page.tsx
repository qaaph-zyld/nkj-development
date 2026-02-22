'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('There was a problem submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide mb-6">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Contact <span className="text-indigo-400">NKJ Development</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Have a specific question or prefer to email before booking a call? Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-sm h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-50 mb-6">Direct Contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                      📧
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Email</h4>
                      <a href="mailto:contact@nkj-development.com" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        contact@nkj-development.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                      📍
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Location</h4>
                      <p className="text-slate-400 font-medium">Remote (Europe)</p>
                      <p className="text-xs text-slate-500 mt-1">Available for onsite visits globally.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                      💼
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Network</h4>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                  <p className="text-sm text-slate-400 mb-4">Ready to discuss your project?</p>
                  <a href="/book" className="nkj-button-secondary text-sm w-full block text-center">
                    Book a Discovery Call
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <motion.div 
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-3xl mb-6">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-slate-50 mb-2">Message Sent</h3>
                  <p className="text-slate-400 max-w-sm mx-auto">
                    Thanks for reaching out! I'll review your message and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="hidden">
                    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company / ERP System
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                      placeholder="e.g., Acme Corp (QAD ERP)"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      How can I help?
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none placeholder:text-slate-600"
                      placeholder="Tell me a bit about your current data challenges or goals..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="nkj-button-primary w-full py-3.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-slate-50 border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
