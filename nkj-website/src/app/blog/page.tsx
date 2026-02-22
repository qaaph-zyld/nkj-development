import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import CTABanner from '@/components/ui/CTABanner';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing Analytics Blog | NKJ Development',
  description: 'Insights and strategies for optimizing automotive manufacturing operations through data analytics, ERP integration, and customized dashboards.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
              Insights & Strategies
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              The <span className="text-sky-400">Manufacturing Analytics</span> Blog.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Practical guides and case studies on how automotive Tier 1/2 suppliers are extracting real-time value from legacy ERP and QMS systems.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="text-4xl mb-4 opacity-50 grayscale">📝</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">No posts yet</h3>
              <p className="text-slate-400">Check back soon for insights on manufacturing analytics.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner 
        heading="Need help implementing these strategies?" 
        subtext="Stop wrestling with Excel exports and legacy reporting tools. Let's build automated, real-time data pipelines for your manufacturing operation." 
        buttonText="Schedule a Technical Consultation" 
        buttonLink="/book" 
      />

      <Footer />
    </main>
  );
}
