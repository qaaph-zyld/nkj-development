import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SupplyChainScorer from '@/components/demos/SupplyChainScorer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Supplier Risk Scorer Demo | NKJ Development',
  description: 'Interactive supply chain risk assessment tool demonstrating dynamic supplier scoring algorithms.',
};

export default function SupplyChainScorerPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium tracking-wide mb-6">
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Dynamic <span className="text-red-400">Supplier Risk Scoring</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Different production lines have different priorities. A JIT line needs perfect delivery, while a critical safety component demands zero PPM. See how dynamic weighting reshapes your supplier risk profile.
            </p>
          </div>

          <div className="mb-20">
            <SupplyChainScorer />
          </div>

          {/* Educational Content Below Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Challenge</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Most OEMs use a static, one-size-fits-all supplier scorecard updated quarterly. This fails to account for fluctuating business priorities and hides emerging risks until a stock-out occurs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Our Approach</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We integrate your ERP receipt data, QMS defect logs, and external risk feeds into a live scoring engine. Algorithms adjust weightings based on component criticality and current supply chain volatility.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Result</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Procurement teams receive automated alerts when a critical supplier's risk profile shifts, allowing for proactive sourcing adjustments before the assembly line stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
