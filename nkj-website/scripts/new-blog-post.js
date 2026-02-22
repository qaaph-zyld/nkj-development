const fs = require('fs');
const path = require('path');

const title = process.argv[2];

if (!title) {
  console.error('Please provide a title for the blog post.');
  console.log('Usage: node scripts/new-blog-post.js "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const date = new Date().toISOString().split('T')[0];
const filePath = path.join(__dirname, `../src/content/blog/${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: File already exists at ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
date: "${date}"
excerpt: ""
tags: []
author: "Nikola Jelacic"
readingTime: ""
---

Write your content here.
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, template, 'utf8');

console.log(`✅ Created new blog post at: ${filePath}`);
console.log('Don\'t forget to fill in the excerpt and tags in the frontmatter!');
