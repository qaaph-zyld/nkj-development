import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalEmbed from '@/components/booking/CalEmbed';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation | NKJ Development',
  description: 'Schedule a free discovery call to discuss your manufacturing analytics and ERP integration needs.',
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
              Free Discovery Call
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Let's talk about your <span className="text-sky-400">data bottlenecks</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Schedule a 30-minute consultation to discuss your specific manufacturing challenges. If I can't help, I'll point you to someone who can.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-sm">
              <div className="text-emerald-400 text-3xl mb-3">1</div>
              <h3 className="text-slate-200 font-bold mb-2">Book a Time</h3>
              <p className="text-xs text-slate-500">Pick a slot that works for your schedule using the calendar below.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-sm">
              <div className="text-emerald-400 text-3xl mb-3">2</div>
              <h3 className="text-slate-200 font-bold mb-2">Brief Intake</h3>
              <p className="text-xs text-slate-500">Answer a few quick questions about your ERP and main challenges.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-sm">
              <div className="text-emerald-400 text-3xl mb-3">3</div>
              <h3 className="text-slate-200 font-bold mb-2">Discovery Call</h3>
              <p className="text-xs text-slate-500">We'll discuss your specific goals and see if we're a good fit.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-2 sm:p-4 rounded-2xl shadow-lg">
            <CalEmbed />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">Prefer to send an email first?</p>
            <a href="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Use the contact form instead →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
