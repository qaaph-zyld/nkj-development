# NKJ Development — Direction B: Consultancy Lead Generator + Interactive Portfolio

## Complete Project Development Framework

---

## 1. PROJECT DEFINITION

### What NKJ Development Becomes

NKJ Development transforms from a static showcase into a **live, interactive consultancy platform** where manufacturing decision-makers can experience real analytics capabilities firsthand — without signing a contract, without creating an account, without talking to anyone first. The site becomes a lead-generation engine that qualifies itself: anyone who spends 10 minutes playing with your interactive demos and then books a call is already pre-sold.

### The Core Value Proposition

"We don't just show you dashboards — we let you use them. Upload your own data or explore our manufacturing scenarios. See exactly what NKJ Development can build for your operation."

### Success Metrics (6-Month Targets)

| Metric | Current | Target |
|--------|---------|--------|
| Monthly unique visitors | Unknown | 500+ |
| Average session duration | <30s (bounce) | 3+ minutes |
| Demo interactions per visit | 0 | 3+ |
| Consultation bookings/month | 0 | 4-8 |
| Blog posts published | 0 | 12 (2/month) |
| Organic search keywords ranking | 0 | 20+ |

---

## 2. ASSUMPTIONS (ALL DOCUMENTED)

### Technical Assumptions

1. **The existing codebase is Next.js 16 + TypeScript** deployed on Netlify, living in the `nkj-website/` directory of the GitHub repo. All new work extends this; no rewrite.
2. **No backend exists.** All interactivity must be client-side initially (browser-only), with optional backend added in later phases.
3. **Budget is zero for infrastructure.** We stay within Netlify free tier (100GB bandwidth, 300 build minutes), Cal.com free tier, and free analytics (Umami self-hosted or Plausible community).
4. **No internet access from this computer environment.** All code artifacts will be generated locally and you'll push them to your repo manually.
5. **Sample data will be fabricated but realistic.** Based on your actual experience with automotive manufacturing KPIs, QAD ERP structures, and MRP calculations — anonymized and slightly altered.

### Business Assumptions

6. **Target audience is European automotive Tier 1/2 suppliers** — operations managers, IT directors, and plant managers at companies with 50-500 employees who use QAD, SAP, or similar ERPs.
7. **The consultancy model is project-based**, not subscription SaaS — you'd deliver custom analytics systems, ERP integrations, and automation tools as contracted projects.
8. **You're operating solo**, so every feature must be maintainable by one person. Automation isn't optional — it's survival.
9. **NKJ Development Ltd (UK) is dissolved**, so you'll operate either as a sole proprietor (Serbian entity) or re-register when revenue justifies it. The website doesn't need to reference the UK company.
10. **Your competitive advantage is domain expertise**, not technology. Any competent developer can build dashboards — few understand MRP explosion logic, BOM hierarchies, and automotive quality standards.

### Content Assumptions

11. **You can write about QAD/MRP/manufacturing analytics** from direct experience, without violating any NDA from Adient.
12. **Case studies will be "inspired by real scenarios"** — not actual client work, since NKJ Development hasn't had external clients yet.
13. **The existing placeholder metrics (150+ projects, 98.5% satisfaction) will be removed or replaced** with honest messaging about capabilities and expertise.

### Design Assumptions

14. **The existing visual design is kept.** The dark theme, animations, and dashboard aesthetic are already strong. We improve the UX, not the UI.
15. **Brand guidelines exist** in the repo (`brand_guidelines.md`) and will be followed.

---

## 3. CURRENT STATE AUDIT

### What Exists (Keep Everything)

Per your rules — no feature removed unless you specifically ask.

| Section | Current State | Verdict |
|---------|--------------|---------|
| Hero / Landing | Strong visuals, animated counters | KEEP — fix fake metrics |
| Strategic Performance Analytics | 4 KPI cards, all show 0.0% | KEEP — make interactive |
| Core Services Overview | 4 service cards (Analytics, Automotive, Compliance, API) | KEEP — add deep links |
| AI/ML Technology Showcase | TensorFlow.js model cards, prediction engine | KEEP — connect to real sample data |
| Solutions Deep Dive | 8-tab portfolio with production planning details | KEEP — make tabs interactive |
| Advanced Dashboard Preview | D3.js charts (4 types) | KEEP — feed real sample data |
| Automotive KPI Monitoring | 6 categories, 20+ individual KPIs | KEEP — make explorable |
| Production Planning | Order table, production lines, schedule | KEEP — make editable |
| Quality Control Dashboard | Metrics, incidents, inspection results | KEEP — add interaction |
| Supplier Management System | Supplier directory with scores | KEEP — make filterable |
| ISO Compliance Management | 4 standards with scores | KEEP — add interactive audit tool |
| 3D Facility Visualization | Factory layout, workflow animation | KEEP — enhance |
| API Management Platform | Endpoint cards, testing console | KEEP — make console functional |
| GDPR/Privacy/Security | Data subjects, privacy controls, encryption | KEEP — as compliance showcase |
| Footer | Standard links | KEEP — update links |

### What's Missing

1. No way to book a consultation
2. No blog or content section
3. No case studies
4. No "about" or credibility section (who is behind NKJ?)
5. No contact form
6. All data is hardcoded zeros
7. No SEO metadata
8. No analytics tracking
9. No "try it yourself" interaction model
10. No clear call-to-action flow (visitor → engaged → lead → booking)

---

## 4. ARCHITECTURE

### Project Structure (Extending Existing Next.js)

```
nkj-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (existing)
│   ├── page.tsx                  # Landing page (existing, enhanced)
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post
│   ├── case-studies/
│   │   ├── page.tsx              # Case studies listing
│   │   └── [slug]/
│   │       └── page.tsx          # Individual case study
│   ├── demo/
│   │   ├── page.tsx              # Demo hub
│   │   ├── oee-calculator/
│   │   │   └── page.tsx          # Interactive OEE calculator
│   │   ├── mrp-explorer/
│   │   │   └── page.tsx          # MRP simulation
│   │   ├── quality-dashboard/
│   │   │   └── page.tsx          # Quality metrics playground
│   │   └── supply-chain-risk/
│   │       └── page.tsx          # Supplier risk scorer
│   ├── about/
│   │   └── page.tsx              # About NKJ + your background
│   └── book/
│       └── page.tsx              # Cal.com embed
├── components/
│   ├── demos/                    # Interactive demo components
│   │   ├── OEECalculator.tsx
│   │   ├── MRPExplorer.tsx
│   │   ├── QualityDashboard.tsx
│   │   └── SupplyChainScorer.tsx
│   ├── blog/                     # Blog components
│   │   ├── PostCard.tsx
│   │   ├── PostLayout.tsx
│   │   └── TableOfContents.tsx
│   ├── booking/                  # Booking components
│   │   └── CalEmbed.tsx
│   ├── ui/                       # Shared UI components
│   │   ├── CTABanner.tsx
│   │   └── SectionCTA.tsx
│   └── existing/                 # All existing components stay
├── content/
│   ├── blog/                     # MDX blog posts
│   │   ├── mrp-optimization-guide.mdx
│   │   ├── qad-sql-performance.mdx
│   │   └── oee-calculation-mistakes.mdx
│   └── case-studies/             # MDX case studies
│       ├── production-visibility.mdx
│       └── supplier-quality-tracking.mdx
├── data/
│   ├── sample-production.json    # Sample production order data
│   ├── sample-suppliers.json     # Sample supplier performance data
│   ├── sample-quality.json       # Sample quality metrics
│   └── sample-bom.json           # Sample BOM structure
├── lib/
│   ├── calculations/
│   │   ├── oee.ts                # OEE calculation engine
│   │   ├── mrp.ts                # MRP explosion logic
│   │   └── quality.ts            # Quality metric calculators
│   └── mdx.ts                    # MDX processing utilities
└── public/
    ├── og-image.png              # Social sharing image
    └── images/
        └── case-studies/         # Case study imagery
```

### Tech Stack (All Open-Source)

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Next.js 16 (existing) | Already in place, SSG for blog/SEO |
| Language | TypeScript (existing) | Already in place |
| Styling | Whatever exists (likely Tailwind or CSS Modules) | Don't change |
| Charts | D3.js + Recharts (existing references) | Already partially integrated |
| 3D | Three.js / WebGL (existing) | Already in place |
| Blog Engine | MDX (next-mdx-remote or @next/mdx) | Markdown + JSX components in posts |
| Booking | Cal.com (free tier, embed) | Open-source, embeddable, no vendor lock |
| Analytics | Umami (self-hosted) or Plausible CE | Privacy-respecting, open-source |
| SEO | next-seo or built-in Next.js metadata | Static generation = perfect SEO |
| Deployment | Netlify (existing) | Free tier, already configured |
| CI/CD | GitHub Actions | Automated build/deploy on push |
| Content | MDX files in repo | No CMS needed, version-controlled |

---

## 5. PHASED IMPLEMENTATION PLAN

### PHASE 1: Foundation & Credibility (Weeks 1-2)
**Goal:** Make the site honest, trustworthy, and bookable.

#### 1.1 Fix Credibility Issues
- Replace "150+ Projects Delivered" with "10+ Years Manufacturing Analytics Experience"
- Replace "98.5% Client Satisfaction" with "Automotive Tier 1/2 Specialist"
- Replace "24/7 Technical Support" with "QAD · SAP · SQL Server Expert"
- Add a real "About NKJ" section: your background, your expertise areas, your approach

#### 1.2 Add Booking System (Cal.com)
- Create Cal.com account (free tier: unlimited bookings, 1 event type)
- Set up event type: "30-Minute Discovery Call" with intake questions:
  - What ERP system do you use?
  - What's your biggest data/analytics pain point?
  - Company size (employees)?
  - Which area interests you most? (Production/Quality/Supply Chain/Other)
- Embed Cal.com widget on `/book` page
- Add "Schedule Consultation" CTAs throughout the site (header, hero, after each demo section, footer)

#### 1.3 Add Contact Form
- Simple form: Name, Email, Company, Message
- Sends to your email via Netlify Forms (free, zero backend)
- Honeypot field for spam protection

#### 1.4 SEO Foundation
- Add proper `<meta>` tags, Open Graph, Twitter cards to all pages
- Create `sitemap.xml` and `robots.txt`
- Add structured data (JSON-LD) for Organization, WebSite, and Service schemas
- Set proper page titles: "NKJ Development | Manufacturing Analytics & ERP Consulting"

#### 1.5 Analytics Setup
- Deploy Umami analytics (self-hosted on Railway free tier or Vercel)
- Or use Plausible Community Edition
- Track: page views, demo interactions, CTA clicks, booking conversions

---

### PHASE 2: Interactive Demos (Weeks 3-5)
**Goal:** Make the showcase come alive. Let visitors touch the data.

#### 2.1 Sample Data Engine
Create realistic, anonymized manufacturing datasets:

**Production Orders Dataset** (`sample-production.json`):
- 50 production orders with realistic part numbers, quantities, statuses
- Based on patterns from automotive manufacturing (engine blocks, brake assemblies, suspension components — already in your site)
- Time series data spanning 6 months

**Supplier Performance Dataset** (`sample-suppliers.json`):
- 15 suppliers with delivery scores, quality ratings, risk levels
- Monthly performance history (12 months)
- Certification records (ISO 9001, IATF 16949, etc.)

**Quality Metrics Dataset** (`sample-quality.json`):
- Daily defect rates, first-pass yield, inspection coverage
- Linked to production orders and supplier batches
- Pareto analysis data (top defect categories)

**BOM Structure Dataset** (`sample-bom.json`):
- 3-level BOM hierarchy for a representative automotive assembly
- Part numbers, quantities per, lead times, costs
- Used for the MRP demo

#### 2.2 Interactive Demo: OEE Calculator (`/demo/oee-calculator`)
**What the visitor experiences:**
- A clean interface with three input sliders: Availability (%), Performance (%), Quality (%)
- Real-time OEE calculation with visual gauge
- Comparison against industry benchmarks (World Class = 85%, Typical = 60%, Your Input = X%)
- Toggle to "Load Sample Data" which populates with the production dataset and calculates OEE from actual downtime, cycle time, and defect records
- "What if" scenarios: "What happens if you reduce unplanned downtime by 10%?"
- **CTA at bottom:** "Want to see this connected to your real production data? Book a call."

#### 2.3 Interactive Demo: MRP Explorer (`/demo/mrp-explorer`)
**What the visitor experiences:**
- Visual BOM tree (expandable/collapsible) loaded from `sample-bom.json`
- Enter a demand quantity for the top-level assembly
- Watch the MRP explosion cascade through the tree in real-time
- See gross requirements, on-hand inventory, net requirements, planned orders at each level
- Lead time offset visualization (Gantt-style)
- Toggle between lot-for-lot, fixed quantity, and EOQ lot sizing
- **CTA:** "Your MRP runs take hours? Let's fix that."

#### 2.4 Interactive Demo: Quality Dashboard (`/demo/quality-dashboard`)
**What the visitor experiences:**
- Pre-loaded with `sample-quality.json`
- Interactive charts: defect Pareto, SPC control charts, trend lines
- Click on a defect category → drill down to affected parts, suppliers, production lines
- Filter by date range, production line, product family
- Anomaly detection highlights (simple standard deviation based)
- **CTA:** "Imagine this connected to your QAD quality module."

#### 2.5 Interactive Demo: Supply Chain Risk Scorer (`/demo/supply-chain-risk`)
**What the visitor experiences:**
- Supplier cards from `sample-suppliers.json` with interactive scoring
- Adjust weighting: How much do you value delivery vs. quality vs. cost vs. certification?
- Watch supplier rankings re-sort in real-time based on your priorities
- Risk heatmap: geography × certification × performance
- "Upload your own supplier data" (CSV upload, client-side parsing with Papa Parse)
- **CTA:** "Stop managing supplier risk in spreadsheets."

#### 2.6 Wire Demos into Existing Sections
- The existing "Advanced Dashboard Preview" section → shows live charts from sample data instead of zeros
- The existing "Automotive KPI Monitoring" section → displays calculated KPIs from sample data
- The existing "Production Planning" table → becomes sortable/filterable with sample data
- The existing "Quality Control Dashboard" → shows real metrics from sample data
- The existing "Supplier Management System" → populated and interactive

---

### PHASE 3: Content Engine (Weeks 5-8)
**Goal:** Build SEO authority and demonstrate thought leadership.

#### 3.1 Blog Infrastructure
- Set up MDX processing in Next.js (content/blog/ directory)
- Blog listing page with post cards, tags, reading time
- Individual post pages with table of contents, syntax highlighting (for SQL/Python code)
- RSS feed generation
- Social sharing buttons (open-source: no tracking)

#### 3.2 Initial Blog Posts (Publish 2/month)

**Post 1: "The 5 Most Common OEE Calculation Mistakes in Automotive Manufacturing"**
- Target keywords: OEE calculation, manufacturing OEE, automotive OEE
- Includes interactive OEE calculator embedded in the post
- ~1500 words, practical, based on your real experience

**Post 2: "Why Your MRP Run Takes 4 Hours (And How to Fix It)"**
- Target keywords: MRP performance, QAD MRP optimization, slow MRP
- SQL optimization tips from your actual work
- Before/after query performance examples

**Post 3: "Building a Supplier Scorecard That Actually Works"**
- Target keywords: supplier scorecard automotive, supplier performance metrics
- Links to the interactive Supply Chain Risk Scorer demo
- Weighted scoring methodology

**Post 4: "QAD ERP: A Data Analyst's Survival Guide"**
- Target keywords: QAD ERP tips, QAD SQL queries, QAD reporting
- This becomes a cornerstone/pillar page — long-form, comprehensive
- Links out to other posts and demos

**Post 5: "Real-Time Production Dashboards Without a $500K Software License"**
- Target keywords: manufacturing dashboard open source, production monitoring
- Shows your approach: SQL + Python + open-source visualization
- Links to the demo hub

**Post 6: "IATF 16949 Compliance Tracking: From Spreadsheet Hell to Automated Dashboards"**
- Target keywords: IATF 16949 compliance, automotive quality management system
- Addresses a real pain point for your target audience

#### 3.3 Case Studies Section

**Case Study 1: "From Blind to Real-Time: Production Visibility for a Mid-Size Automotive Supplier"**
- Scenario: 200-employee brake component manufacturer, QAD ERP, no production dashboards
- Challenge: Plant manager making decisions on yesterday's data
- Solution: SQL-based data extraction → Python ETL → web dashboard
- Results: OEE improved from 62% to 78%, unplanned downtime reduced 35%
- Technical details: architecture diagram, sample queries (anonymized)
- **Note on page:** "This case study is based on a composite scenario drawn from real manufacturing environments. Specific details have been modified."

**Case Study 2: "Supplier Quality Crisis: Building an Early Warning System"**
- Scenario: 400-employee suspension parts manufacturer receiving increasing defects
- Challenge: Quality issues discovered only at incoming inspection
- Solution: Supplier scorecard system with automated alerts
- Results: Supplier defect rate dropped from 3.2% to 0.8%

#### 3.4 Content Calendar Automation
- GitHub Issues template for blog post planning
- MDX frontmatter with publish date, tags, description, og:image
- Automated sitemap regeneration on each deploy

---

### PHASE 4: Conversion Optimization (Weeks 8-10)
**Goal:** Turn visitors into leads, leads into bookings.

#### 4.1 CTA Strategy
Every major section gets a contextual call-to-action:

| After Section | CTA Text | Links To |
|--------------|----------|----------|
| Hero | "Explore Solutions" / "Schedule Consultation" | #demos / /book |
| KPI Dashboard | "See this with your data → Book a demo" | /book |
| OEE Calculator | "Want this connected to your ERP?" | /book |
| MRP Explorer | "Your MRP runs should be this fast" | /book |
| Quality Dashboard | "Stop discovering defects after the fact" | /book |
| Supply Chain Scorer | "Try it with your own supplier data" | CSV upload + /book |
| Each Blog Post | "Need help implementing this?" | /book |
| Each Case Study | "Ready for similar results?" | /book |

#### 4.2 Lead Magnet
Create a downloadable resource (gated behind email):
- **"The Manufacturing Analytics Readiness Checklist"** — a PDF checklist that helps ops managers assess their analytics maturity
- Simple email collection via Netlify Forms
- Automated email delivery via a simple serverless function or external tool (Buttondown for email, open-source)

#### 4.3 Social Proof (Honest)
- "10+ years in automotive manufacturing data systems"
- "Specialist in QAD ERP, SQL Server, Python automation"
- Technologies section with real tool logos
- Your LinkedIn profile link
- GitHub profile link (shows real code)

#### 4.4 Exit Intent / Scroll-Based CTAs
- After scrolling 60% of any demo page → subtle floating CTA: "Impressed? Let's talk."
- Non-intrusive, dismissable, respects user preference (stores dismissal in sessionStorage)

---

### PHASE 5: Automation & Maintenance (Weeks 10-12)
**Goal:** Set up systems so the site runs itself with minimal ongoing effort.

#### 5.1 GitHub Actions CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: nkj-website/package-lock.json
      - run: cd nkj-website && npm ci
      - run: cd nkj-website && npm run build
      - run: cd nkj-website && npm run lint
      # Netlify deploys automatically via Git integration
```

#### 5.2 Automated Checks
- Lighthouse CI on every PR (performance, accessibility, SEO scores)
- Link checker (no broken links)
- MDX validation (no frontmatter errors)

#### 5.3 Content Workflow
1. Write blog post as `.mdx` file locally
2. Commit to a branch
3. CI builds and validates
4. Merge to main → auto-deploys to Netlify
5. Sitemap regenerates
6. RSS feed updates

#### 5.4 Monthly Maintenance Checklist (Automated Reminders)
- [ ] Publish 2 blog posts
- [ ] Review analytics (which demos get most engagement?)
- [ ] Check booking conversion rate
- [ ] Update sample data if needed
- [ ] Respond to any contact form submissions
- [ ] Share latest blog post on LinkedIn

---

## 6. WHAT NOT TO BUILD (YET)

These are tempting but premature for Direction B:

| Feature | Why Skip It Now |
|---------|----------------|
| User authentication / accounts | No need until SaaS (Direction A) |
| Real database backend | Sample JSON is sufficient for demos |
| Payment processing | Consultancy invoicing happens offline |
| Multi-language (i18n) | English-only initially, add Serbian later if needed |
| Real API endpoints | The API management section stays as a showcase |
| TensorFlow.js real models | The AI section stays aspirational; demos use simple math |
| Real-time WebSocket data | Static sample data refreshed client-side is enough |
| CMS (Strapi, Ghost, etc.) | MDX in the repo is simpler for a solo developer |
| Email marketing automation | Buttondown free tier + manual is enough to start |

---

## 7. REVENUE MODEL

### Phase B Revenue (Consultancy)

| Service | Typical Project Size | Delivery Time |
|---------|---------------------|---------------|
| Manufacturing Dashboard Build | €5,000 - €15,000 | 2-6 weeks |
| ERP Data Integration (QAD/SAP) | €8,000 - €20,000 | 4-8 weeks |
| MRP Optimization & SQL Tuning | €3,000 - €8,000 | 1-3 weeks |
| Automated Reporting System | €4,000 - €12,000 | 2-5 weeks |
| Ongoing Analytics Support | €1,500 - €3,000/month | Retainer |

### Pricing Strategy
- Don't put prices on the website (project scoping determines price)
- The booking intake form qualifies leads (company size, ERP system, pain point)
- 30-minute free discovery call → scoped proposal within 48 hours

---

## 8. RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| No traffic after launch | High | High | SEO blog content + LinkedIn sharing |
| Wrong target audience arrives | Medium | Medium | Clear automotive focus in all copy |
| Demos feel "fake" | Medium | High | Use realistic data, document that it's sample data |
| Time commitment too high | High | Medium | Phase strictly, blog is the only ongoing commitment |
| Prospects want SaaS, not consulting | Low | Low | Note: "Custom solutions, not off-the-shelf" |
| Cal.com free tier limits hit | Low | Low | Upgrade to $12/month if booking volume justifies |
| Netlify free tier bandwidth exceeded | Low | Low | Upgrade or move to Cloudflare Pages (also free) |

---

## 9. IMMEDIATE NEXT STEPS

Here's what we build first, in order:

| Step | Task | Deliverable |
|------|------|-------------|
| 1 | Fix hero metrics with honest claims | Updated `page.tsx` hero section |
| 2 | Create "About NKJ" section | New `/about` page component |
| 3 | Set up Cal.com and embed booking | New `/book` page + CalEmbed component |
| 4 | Create sample manufacturing datasets | 4 JSON files in `/data` |
| 5 | Build OEE Calculator demo (flagship) | `/demo/oee-calculator` page |
| 6 | Wire sample data into existing dashboards | Updated dashboard components |
| 7 | Set up MDX blog infrastructure | Blog routing + layout components |
| 8 | Write first blog post | `mrp-optimization-guide.mdx` |
| 9 | Create first case study | `production-visibility.mdx` |
| 10 | Add CTAs throughout existing sections | CTA components placed contextually |
| 11 | SEO metadata on all pages | Meta tags, sitemap, structured data |
| 12 | GitHub Actions CI/CD | `.github/workflows/deploy.yml` |

---

## 10. DEFINITION OF DONE

Direction B is "complete" when:

- [ ] All existing dashboard sections display sample data (no more 0.0%)
- [ ] 4 interactive demos are live and functional
- [ ] Cal.com booking is embedded and working
- [ ] Contact form submits and delivers emails
- [ ] Blog has 6+ published posts
- [ ] 2+ case studies are published
- [ ] SEO metadata on every page
- [ ] Analytics tracking is active
- [ ] CI/CD pipeline runs on every push
- [ ] Site loads in <3 seconds on mobile (Lighthouse Performance >80)
- [ ] At least 1 consultation has been booked through the site

At that point, you have a functioning lead-generation engine, and we evaluate whether to proceed to Direction A (SaaS) based on the quality and volume of inbound leads.
