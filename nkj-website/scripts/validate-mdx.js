const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const CASE_STUDIES_DIR = path.join(__dirname, '../src/content/case-studies');

const REQUIRED_BLOG_FIELDS = ['title', 'date', 'excerpt', 'tags'];
const REQUIRED_CASE_STUDY_FIELDS = ['title', 'client', 'industry', 'challenge', 'solution', 'results', 'date'];

let hasErrors = false;

function validateDirectory(directory, requiredFields, type) {
  if (!fs.existsSync(directory)) {
    console.warn(`Warning: Directory ${directory} does not exist. Skipping validation.`);
    return;
  }

  const files = fs.readdirSync(directory).filter(file => file.endsWith('.mdx'));
  
  if (files.length === 0) {
    console.log(`No ${type} files found to validate.`);
    return;
  }

  console.log(`\nValidating ${files.length} ${type} files...`);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { data } = matter(content);
      const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null || data[field] === '');

      if (missingFields.length > 0) {
        console.error(`❌ Error in ${file}: Missing required frontmatter fields: ${missingFields.join(', ')}`);
        hasErrors = true;
      } else {
        console.log(`✅ ${file} is valid.`);
      }
    } catch (e) {
      console.error(`❌ Error parsing ${file}: ${e.message}`);
      hasErrors = true;
    }
  });
}

// Run validations
validateDirectory(BLOG_DIR, REQUIRED_BLOG_FIELDS, 'Blog Post');
validateDirectory(CASE_STUDIES_DIR, REQUIRED_CASE_STUDY_FIELDS, 'Case Study');

if (hasErrors) {
  console.error('\n❌ Validation failed. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ All MDX files passed validation.');
  process.exit(0);
}
