# BM Rifat — Personal Website (v2 Minimal)

> *"A well-written one-page bio, not a marketing site."*  
> Reference pattern: Patrick Collison's site (patrickcollison.com). Text-first, single column (`max-width: 680px`), left-aligned, honest status labels, and zero decorative noise.

---

## ⚡ Key Highlights

- **Design:** Single column, narrow reading width (`680px`), one accent colour, hairline dividers. No cards, no hero banners, no gradients, no animations.
- **Content:** The whole story on one page (Home) — bio, ventures, interests, other activities, currently (Now), and elsewhere.
- **Case Studies:** Short, scannable case studies for **SasthoSathi** and **DocClinic** with problem, built capabilities, engineering decisions/trade-offs, and synthetic data safeguards.
- **Owner Identity:** CSE student at **Dhaka International University (DIU)**, Ex-Organising Secretary at DIU CSE Speakers Club, Founder & CEO at SasthoSathi and DocClinic.
- **Multilingual:** Full bilingual mirror in English (`/en/...`) and Bengali (`/bn/...`) using `next-intl`.
- **Contact:** Email first, tiny spam-safe form second (`POST /api/contact` with rate limiting, Turnstile, and Resend).

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npm run test

# 3. Production build
npm run build

# 4. Start local development server
npm run dev
```

---

## 📋 Items to Confirm / Provide

See [`PLACEHOLDERS.md`](./PLACEHOLDERS.md) for the checklist of pending assets and confirmations.
