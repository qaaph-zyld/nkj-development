import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OEECalculator from '@/components/demos/OEECalculator';
import SectionCTA from '@/components/ui/SectionCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive OEE Calculator Demo | NKJ Development',
  description: 'Experience real-time Overall Equipment Effectiveness calculation with sample manufacturing data.',
};

export default function OEECalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide mb-6">
              Interactive Demo
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              OEE <span className="text-emerald-400">Calculator</span>.
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              Overall Equipment Effectiveness (OEE) is the gold standard for measuring manufacturing productivity. 
              This interactive demo uses sample automotive production data to calculate OEE based on Availability, Performance, and Quality metrics.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            <OEECalculator />
            
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold text-slate-50 mb-4">How it works</h3>
              <ul className="space-y-3 text-slate-400 list-disc list-inside ml-4">
                <li><strong className="text-slate-300">Availability:</strong> Operating Time / Planned Production Time. Affected by breakdowns, setups, and adjustments.</li>
                <li><strong className="text-slate-300">Performance:</strong> (Total Count / Operating Time) / Ideal Run Rate. Affected by small stops and reduced speed.</li>
                <li><strong className="text-slate-300">Quality:</strong> Good Count / Total Count. Affected by startup rejects and production defects.</li>
              </ul>
              <p className="mt-6 text-sm text-slate-500 italic">
                Note: This is a client-side demo. In a production environment, this dashboard would connect directly to your ERP/MES databases to pull real-time machine states.
              </p>
            </div>
            
            <SectionCTA 
              text="Want to connect this calculator to your live production data?" 
              buttonText="Book a Demo" 
              buttonLink="/book" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
