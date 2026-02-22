import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About NKJ Development | Manufacturing Analytics Expert',
  description: '10+ years of experience in automotive manufacturing analytics, QAD ERP integration, and production optimization.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide mb-6">
              Expertise & Background
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Bridging the gap between <span className="text-emerald-400">manufacturing operations</span> and data.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              I specialize in transforming complex automotive supply chain data into actionable intelligence, without the overhead of million-dollar enterprise software deployments.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-slate-50 mb-6">Who is behind NKJ Development?</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-300 leading-relaxed mb-6">
                With over a decade of hands-on experience in Tier 1 and Tier 2 European automotive environments, I've seen firsthand how production lines actually operate—and where standard ERP implementations fall short.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Most manufacturing analytics fail because they are built by software engineers who don't understand MRP explosion logic, BOM hierarchies, or IATF 16949 quality standards. Conversely, ops teams often lack the SQL and Python skills to extract meaningful real-time insights from legacy systems like QAD or SAP.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                NKJ Development exists to bridge that exact gap. I build custom, high-performance operational dashboards and data pipelines that connect directly to your shop floor realities.
              </p>

              <h3 className="text-xl font-bold text-slate-50 mb-4 mt-8">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 mb-2 text-xl">⚙️</div>
                  <h4 className="text-slate-200 font-semibold mb-2">Systems & ERP</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• Deep QAD ERP Architecture</li>
                    <li>• SAP Data Extraction</li>
                    <li>• Legacy System Integration</li>
                    <li>• MRP Optimization</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="text-sky-400 mb-2 text-xl">📊</div>
                  <h4 className="text-slate-200 font-semibold mb-2">Data & Analytics</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• Advanced SQL Server / T-SQL</li>
                    <li>• Python Automation (Pandas/NumPy)</li>
                    <li>• Real-time Dashboard Development</li>
                    <li>• Predictive Quality Analytics</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="text-indigo-400 mb-2 text-xl">🏭</div>
                  <h4 className="text-slate-200 font-semibold mb-2">Manufacturing Domain</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• OEE Calculation & Tracking</li>
                    <li>• Production Planning & Sequencing</li>
                    <li>• Inventory Optimization</li>
                    <li>• Supplier Risk Management</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="text-amber-400 mb-2 text-xl">✓</div>
                  <h4 className="text-slate-200 font-semibold mb-2">Standards & Compliance</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• IATF 16949 Quality Systems</li>
                    <li>• ISO 9001 / ISO 14001</li>
                    <li>• VDA 6.3 Standards</li>
                    <li>• GDPR Data Privacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-50 mb-6">Ready to optimize your manufacturing data?</h3>
            <a href="/book" className="nkj-button-primary inline-block text-base px-8 py-3.5">
              Schedule a Discovery Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
