# NKJ Development — Manufacturing Analytics Consultancy

This repository contains the marketing website and interactive portfolio for NKJ Development, a specialized consultancy focused on automotive manufacturing analytics, legacy ERP integration (QAD), and production data pipelines.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Data Visualization:** D3.js (custom charts), Three.js (3D facility models)
- **Content:** MDX (for Blog & Case Studies)
- **Analytics:** Umami (Privacy-respecting, self-hosted)
- **Deployment:** Netlify
- **CI/CD:** GitHub Actions (Build, Lint, Lighthouse CI, Link Checker)

## 💻 Running Locally

1. **Install dependencies:**
   ```bash
   cd nkj-website
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Managing Content

The site uses a file-based CMS powered by MDX for technical blog posts and case studies.

### Creating a new Blog Post
Run the generator script from the `nkj-website` directory:
```bash
node scripts/new-blog-post.js "My Awesome Post"
```
This creates a new `.mdx` file in `src/content/blog/` with the correct frontmatter template.

### Creating a new Case Study
Run the generator script from the `nkj-website` directory:
```bash
node scripts/new-case-study.js "How We Improved OEE by 20%"
```
This creates a new `.mdx` file in `src/content/case-studies/` with the correct frontmatter template.

*Note: All MDX files are strictly validated during the CI build process. If required frontmatter is missing, the build will fail.*

## ⚙️ Environment Variables

For local development and production deployment, configure the following environment variables:

- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`: Your Umami tracking ID
- `NEXT_PUBLIC_UMAMI_URL`: URL to your Umami script (e.g., `https://your-analytics.com/script.js`)

*(If these are not set, the analytics component will silently bypass loading the script.)*

## 🔄 CI/CD & Deployment

This project uses **GitHub Actions** for continuous integration:
- **CI Pipeline (`deploy.yml`):** Runs on every PR and push to `main`. Validates MDX frontmatter, runs the linter, checks TypeScript types, and executes a test build.
- **Lighthouse CI (`lighthouse.yml`):** Runs on PRs to assert performance, accessibility, best practices, and SEO scores.
- **Link Checker (`links.yml`):** Runs weekly and on push to ensure no broken internal or external links exist in the content.

**Deployment is handled automatically by Netlify** upon merging to the `main` branch.
