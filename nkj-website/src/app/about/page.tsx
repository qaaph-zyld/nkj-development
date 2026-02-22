import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import CTABanner from '@/components/ui/CTABanner';

export const metadata: Metadata = {
  title: 'About NKJ Development | Manufacturing Analytics Expert',
  description: '10+ years of experience in automotive manufacturing analytics, QAD ERP integration, and production optimization.',
};

export default function AboutPage() {
  const technologies = [
    { name: 'SQL Server', icon: '🗄️' },
    { name: 'Python', icon: '🐍' },
    { name: 'QAD ERP', icon: '🏭' },
    { name: 'Next.js', icon: '▲' },
    { name: 'D3.js', icon: '📊' },
    { name: 'Three.js', icon: '🧊' }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
                Background & Expertise
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 tracking-tight">
                Bridging the gap between <span className="text-sky-400">the factory floor</span> and the boardroom.
              </h1>
              
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  With over 10 years of experience in the automotive manufacturing sector, I specialize in extracting trapped data from legacy ERP systems (like QAD) and turning it into real-time, actionable visibility.
                </p>
                <p>
                  I've seen firsthand how a €20M production line can be brought to a halt because critical information was stuck in a nightly batch process or a supervisor's Excel sheet. My work focuses on eliminating those blind spots.
                </p>
                <p>
                  At NKJ Development, I don't just build dashboards. I build the robust SQL extraction pipelines and Python ETL layers required to make those dashboards accurate and reliable, without disrupting your core transactional systems.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-slate-50 mb-6 flex items-center gap-2">
                  <span className="text-emerald-400">⚙</span> Core Expertise
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <div>
                      <strong className="text-slate-200 block">Legacy ERP Extraction</strong>
                      <span className="text-sm text-slate-400">Direct database polling from Progress/OpenEdge (QAD) and AS400 systems without impacting ERP performance.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <div>
                      <strong className="text-slate-200 block">Production Analytics</strong>
                      <span className="text-sm text-slate-400">Real-time OEE calculation, scrap Pareto analysis, and live production line monitoring.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <div>
                      <strong className="text-slate-200 block">Supply Chain Visibility</strong>
                      <span className="text-sm text-slate-400">Dynamic MRP explosion mapping and automated supplier risk scoring scorecards.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Visuals & Tech Stack */}
            <div className="space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-50 mb-8">Technology Stack</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {technologies.map((tech) => (
                      <div key={tech.name} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-sky-500/50 transition-colors">
                        <span className="text-3xl">{tech.icon}</span>
                        <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-slate-50 mb-4">My Philosophy</h3>
                <blockquote className="border-l-4 border-emerald-500 pl-4 text-slate-400 italic">
                  "Data is only valuable if the people doing the work can see it in real-time. A beautifully formatted PDF delivered 24 hours too late is just a historical record of failure."
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner 
        heading="Let's find the bottlenecks in your data." 
        subtext="Schedule a free 30-minute discovery call to discuss your current ERP setup and reporting challenges." 
        buttonText="Book a Discovery Call" 
        buttonLink="/book" 
      />

      <Footer />
    </main>
  );
}
