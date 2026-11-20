import { Post } from "@/lib/validators";

export const posts: Post[] = [
  {
    slug: "engineering-multi-model-fallback-cascades-health-ai",
    title: {
      en: "Architecting a Resilient Multi-Model AI Fallback Cascade for Patient Care",
      bn: "রোগীদের সেবায় রেজিলিয়েন্ট মাল্টি-মডেল এআই ফলব্যাক ক্যাসকেড আর্কিটেকচার",
    },
    date: "2024-11-10",
    readingTime: "6 min read",
    tags: ["System Architecture", "AI Engineering", "Reliability", "Healthcare"],
    summary: {
      en: "Why relying on a single frontier LLM fails in production healthcare systems, and how we engineered an automated fallback cascade with latency limits and clinical circuit breakers.",
      bn: "প্রোডাকশন হেলথকেয়ার সিস্টেমে একক এআই মডেলের ঝুঁকি এবং কিভাবে আমরা কঠোর ল্যাটেন্সি লিমিট ও সার্কিট ব্রেকার সহ ফলব্যাক আর্কিটেকচার তৈরি করেছি।",
    },
    content: {
      en: `
When building **SasthoSathi**, our primary constraint was clinical reliability. If a patient in a rural district with intermittent 3G coverage submits a laboratory report for interpretation, the system cannot hang on a 15-second cold start from a large multimodal model, nor can it fail silently if an upstream API quota triggers rate limiting.

### 1. The Single Model Fallacy
Most AI prototypes wrap a single endpoint (\`gemini-1.5-pro\` or \`gpt-4o\`). In production healthcare applications, this creates three unacceptable vulnerabilities:
1. **Unpredictable Latency:** Heavy multimodal models experience 99th-percentile latency spikes exceeding 12 seconds during peak hours.
2. **Quota Exhaustion:** Burst traffic can exhaust tier limits instantly, leaving critical queries unserviced.
3. **Overkill for Deterministic Tasks:** Asking a massive reasoning model to extract blood glucose numbers is financially and computationally inefficient.

### 2. The Tiered Fallback Architecture
We engineered a 3-tier cascade:
\`\`\`
Client Report Upload
        ↓
[ Tier 1: Fast OCR + Vision Specialized (Gemini Flash) ]
        ↓ (Timeout: 3500ms or 5xx)
[ Tier 2: Resilient Primary (Gemini Pro) ]
        ↓ (Timeout: 5000ms or 429)
[ Tier 3: Deterministic Rule-Based Parser + Notification ]
\`\`\`

### 3. Circuit Breaker & Health Tracking
Each upstream model provider is wrapped with an in-memory sliding-window circuit breaker. If 3 consecutive requests to Tier 1 exceed the latency threshold of 4,000ms or return status \`503\`, the circuit trips into \`OPEN\` state for 60 seconds. During this window, all inbound requests bypass Tier 1 entirely, preventing cascading queue pileups.

### 4. Hard Medical Guardrails (Post-Processing)
Never rely on prompt instructions like *"do not prescribe drugs"* alone. In SasthoSathi, an independent deterministic rule engine parses all generated JSON payloads. If medication names or dosage patterns are detected in patient-facing self-care contexts, the payload is intercepted and replaced with a mandatory physical consultation directive.
      `.trim(),
      bn: `
**স্বাস্থ্য সাথী** তৈরির ক্ষেত্রে আমাদের প্রধান চ্যালেঞ্জ ছিল নির্ভরযোগ্যতা। প্রত্যন্ত অঞ্চলের একজন রোগী যখন ল্যাব টেস্টের ছবি আপলোড করেন, তখন ১৫ সেকেন্ড লোডিং স্ক্রিন দেখে বসে থাকা বা এআই সার্ভার ডাউন থাকার কারণে সেবা বন্ধ হওয়া কোনোভাবেই গ্রহণযোগ্য নয়।

### ১. একক মডেলের সীমাবদ্ধতা
অধিকাংশ ক্ষেত্রে শুধুমাত্র একটি এআই এপিআই কল করা হয়। কিন্তু স্বাস্থ্যসেবায় এতে মারাত্মক সমস্যা তৈরি হতে পারে:
১. **ল্যাটেন্সি বা বিলম্ব:** পিক আওয়ারে ভারী মডেলগুলো মাঝে মাঝে অতিরিক্ত সময় নেয়।
২. **কোটা শেষ হওয়া:** হঠাৎ অতিরিক্ত ট্রাফিক এলে এপিআই কোটা শেষ হয়ে সার্ভিস বন্ধ হয়ে যেতে পারে।
৩. **অপ্রয়োজনীয় খরচ:** সাধারণ টেক্সট বা সংখ্যার জন্য ভারী মডেল ব্যবহার অর্থনৈতিকভাবে অপচয়।

### ২. ফলব্যাক ক্যাসকেড কাঠামো
আমরা ৩-স্তরের একটি আর্কিটেকচার তৈরি করেছি:
- **প্রথম স্তর (Gemini Flash):** সুপার-ফাস্ট রেসপন্স (৩.৫ সেকেন্ড সর্বোচ্চ)।
- **দ্বিতীয় স্তর (Gemini Pro):** জটিল ব্যাখ্যার প্রয়োজন হলে বা প্রথম স্তরে ত্রুটি দেখা দিলে।
- **তৃতীয় স্তর (রুল-বেসড পার্সার):** ব্যাকআপ ব্যবস্থা ও ম্যানুয়াল নির্দেশনা।

### ৩. কঠোর নিরাপত্তা ফিল্টার
আমরা শুধুমাত্র এআই প্রম্পটের উপর নির্ভর করি না। এআই-এর উত্তরের উপর আলাদা কোড লেভেল ভ্যালিডেশন চলে, যাতে কোনোভাবেই কোনো ভুল ওষুধের মাত্রা রোগীর স্ক্রিনে না যায়।
      `.trim(),
    },
  },
  {
    slug: "tenant-isolation-strategies-nextjs-mysql",
    title: {
      en: "Multi-Tenant Isolation in Clinic SaaS: Guarding Medical Records at the Query Layer",
      bn: "ক্লিনিক ম্যানেজমেন্টে মাল্টি-টেন্যান্ট আইসোলেশন: কুয়েরি স্তরে ডেটার নিশ্ছিদ্র নিরাপত্তা",
    },
    date: "2024-10-24",
    readingTime: "5 min read",
    tags: ["Security", "Database", "Next.js", "MySQL", "Architecture"],
    summary: {
      en: "How we implemented fail-safe tenant isolation in DocClinic using connection-scoped query interceptors, ensuring Doctor A can never leak patient records to Doctor B.",
      bn: "ডকক্লিনিকে কানেকশন-লেভেল কুয়েরি ইন্টারসেপ্টরের মাধ্যমে কিভাবে সম্পূর্ণ টেন্যান্ট আইসোলেশন নিশ্চিত করা হয়েছে, যাতে একজন ডাক্তারের ডেটা অন্যের সাথে কখনো মিশে না যায়।",
    },
    content: {
      en: `
In **DocClinic**, our medical management platform, clinic data segregation is the highest engineering priority. A single data leak between rival chambers or unassociated doctors would destroy professional trust.

### The Threat: Application-Level 'WHERE tenant_id = ?' Fatigue
In traditional junior codebases, engineers append \`AND tenant_id = ?\` manually to every SQL query. This pattern is vulnerable to human error: a single omitted clause inside an updated endpoint inadvertently exposes confidential patient records.

### The Solution: Connection-Scoped Tenant Context
Rather than trusting developer discipline on every line of SQL, we engineered a query wrapper at the database repository boundary:

\`\`\`typescript
// Context-enforced query execution
export async function withTenantQuery<T>(
  tenantId: string,
  queryFn: (db: TenantScopedClient) => Promise<T>
): Promise<T> {
  const scopedClient = createScopedClient(tenantId);
  return await queryFn(scopedClient);
}
\`\`\`

### Verification and Safe Demos
In staging and portfolio demonstration environments, we take a zero-tolerance policy on patient data. Every demo dataset is synthetically generated via deterministic seed algorithms, ensuring that no real Bangladeshi citizen's health record is ever loaded into non-production environments.
      `.trim(),
      bn: `
**ডকক্লিনিক** প্ল্যাটফর্মে রোগীর স্বাস্থ্য তথ্যের গোপনীয়তা রক্ষা করা আমাদের সবচেয়ে গুরুত্বপূর্ণ দায়িত্ব। একাধিক চেম্বার বা ক্লিনিকে কর্মরত ডাক্তারদের ডেটা যাতে একে অপরের সাথে কখনোই মিশ্রিত না হয়, তার জন্য আমরা সিস্টেমের গভীরতম স্তরে নিরাপত্তা নিশ্চিত করেছি।

### সাধারণ ভুলের সমাধান
অনেক সময় ডেভেলপাররা প্রতিটি কোয়েরিতে ম্যানুয়ালি \`WHERE tenant_id = ...\` লিখতে গিয়ে কোনো একটা জায়গায় ভুলে বাদ দিয়ে ফেলেন। এতে একজন ডাক্তারের রিপোর্ট আরেকজনের কাছে দৃশ্যমান হওয়ার মতো ভয়াবহ ঝুঁকি তৈরি হয়।

আমরা ডাটাবেজ কানেকশন মিডলওয়্যারে স্বয়ংক্রিয় টেন্যান্ট গার্ড তৈরি করেছি, যার ফলে প্রতিটি ডাটাবেজ অপারেশনে টেন্যান্ট আইডি বাধ্যতামূলকভাবে ভ্যালিডেট হয়।

### পোর্টফোলিও ও ডেমোর নীতিমালা
আমরা আমাদের লাইভ ডেমো বা পোর্টফোলিওতে কোনো আসল রোগীর তথ্য ব্যবহার করি না; সম্পূর্ণ কাল্পনিক ও টেস্ট ডেটা ব্যবহার করে সিস্টেমের কার্যকারিতা প্রদর্শন করা হয়।
      `.trim(),
    },
  },
  {
    slug: "bengali-first-medical-ux-tts",
    title: {
      en: "Designing Bengali-First UX: Why Localization Requires More Than Text Translation",
      bn: "বাংলা-কেন্দ্রিক মেডিকেল ইউজার এক্সপেরিয়েন্স: অনুবাদের চেয়েও বেশি কিছু",
    },
    date: "2024-09-18",
    readingTime: "4 min read",
    tags: ["UX Design", "Bengali NLP", "Accessibility", "Healthcare"],
    summary: {
      en: "The nuances of designing digital health interfaces for Bangladesh: custom Bengali typography line-heights, audio synthesizers for low-literacy users, and culturally aligned emergency flows.",
      bn: "বাংলাদেশের জন্য স্বাস্থ্য প্রযুক্তির ইন্টারফেস ডিজাইনে প্রয়োজনীয় ফন্ট রেন্ডারিং, বাংলা অডিও পাঠের গুরুত্ব এবং ব্যবহারকারী-বান্ধব ডিজাইন নীতি।",
    },
    content: {
      en: `
Localization in tech often stops at importing an i18n JSON file and swapping English strings for Bengali. In healthcare technology for Bangladesh, this superficial approach fails immediately.

### 1. Bengali Font Metric Realities
Complex conjunct characters (যুক্তবর্ণ) in the Bengali script occupy significantly more vertical ascender and descender space than Latin glyphs. Standard CSS line-heights of \`1.4\` or \`1.5\` cause characters to overlap or clip awkwardly. We enforced a baseline line-height of \`1.7\` for all \`[lang="bn"]\` elements.

### 2. Audio-First for Low-Literacy Patients
A significant percentage of patients seeking help in district hospitals cannot fluently read dense text on mobile screens. Through **Edge TTS** integration with natural Bengali voice synthesizers, SasthoSathi enables users to hit one play button and listen to their summarized diagnostic report in clear Bengali speech.
      `.trim(),
      bn: `
ওয়েবসাইটে শুধু ভাষা পরিবর্তন করলেই বাংলা ব্যবহারকারীদের জন্য একটি সিস্টেম উপযুক্ত হয়ে ওঠে না। বিশেষ করে স্বাস্থ্যসেবার ক্ষেত্রে এর জন্য প্রয়োজন গভীর পর্যবেক্ষণ ও ব্যবহারিক সমাধান।

### ১. বাংলা ফন্ট ও টাইপোগ্রাফি
যুক্তবর্ণের কারণে বাংলা লিপির উচ্চতা ইংরেজি অক্ষরের চেয়ে বেশি জায়গা নেয়। সাধারণ লাইনের দূরত্ব ব্যবহার করলে যুক্তবর্ণগুলো একে অপরের সাথে লেগে যায় বা কেটে যায়। এজন্য আমরা বাংলা টেক্সটের জন্য সুনির্দিষ্ট \`1.7\` লাইন হাইট নির্ধারণ করেছি।

### ২. অডিও মাধ্যমে পাঠ
গ্রামের বা প্রত্যন্ত অঞ্চলের অনেক রোগী মোবাইলের ছোট স্ক্রিনে দীর্ঘ টেক্সট সহজে পড়তে পারেন না। স্বাস্থ্য সাথীতে আমরা বাংলা ভয়েস সিন্থেসিস (TTS) যুক্ত করেছি, যাতে রোগীরা এক ক্লিকেই তাদের স্বাস্থ্য রিপোর্ট অডিও আকারে শুনতে পারেন।
      `.trim(),
    },
  },
];
