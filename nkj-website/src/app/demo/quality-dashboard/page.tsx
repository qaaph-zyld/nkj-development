import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QualityDashboardDemo from '@/components/demos/QualityDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Quality Dashboard Demo | NKJ Development',
  description: 'Interactive manufacturing quality dashboard demonstrating real-time defect tracking and Pareto analysis.',
};

export default function QualityDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Dynamic <span className="text-sky-400">Quality Analytics</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Stop discovering defects at the end of the month. Explore how real-time inspection data transforms into actionable Pareto charts and early warning signals.
            </p>
          </div>

          <div className="mb-20">
            <QualityDashboardDemo />
          </div>

          {/* Educational Content Below Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Challenge</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quality data often lives in isolated spreadsheets or QMS modules disconnected from the production floor. By the time a Pareto chart is generated, the flawed batch has already shipped.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Our Approach</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We build automated ETL pipelines that pull inspection results directly from your QMS or MES databases, presenting them in standardized, accessible web dashboards.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Result</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quality managers can instantly identify the top defect drivers per production line and initiate corrective actions before scrap costs accumulate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
