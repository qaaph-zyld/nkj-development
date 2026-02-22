import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OEECalculator from '@/components/demos/OEECalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive OEE Calculator Demo | NKJ Development',
  description: 'Interactive Overall Equipment Effectiveness (OEE) calculator demonstrating real-time manufacturing analytics capabilities.',
};

export default function OEECalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide mb-6">
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Calculate Your <span className="text-amber-400">OEE Potential</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Explore how small improvements in availability, performance, or quality cascade into significant bottom-line gains. Play with the sliders below or load our sample manufacturing dataset.
            </p>
          </div>

          <div className="mb-20">
            <OEECalculator />
          </div>

          {/* Educational Content Below Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Availability</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Measures equipment uptime. It takes into account all unplanned downtime (breakdowns, missing materials) and planned downtime (changeovers, maintenance).
              </p>
              <div className="bg-slate-950 p-4 rounded text-xs font-mono text-emerald-400 border border-slate-800">
                Operating Time / Planned Production Time
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Performance</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Measures production speed. It accounts for anything that causes the manufacturing process to operate at less than the maximum possible speed (minor stops, slow cycles).
              </p>
              <div className="bg-slate-950 p-4 rounded text-xs font-mono text-sky-400 border border-slate-800">
                (Ideal Cycle Time × Total Count) / Operating Time
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Quality</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Measures good units produced. It accounts for manufactured parts that do not meet quality standards, including parts that need rework.
              </p>
              <div className="bg-slate-950 p-4 rounded text-xs font-mono text-indigo-400 border border-slate-800">
                Good Count / Total Count
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
