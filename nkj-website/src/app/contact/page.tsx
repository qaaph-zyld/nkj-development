import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | NKJ Development',
  description: 'Get in touch to discuss your manufacturing data integration needs.',
};

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Contact Info */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
                Let's solve your <span className="text-sky-400">data puzzle</span>.
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-12">
                Whether you need a custom QAD extraction pipeline, a real-time OEE dashboard, or just want to bounce an idea off an expert—send a message.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-slate-50 font-bold mb-1">Email</h3>
                    <a href="mailto:info@nkj-development.com" className="text-slate-400 hover:text-sky-400 transition-colors">
                      info@nkj-development.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-slate-50 font-bold mb-1">Schedule a Call</h3>
                    <p className="text-slate-400 mb-2">Want to jump straight to a conversation?</p>
                    <a href="/book" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1">
                      Book a 30-min discovery call <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-slate-50 mb-6">Send a Message</h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
