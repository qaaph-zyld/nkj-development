import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <time dateTime={post.metadata.date} className="text-sm font-medium text-slate-500">
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-sky-500/10 text-sky-400 border-sky-500/20">
                  {post.metadata.tags[0]}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              {post.metadata.title}
            </h1>
          </div>

          <div className="prose prose-invert prose-slate prose-lg max-w-none prose-a:text-sky-400 hover:prose-a:text-sky-300">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 text-center">
            <Link href="/blog" className="text-slate-400 hover:text-slate-200 transition-colors font-medium">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
