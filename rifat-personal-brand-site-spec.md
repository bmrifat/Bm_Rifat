# Personal Brand Website — Architecture & Design Spec

> **For Claude Code.** Read this whole file, then build the site in the phases at the end. Target: a production-ready site, 80–90% complete. Ask before inventing facts: anything marked `[CONFIRM]` or `[PROVIDE]` must be a clearly visible placeholder in code (`TODO_...`), never a made-up claim or number.

---

## 0. Brief

**Owner:** BM Rifat `[CONFIRM full display name]` — Bangladeshi software engineer and entrepreneur; Founder & CEO of **ShasthoSathi (স্বাস্থ্য সাথী)** and **DocClinic**; CSE student (Daffodil International University); Organising Secretary, DIU CSE Speakers Club; marketing/business experience (Nationalian, Softstation).

**Positioning (one line):**
EN: *"Building healthcare technology for Bangladesh — Bengali-first, AI-assisted, production-grade."*
BN: *"বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি গড়ছি — বাংলা-ভিত্তিক, AI-সহায়ক, প্রোডাকশন-মানের।"*

**Goals of the site**
1. Credibility: investors, hospitals, clinics, recruiters, and partners understand in 30 seconds who he is and what he has built.
2. Conversion: visitors reach a clear CTA (partner / book a demo / hire / invite to speak).
3. Authority: case studies and writing show senior-engineer thinking (architecture, security, trade-offs), not just screenshots.
4. Ownership: one long-term home for all ventures, links, press and speaking.

**Audiences (priority order):** (1) healthcare partners & clinics/doctors in BD, (2) investors/accelerators/mentors, (3) recruiters & tech companies (incl. international), (4) students/community & event organisers, (5) press.

**Non-goals:** no CMS-driven admin panel in v1, no e-commerce, no user accounts, no patient data of any kind.

---

## 1. Architectural decisions (and why)

| Decision | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript (strict)** | Matches his other projects; great SEO, image/OG tooling, static-first |
| Styling | **Tailwind CSS + CSS variables (design tokens)** | Consistent with DocClinic design system; easy light/dark |
| Content | **MDX + typed data files (Zod-validated), in-repo** | A portfolio does **not** need MySQL. Fewer moving parts = faster, cheaper, more secure. Add a DB only if a real need appears (e.g. guestbook, CMS) |
| Rendering | **Static (SSG) by default**, ISR for GitHub/stat widgets; only the contact API is dynamic | Best performance and security |
| i18n | **`next-intl`**, locales `en` (default) and `bn`, routes `/en/...`, `/bn/...` | Bengali-first audience; BN must be a real translation, not a toggle on a few strings |
| Contact | Route Handler `POST /api/contact` → **Resend** (email) + **Cloudflare Turnstile** + Zod + rate limit (Upstash Redis or in-memory fallback) | Spam-safe, no DB needed |
| Analytics | **Plausible or Umami** (privacy-friendly, cookie-less) | No cookie banner needed |
| Hosting | **Vercel** (or Cloudflare Pages) + custom domain + SSL | Zero-ops, preview deploys |
| Animation | **Framer Motion**, subtle, honours `prefers-reduced-motion` | Polish without hurting performance |
| Icons / OG | `lucide-react`; dynamic OG images via `next/og` | |
| Testing | **Vitest** (unit), **Playwright** (e2e + a11y via axe) | |
| CI | GitHub Actions: typecheck, lint, test, build, Lighthouse CI | |

**Quality bars (must pass in CI):** Lighthouse ≥ 95 (Perf/A11y/SEO/Best Practices) on mobile; LCP < 2.5 s; CLS < 0.05; WCAG 2.2 AA; zero console errors; all pages valid in both locales.

---

## 2. Sitemap & information architecture

```
/                       Home
/about                  About
/ventures               Ventures index
  /ventures/shasthosathi   Case study
  /ventures/docclinic      Case study
  /ventures/nationalian    Short profile
  /ventures/softstation    Short profile
/work                   Selected engineering work (open-source, repos, labs worth showing)
/writing                Articles (MDX)         [v1: optional, ship with 2–3 posts]
  /writing/[slug]
/leadership             Community, DIU CSE Speakers Club, events, speaking
/now                    What I'm working on now (updated manually)
/contact                Work with me / contact form
/press                  Press kit: bios (short/long), headshots, logos, brand facts
/resume                 Web CV + downloadable PDF
/sitemap.xml /robots.txt /rss.xml
404, error pages (bilingual)
```

**Primary nav:** Ventures · About · Writing · Leadership · Contact (CTA button: **Let's talk**). Footer: socials, email, press kit, language switch, theme switch, © line.

---

## 3. Page specs

### 3.1 Home
Sections in order:
1. **Hero** — name, role line, positioning line, 2 CTAs (*View ventures* / *Contact me*), portrait `[PROVIDE]`, small "Founder & CEO — ShasthoSathi · DocClinic" chip row with logos.
2. **Credibility strip** — 3–4 *verified* facts only (e.g. "Bengali-first health AI", "Multi-tenant clinic SaaS", "Built end-to-end: product → code → deploy"). Numeric metrics (users, clinics, reports analysed) → `[PROVIDE]`; if absent, omit the numbers, don't invent.
3. **Featured ventures** — two large cards (ShasthoSathi, DocClinic) with one-line problem, 3 capability bullets, status badge (Live / In development), link to case study.
4. **How I build** — 4 principle cards: *Bengali-first UX · Security & privacy by default · Production-grade engineering · Honest scope* (short, concrete, no buzzwords).
5. **Leadership & community** — Speakers Club role, events, 2–3 highlights.
6. **Latest writing** — 3 cards (hidden if no posts).
7. **Closing CTA** — "Building something in healthcare or education tech in Bangladesh? Let's talk."

### 3.2 About
Story-led: why healthcare tech in Bangladesh (access, language barrier, doctor workload) `[PROVIDE personal motivation, 3–5 sentences]`; timeline (student → builder → founder); skills grouped (Product & architecture, Full-stack web, AI integration, Security, Leadership & communication, Marketing/Business); values; photo gallery (3 images max) `[PROVIDE]`.

### 3.3 Venture case-study template (reuse for ShasthoSathi and DocClinic)
`Hero (name, one-liner, status badge, links) → Problem → Who it's for → Solution & key features → Product screens (demo data only) → Architecture diagram → Tech stack → Security & privacy → What I'd do next (roadmap) → Lessons / trade-offs → CTA`

**ShasthoSathi (স্বাস্থ্য সাথী)** — Bengali-language health platform for patients.
- *Live (verify before publishing `[CONFIRM]`):* AI lab-report / prescription / image analysis with structured results, Bengali audio (TTS) of results, symptom checker with duration & clinical-concordance logic, emergency hub (ambulance, pharmacy, therapists, blood donors, national hotlines), demo clinical-cases gallery, dark mode.
- *Roadmap (label clearly as "Planned"):* Women's Corner, Better Me (mental wellness with crisis-safe design), diagnostic test price range + nearby centres, telemedicine bridge, offline PWA, family health records, pill reminders.
- *Stack:* Next.js, React, TypeScript, Tailwind, Prisma, NextAuth, Zod, Cloudflare R2, Google Gemini multi-model fallback cascade, Edge TTS.
- *Engineering highlights worth showing:* model fallback cascade with timeouts and health tracking; AI never gives drug doses in sensitive modules; crisis detection that bypasses quotas; admin-curated test prices instead of AI-generated (trust over novelty).

**DocClinic (Doctor Management System)** — multi-tenant SaaS for doctors and clinics in Bangladesh.
- *Status labels must match reality `[CONFIRM before publishing]`:* Prescription Desk, AI prescription OCR, AI lab-report OCR, patient queue & EHR history, RBAC with Doctor & Receptionist roles, medical AI chat — built. Billing/subscriptions and telemedicine — *in progress*, not "production ready". Clinic Admin / Super Admin / Patient roles, mobile apps, SMS/WhatsApp reminders, HL7/FHIR — *roadmap*.
- *Stack:* Next.js, TypeScript, Tailwind (clinical tokens), React Query, React Hook Form, Zod, Node/Express (strangler-fig migration), MySQL with tenant-scoped query guards, JWT httpOnly cookies, Helmet, DOMPurify, Gemini Flash.
- *Highlights:* server-side role enforcement, tenant isolation guardrails, concurrency-safe serial assignment, hybrid serial + estimated-time scheduling, security patching discipline.
- **Privacy rule:** screenshots use synthetic data only. Never show real patient/doctor information.

**Nationalian** and **Softstation** — short profile pages: what it is, his role `[CONFIRM exact titles]`, what he did (marketing strategy, community building, sales messaging; school/college/madrasa website services), outcome `[PROVIDE]`. No prices or internal numbers unless he approves.

### 3.4 Leadership
DIU CSE Speakers Club — role, what the club does, events organised `[PROVIDE list]`, skills shown (public speaking, anchoring, debate, event management). Speaking topics + "Invite me to speak" CTA.

### 3.5 Contact
Intent selector (Partnership · Demo of ShasthoSathi/DocClinic · Hiring/Collab · Speaking · Other) → form (name, email, org optional, message) → Turnstile → success state. Also direct email, LinkedIn, GitHub `bmrifat`, WhatsApp `[PROVIDE]`, response-time note.

### 3.6 Press / Resume / Now
Press: short bio (50 words), long bio (150 words), headshots, logos, fact sheet. Resume: HTML + `/rifat-cv.pdf` `[PROVIDE]`. Now: 3–5 bullet "currently" list with a "last updated" date.

---

## 4. Design system

**Personality:** trustworthy, calm, modern, human. Healthcare-grade clarity with a founder's confidence. Not flashy, not template-looking.

**Colour tokens** (reuse the DocClinic palette for brand consistency):

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f8fafc` | `#070d1a` |
| `--surface` | `#ffffff` | `#0c1427` |
| `--elevated` | `#f1f5f9` | `#111c38` |
| `--text` | `#0c1427` | `#e6edf7` |
| `--muted` | `#475569` | `#94a3b8` |
| `--border` | `#e2e8f0` | `#1e2a4a` |
| `--primary` | `#0284c7` | `#38bdf8` |
| `--primary-fg` | `#ffffff` | `#070d1a` |
| `--success` (status "Live") | `#059669` | `#34d399` |
| `--warning` ("In development") | `#d97706` | `#fbbf24` |

Contrast ≥ 4.5:1 for body text in both themes. Default theme follows system; user toggle persists.

**Typography** (via `next/font`, subset properly):
- Display/headings: **Plus Jakarta Sans** (or Geist) — 600/700
- Body Latin: **Inter**
- Bengali: **Hind Siliguri** or **Noto Sans Bengali** — set a slightly larger line-height (1.7) and size for Bengali text
- Scale: 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 (clamp for hero)
- Never mix fake-italic Bengali; no all-caps Bengali.

**Layout:** 12-col grid, container max 1120 px, 24 px mobile gutter, section spacing 96 px desktop / 64 px mobile, radius 16 px cards / 999 px pills, soft border + very light shadow, generous whitespace.

**Components to build** (`/components/ui`, accessible, keyboard-friendly): Button (primary/secondary/ghost), Badge/StatusPill, Card (venture, writing, principle), Navbar (sticky, blur, mobile sheet), LanguageSwitch, ThemeToggle, Section/Container, Timeline, SkillGroup, ArchitectureDiagram (inline SVG or Mermaid → SVG at build), Screenshot frame, CTA banner, ContactForm, Toast, Footer, Prose (MDX typography), Breadcrumbs.

**Motion:** fade-up on scroll (≤ 8 px, 300–400 ms), hover lift on cards, no parallax, no autoplay video; everything disabled under `prefers-reduced-motion`.

**Imagery:** one professional portrait; venture logos; screenshots in device frames with synthetic data; architecture diagrams as clean SVG using the token colours. Optimise with `next/image` (AVIF/WebP), explicit sizes.

**Home hero wireframe**
```
┌──────────────────────────────────────────────────────────┐
│ [Logo]   Ventures  About  Writing  Leadership   [Let's talk]  ☾ EN|বাং │
├──────────────────────────────────────────────────────────┤
│  Founder & CEO · ShasthoSathi · DocClinic                │
│  Building healthcare                       ┌───────────┐ │
│  technology for Bangladesh.                │  portrait │ │
│  Bengali-first, AI-assisted,               │           │ │
│  production-grade.                         └───────────┘ │
│  [View ventures]  [Contact me]                           │
├──────────────────────────────────────────────────────────┤
│  ✓ Bengali-first   ✓ Multi-tenant SaaS   ✓ End-to-end    │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Technical architecture

### 5.1 Folder structure
```
/src
  /app/[locale]/(site)/{page.tsx, about, ventures, work, writing, leadership, now, contact, press, resume}
  /app/api/contact/route.ts
  /app/{sitemap.ts, robots.ts, rss.xml/route.ts, opengraph-image.tsx}
  /components/{ui, sections, layout, mdx}
  /content/{en,bn}/{ventures/*.mdx, writing/*.mdx, pages/*.json}
  /data/{profile.ts, ventures.ts, timeline.ts, socials.ts, skills.ts}   // typed + Zod-validated at build
  /lib/{seo.ts, jsonld.ts, mdx.ts, rate-limit.ts, env.ts, validators.ts}
  /i18n/{routing.ts, request.ts}  /messages/{en.json, bn.json}
  /styles/{globals.css, tokens.css}
/tests/{unit, e2e}
/public/{images, fonts?, rifat-cv.pdf, press/}
```

### 5.2 Content model (Zod)
`Venture {slug, name{en,bn}, tagline, status: live|building|planned|archived, role, links[], stack[], highlights[], roadmap[], screenshots[]}`
`Post {slug, title, date, summary, tags[], locale, readingTime}`
`TimelineItem {date, title, org, description}`
Build fails if any required field is missing in either locale — keeps EN/BN in sync.

### 5.3 SEO & discoverability
- Per-page metadata, canonical, `hreflang` for en/bn, OG/Twitter images (dynamic).
- **JSON-LD:** `Person` (home/about), `Organization` (ventures), `Article` (posts), `BreadcrumbList`.
- Sitemap, robots, RSS. Clean URLs. Semantic HTML (`main`, `nav`, headings in order).
- Target keywords: "BM Rifat", "ShasthoSathi", "DocClinic", "healthcare software Bangladesh", "Bangladeshi software engineer founder".

### 5.4 Security & privacy
- Strict **CSP**, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS (via `next.config` headers).
- Contact route: Zod validation, honeypot + Turnstile, rate limit per IP, input length caps, HTML-escaped email body, no PII logged.
- Secrets only in env vars, validated at boot by `lib/env.ts`; `.env.example` committed.
- No third-party trackers beyond cookie-less analytics. Add a short privacy page.
- Medical disclaimer on venture pages: ShasthoSathi/DocClinic are not a substitute for professional medical advice.
- External links `rel="noopener noreferrer"`.

### 5.5 Accessibility
Skip link, visible focus rings, correct landmarks, form labels/errors announced, alt text for all images, colour not the only status signal, full keyboard navigation of nav/menu, language attribute `lang="bn"` on Bengali content.

### 5.6 Performance
Static generation, `next/font` with subsets, image optimisation, no heavy client libs on first paint, route-level code splitting, Framer Motion only in client islands, preconnect only where needed.

### 5.7 Environment variables
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NEXT_PUBLIC_ANALYTICS_DOMAIN`.

### 5.8 Deployment
Vercel project → connect GitHub repo → preview per PR → production on `main` → custom domain + SSL → www→apex redirect → uptime monitor → weekly dependency update PRs (Dependabot/Renovate).

---

## 6. Content & tone rules
- Voice: confident, clear, human; short sentences; formal-elegant English; natural Bangla (not word-for-word translation).
- Every claim must be defensible. No inflated metrics, no "revolutionary", no fake testimonials.
- Label status honestly: **Live / In development / Planned**.
- Bangla copy must be written natively for every page, reviewed by Rifat `[PROVIDE review]`.

---

## 7. Build phases for Claude Code
1. **Scaffold** — Next.js 15 + TS strict + Tailwind + next-intl + ESLint/Prettier + Vitest/Playwright + CI. Tokens, fonts, theme, layout shell (navbar, footer, language & theme switch).
2. **Design system** — all UI components with a `/dev/components` preview page (excluded from production).
3. **Content layer** — Zod schemas, `data/*`, MDX pipeline, EN + BN seed content using this spec (placeholders where `[PROVIDE]`).
4. **Pages** — Home → Ventures index + two case studies → About → Leadership → Contact → Press/Resume/Now → Writing.
5. **Contact backend** — route handler, Turnstile, rate limit, Resend, success/error UX, tests.
6. **SEO/A11y/Perf pass** — metadata, JSON-LD, sitemap/RSS/OG, axe, Lighthouse CI, security headers.
7. **Polish & QA** — motion, empty states, 404/error pages, responsive review at 360/768/1280, cross-browser, BN typography check.
8. **Deploy** — README with setup/env/deploy steps, `.env.example`, deployment checklist.

**Definition of done:** all pages exist in `en` and `bn`; CI green; Lighthouse and axe thresholds met; every placeholder listed in `PLACEHOLDERS.md` (auto-generated checklist of every `TODO_` / `[PROVIDE]` / `[CONFIRM]` item).

---

## 8. Rifat must provide (Claude Code should list these at the end)
Portrait & 2–3 photos · venture logos · real screenshots with synthetic data · confirmed titles/dates for Nationalian & Softstation · verified live-vs-planned status for each venture feature · real metrics (if any) · Speakers Club events list · personal-story paragraph · social links & WhatsApp · CV PDF · domain name · Bangla copy review.
