import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CASE_STUDIES_PATH = path.join(process.cwd(), 'src/content/case-studies');

export type CaseStudyMetadata = {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  date: string;
  coverImage?: string;
};

export type CaseStudy = {
  slug: string;
  metadata: CaseStudyMetadata;
  content: string;
};

export function getCaseStudySlugs() {
  if (!fs.existsSync(CASE_STUDIES_PATH)) return [];
  return fs.readdirSync(CASE_STUDIES_PATH).filter(file => file.endsWith('.mdx'));
}

export function getCaseStudyBySlug(slug: string): CaseStudy {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(CASE_STUDIES_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    metadata: data as CaseStudyMetadata,
    content,
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getCaseStudySlugs();
  const caseStudies = slugs
    .map(slug => getCaseStudyBySlug(slug))
    // sort case studies by date in descending order
    .sort((cs1, cs2) => (cs1.metadata.date > cs2.metadata.date ? -1 : 1));
  return caseStudies;
}
