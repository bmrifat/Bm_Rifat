# Items for BM Rifat to Confirm / Provide (Spec v2 Minimal)

> **Purpose:** This file tracks every pending asset, link, and confirmation marked in code (`TODO_...`) according to `rifat-personal-site-spec-v2-minimal.md`. No facts or numbers have been fabricated.

---

## 1. Identity & Bio
- [ ] **`[TODO_CONFIRM_DISPLAY_NAME]`**: Confirm exact display name (currently set to `"BM Rifat"`).
  - *Location:* `src/data/profile.ts`
- [x] **`[TODO_PROVIDE_PORTRAIT]`**: Upload 96×96 portrait photo (`public/rifat.jpg`, git-ignored as requested).
  - *Location:* `public/rifat.jpg` & `src/data/profile.ts`
- [ ] **`[TODO_PROVIDE_PERSONAL_MOTIVATION]`**: 1 personal-motivation sentence to finalize the bio draft.
  - *Location:* `src/data/profile.ts`

---

## 2. Links & Socials
- [x] **`[TODO_PROVIDE_EMAIL]`**: Public contact email address (`bmrifat93@gmail.com`).
  - *Location:* `src/data/profile.ts`, `src/data/socials.ts`, `src/messages/*.json`
- [ ] **`[TODO_PROVIDE_LINKEDIN]`**: Personal LinkedIn profile URL.
  - *Location:* `src/data/profile.ts`
- [ ] **`[TODO_CONFIRM_DOMAIN]`**: Production custom domain name (currently defaults to `bmrifat.com`).

---

## 3. Ventures (SasthoSathi & DocClinic)
- [ ] **`[TODO_CONFIRM_SHASTHOSATHI_URL]`**: Confirm live website URL (currently `https://sasthosathi.com`).
  - *Location:* `src/data/ventures.ts`
- [ ] **`[TODO_CONFIRM_FEATURE_STATUS]`**: Verify built vs planned feature status:
  - **SasthoSathi Built:** AI lab/prescription/image analysis, Bengali TTS, symptom checker, emergency hub, demo cases gallery.
  - **SasthoSathi Planned:** Women's Corner, Better Me, diagnostic test prices & centres, telemedicine bridge, family health records.
  - **DocClinic Built:** Prescription desk with BD medicine search/PDF, AI prescription/lab OCR, patient queue/history, Doctor/Receptionist RBAC, multi-tenant isolation.
  - **DocClinic In Development:** Billing/subscriptions, telemedicine.
  - **DocClinic Planned:** Clinic Admin/Patient roles, mobile apps, SMS/WhatsApp reminders.
- [ ] **`[TODO_PROVIDE_SCREENSHOTS]`**: 1 screenshot per venture using strictly synthetic data (1 image max each).
  - *Location:* `public/images/ventures/shasthosathi.png`, `public/images/ventures/docclinic.png`

---

## 4. Other Activities (Roles & Titles)
- [ ] **`[TODO_CONFIRM_NATIONALIAN_TITLE]`**: Confirm exact title at Nationalian (currently drafted as `Marketing Strategy`).
  - *Location:* `src/data/profile.ts`
- [ ] **`[TODO_CONFIRM_SOFTSTATION_TITLE]`**: Confirm exact title at Softstation (currently drafted as `Client Solutions`).
  - *Location:* `src/data/profile.ts`

---

## 5. Review
- [ ] **`[TODO_BANGLA_COPY_REVIEW]`**: Review natural Bengali copy across `src/messages/bn.json`, `src/data/profile.ts`, and `src/data/ventures.ts`.
