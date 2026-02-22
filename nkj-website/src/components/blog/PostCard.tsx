import Link from 'next/link';
import { Post } from '@/lib/mdx';

export default function PostCard({ post }: { post: Post }) {
  const { title, excerpt, date, tags } = post.metadata;

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-colors flex flex-col h-full group">
      <Link href={`/blog/${post.slug}`} className="p-8 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <time dateTime={date} className="text-sm font-medium text-slate-500">
            {new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          {tags && tags.length > 0 && (
            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              {tags[0]}
            </span>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
          {title}
        </h2>
        
        <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex items-center text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors mt-auto">
          Read Article <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </article>
  );
}
