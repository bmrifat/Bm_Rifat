# BM Rifat — Personal Brand & Venture Platform

> **Positioning:** Building healthcare technology for Bangladesh — Bengali-first, AI-assisted, production-grade.  
> **বাংলা:** বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি গড়ছি — বাংলা-ভিত্তিক, AI-সহায়ক, প্রোডাকশন-মানের।

A high-performance, accessible, bilingual portfolio and venture architecture platform for **BM Rifat** (Founder & CEO of **ShasthoSathi** and **DocClinic**; CSE Student at Daffodil International University; Organising Secretary, DIU CSE Speakers Club).

---

## 🚀 Architectural Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (Strict)
- **Styling:** Tailwind CSS with CSS Variable Tokens (DocClinic Clinical Palette)
- **Internationalization:** `next-intl` (English `/en/...` & Bengali `/bn/...` routing)
- **Content Engine:** In-repo typed data + Zod runtime schemas
- **Form & Contact:** Server Route Handler (`POST /api/contact`) + Cloudflare Turnstile + In-memory rate limiting + Resend email dispatch
- **Accessibility:** WCAG 2.2 AA compliant, skip link, high-contrast tokens, reduced motion support
- **Performance:** Static Generation (SSG) with optimized Next.js font subsets (`Plus Jakarta Sans`, `Inter`, `Hind Siliguri`)

---

## 📁 Repository Architecture

```text
/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Bilingual root layout, font injection, theme provider
│   │   │   ├── page.tsx           # Home page (Hero, Credibility, Featured Ventures, Principles, Writing)
│   │   │   ├── about/             # Story-led biography, timeline, skill matrices
│   │   │   ├── ventures/          # Ventures index & deep case studies ([slug])
│   │   │   ├── leadership/        # DIU CSE Speakers Club & keynote topics
│   │   │   ├── writing/           # Engineering notes & architectural deep-dives ([slug])
│   │   │   ├── contact/           # Interactive contact form & direct reachouts
│   │   │   ├── press/             # Media kit, bio versions, identity standards
│   │   │   ├── resume/            # Web CV + PDF CV download link
│   │   │   ├── now/               # Derek Sivers-inspired "Now" page
│   │   │   └── dev/components/    # Design system component gallery (dev only)
│   │   ├── api/contact/route.ts   # Spam-safe, rate-limited contact API
│   │   ├── sitemap.ts             # Dynamic multilingual sitemap
│   │   ├── robots.ts              # Search engine directives
│   │   └── rss.xml/route.ts       # RSS 2.0 feed
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── providers/             # ThemeProvider (next-themes)
│   │   └── ui/                    # Button, Card, StatusBadge, ArchitectureDiagram, etc.
│   ├── data/                      # Zod-validated data records (profile, ventures, timeline, skills, posts)
│   ├── i18n/                      # next-intl routing and request configuration
│   ├── messages/                  # en.json and bn.json translation catalogs
│   ├── lib/                       # Validators, env parser, rate limiter, json-ld schemas
│   └── styles/                    # Design tokens & Tailwind entrypoints
├── public/                        # Static assets (images, fonts, PDF CV)
├── PLACEHOLDERS.md                # Checklist of items for BM Rifat to confirm/provide
└── .env.example                   # Environment configuration template
```

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js `v20+` or `v22+`
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The site automatically routes to `/en` or `/bn` based on your preference.

---

## 🧪 Testing & Validation

```bash
# Run unit tests
npm run test

# Type checking & linting
npm run lint
npm run build
```

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Set the environment variables defined in `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://bmrifat.com`)
   - `RESEND_API_KEY` (from Resend)
   - `CONTACT_TO_EMAIL`
   - `TURNSTILE_SITE_KEY` & `TURNSTILE_SECRET_KEY` (from Cloudflare)
4. Deploy! Vercel will automatically generate preview branches on pull requests and production deployments on `main`.

---

## 📋 Outstanding Placeholders

Review [`PLACEHOLDERS.md`](./PLACEHOLDERS.md) for the complete checklist of items (headshots, confirmed dates, verified URLs) requiring input from Rifat.
