# Placeholders & Items for BM Rifat to Confirm / Provide

> **Purpose:** This file tracks every pending asset, metric, and confirmation marked in code (`TODO_...`) according to the project specification. Zero facts or numbers have been fabricated.

---

## 1. Identity & Personal Details
- [ ] **`[TODO_CONFIRM_FULL_NAME]`**: Confirm official full display name (currently set to `"BM Rifat"`).
  - *Location:* `src/data/profile.ts`, `src/app/[locale]/press/page.tsx`
- [ ] **`[TODO_CONFIRM_PERSONAL_MOTIVATION_PARAGRAPH]`**: 3–5 sentence personal statement on why healthcare tech in Bangladesh (access, language barrier, physician workload).
  - *Location:* `src/data/profile.ts`, `src/app/[locale]/about/page.tsx`
- [ ] **`[TODO_PROVIDE_PORTRAIT]`**: High-resolution professional headshot for Hero and Press kit.
  - *Location:* `public/images/portrait.jpg`
- [ ] **`[TODO_PROVIDE_3_PHOTOS]`**: Up to 3 photos of campus activities, Speakers Club anchoring/workshops, or hackathons.
  - *Location:* `public/images/about/`
- [ ] **`[TODO_PROVIDE_PDF_CV]`**: Upload updated curriculum vitae as `rifat-cv.pdf`.
  - *Location:* `public/rifat-cv.pdf`

---

## 2. Contact Channels & Socials
- [ ] **`[TODO_PROVIDE_LINKEDIN]`**: Personal LinkedIn profile URL.
  - *Location:* `src/data/socials.ts`
- [ ] **`[TODO_PROVIDE_WHATSAPP]`**: WhatsApp contact number / link for quick clinic & partner inquiries.
  - *Location:* `src/data/socials.ts`
- [ ] **`[TODO_PROVIDE_DIRECT_EMAIL]`**: Public/direct contact email address (e.g., `rifat@...`).
  - *Location:* `src/data/socials.ts`
- [ ] **`[TODO_PROVIDE_TWITTER]`**: X (Twitter) profile handle or URL.
  - *Location:* `src/data/socials.ts`

---

## 3. Ventures & Products

### ShasthoSathi (স্বাস্থ্য সাথী)
- [ ] **`[TODO_CONFIRM_SHASTHOSATHI_URL]`**: Confirm live URL or staging demo link (currently set to `https://shasthosathi.com`).
  - *Location:* `src/data/ventures.ts`
- [ ] **`[TODO_CONFIRM_FEATURE_STATUS]`**: Verify live vs planned feature breakdown:
  - *Reported as Live:* Gemini AI multi-model fallback cascade, OCR lab report extraction, Edge TTS Bengali voice, Emergency hub (ambulance, blood donor, 24/7 pharmacies), Diagnostic test price directory.
  - *Reported as Planned:* Women's Corner, Better Me (mental wellness), Offline PWA, Family health records vault.
- [ ] **`[TODO_PROVIDE_VENTURE_LOGOS]`**: Official SVG / high-res PNG logo for ShasthoSathi.
  - *Location:* `public/images/ventures/shasthosathi-logo.svg`

### DocClinic
- [ ] **`[TODO_CONFIRM_DOCCLINIC_URL]`**: Confirm demo/staging URL (currently set to `https://docclinic.app`).
  - *Location:* `src/data/ventures.ts`
- [ ] **`[TODO_CONFIRM_FEATURE_STATUS]`**: Verify live vs building feature breakdown:
  - *Reported as Built:* Prescription desk, AI handwritten prescription/lab OCR, patient queue & EHR history, Doctor & Receptionist RBAC, medical AI chat.
  - *Reported as In Progress:* Clinic billing, subscriptions, telemedicine bridge.
  - *Reported as Roadmap:* Clinic Admin / Super Admin roles, mobile apps, SMS/WhatsApp reminders, HL7/FHIR export.
- [ ] **`[TODO_PROVIDE_VENTURE_LOGOS]`**: Official SVG / high-res PNG logo for DocClinic.
  - *Location:* `public/images/ventures/docclinic-logo.svg`

### Nationalian & Softstation
- [ ] **`[TODO_CONFIRM_EXACT_TITLES]`**: Confirm exact job titles and date ranges for Nationalian and Softstation.
  - *Location:* `src/data/ventures.ts`, `src/data/timeline.ts`

---

## 4. Community & DIU CSE Speakers Club
- [ ] **`[TODO_PROVIDE_SPEAKERS_CLUB_EVENTS_LIST]`**: Complete list of 3–5 flagship events and competitions organised at Daffodil International University.
  - *Location:* `src/app/[locale]/leadership/page.tsx`
- [ ] **`[TODO_PROVIDE_ATTENDEES_COUNT]`**: Verified number of students mentored or workshop attendees (if tracking).
  - *Location:* `src/data/profile.ts`

---

## 5. Quantitative Metrics (Only if Verified)
- [ ] **`[TODO_PROVIDE_CLINICS_COUNT]`**: Number of clinics/doctors onboarded (omit if early stage).
- [ ] **`[TODO_PROVIDE_REPORTS_COUNT]`**: Number of medical reports analyzed through ShasthoSathi (omit if early stage).

---

## 6. Language & Copy Review
- [ ] **`[TODO_BANGLA_COPY_REVIEW]`**: Review native Bengali copy in `src/messages/bn.json` and page descriptions to ensure exact regional tone alignment.
