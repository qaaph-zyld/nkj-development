import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MRPExplorer from '@/components/demos/MRPExplorer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive MRP Explorer Demo | NKJ Development',
  description: 'Interactive Material Requirements Planning (MRP) explosion engine demonstrating real-time automotive supply chain calculations.',
};

export default function MRPExplorerPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide mb-6">
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Real-Time <span className="text-emerald-400">MRP Explosion</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Experience sub-second MRP calculations. Change top-level demand and instantly see the cascading effects across multi-level automotive Bills of Materials.
            </p>
          </div>

          <div className="mb-20">
            <MRPExplorer />
          </div>

          {/* Educational Content Below Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Challenge</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Legacy ERP systems like QAD often run MRP as a massive, hours-long overnight batch process. If demand changes at 8 AM, planners fly blind until tomorrow.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Our Approach</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                By mirroring critical BOM and inventory tables into an optimized read-replica and using recursive SQL (CTEs), we can explode requirements in milliseconds.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-50 mb-4">The Result</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Planners can run instantaneous "what-if" scenarios, test lot sizing policies, and identify material shortages before they impact the production line.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
