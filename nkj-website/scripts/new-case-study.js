const fs = require('fs');
const path = require('path');

const title = process.argv[2];

if (!title) {
  console.error('Please provide a title for the case study.');
  console.log('Usage: node scripts/new-case-study.js "Case Study Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const date = new Date().toISOString().split('T')[0];
const filePath = path.join(__dirname, `../src/content/case-studies/${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: File already exists at ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
client: "Anonymized Client Name"
industry: "Automotive Tier 2"
challenge: "Describe the specific operational or data bottleneck here."
solution: "Describe the custom data pipeline or dashboard built to solve it."
results: [
  "Result metric 1 (e.g. OEE improved by 15%)",
  "Result metric 2",
  "Result metric 3"
]
date: "${date}"
---

*Note: This case study is based on a composite scenario drawn from real manufacturing environments. Specific details have been modified to protect client confidentiality.*

## The Challenge

Describe the problem in detail here.

## The NKJ Development Approach

Describe the technical solution here.

### Step 1: Data Extraction

How did you get the data out of the ERP?

### Step 2: Transformation & Visualization

How was it processed and displayed?

## The Results

What was the business impact?

---

*Are you struggling with a similar challenge? [Schedule a free discovery call](/book) to discuss how we can build a custom solution for your plant.*
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, template, 'utf8');

console.log(`✅ Created new case study at: ${filePath}`);
console.log('Don\'t forget to fill in the client, industry, challenge, solution, and results array in the frontmatter!');
