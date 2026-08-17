# Atharva Rajoba Analyst Portfolio

Recruiter-focused portfolio positioning Atharva Rajoba as a Business Analyst with Product and Data Analyst capabilities. The site presents verified experience, decision-led case studies, research, education, certifications, and direct contact details.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Project Structure

```text
.
|-- marketing_campaign_analysis/   Reproducible analytics project
|-- public/                         Resume and optimized visual assets
|-- src/
|   |-- app/
|   |   |-- projects/[slug]/        Static case-study routes
|   |   |-- globals.css             Visual system and responsive styles
|   |   |-- layout.tsx              SEO metadata and root layout
|   |   `-- page.tsx                Portfolio entry page
|   |-- components/
|   |   |-- portfolio.tsx           Main interactive portfolio
|   |   `-- project-case-study.tsx  Reusable project narrative
|   `-- lib/
|       `-- portfolio-data.ts        Central content source
|-- package.json
`-- next.config.ts
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the latest `main` branch to GitHub.
2. Sign in to [Vercel](https://vercel.com) with GitHub.
3. Select **Add New Project** and import `atharva1845/atharva-analyst-portfolio`.
4. Keep the detected Next.js defaults and select **Deploy**.

Vercel installs dependencies, builds the App Router project, and publishes future pushes to `main` automatically.
