import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { getAllCaseStudies } from '@/lib/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nkj-development.com';

  // Core static pages
  const staticPages = [
    '',
    '/about',
    '/book',
    '/contact',
    '/blog',
    '/case-studies',
    '/demo/oee-calculator',
    '/demo/mrp-explorer',
    '/demo/quality-dashboard',
    '/demo/supply-chain-risk',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Blog Posts
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date).toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Case Studies
  const caseStudies = getAllCaseStudies().map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.metadata.date).toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...posts, ...caseStudies];
}
