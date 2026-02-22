import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QualityDashboardDemo from '@/components/demos/QualityDashboard';
import SectionCTA from '@/components/ui/SectionCTA';
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
              <QualityDashboardDemo />
              
              <div className="mt-8 pt-8 border-t border-slate-800">
                <h3 className="text-xl font-bold text-slate-50 mb-4">How it works</h3>
                <ul className="space-y-3 text-slate-400 list-disc list-inside ml-4">
                  <li><strong className="text-slate-300">Pareto Analysis:</strong> Automatically categorizes and ranks defects by frequency, helping you focus engineering resources on the vital few issues.</li>
                  <li><strong className="text-slate-300">Supplier Linkage:</strong> Correlates final assembly defects back to the specific component supplier and batch number.</li>
                  <li><strong className="text-slate-300">Trend Monitoring:</strong> Tracks First Pass Yield (FPY) over time to ensure corrective actions are actually working.</li>
                </ul>
                <p className="mt-6 text-sm text-slate-500 italic">
                  Note: This is a client-side demo. In a production environment, we connect this dashboard directly to your QMS and ERP receiving inspection databases.
                </p>
              </div>

              <SectionCTA 
                text="Tired of fighting fires without data? Let's build your quality dashboard." 
                buttonText="Book a Demo" 
                buttonLink="/book" 
              />
            </div>
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
