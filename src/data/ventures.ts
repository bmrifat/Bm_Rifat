import { Venture } from "@/lib/validators";

export const ventures: Venture[] = [
  {
    slug: "shasthosathi",
    name: {
      en: "ShasthoSathi",
      bn: "স্বাস্থ্য সাথী",
    },
    tagline: {
      en: "Bengali-first, AI-assisted healthcare platform making medical insights accessible to every patient.",
      bn: "বাংলা-ভিত্তিক, এআই-সহায়ক স্বাস্থ্য প্ল্যাটফর্ম যা সাধারণ রোগীদের কাছে স্বাস্থ্যসেবাকে সহজ করে তোলে।",
    },
    status: "live",
    role: {
      en: "Founder & Lead Architect",
      bn: "প্রতিষ্ঠাতা ও প্রধান স্থপতি",
    },
    period: "2024 – Present",
    featured: true,
    problem: {
      en: "In Bangladesh, over 80% of patients cannot interpret their diagnostic lab reports or doctor's prescriptions due to medical jargon and language barriers. Furthermore, emergency services (blood, oxygen, ambulance) remain deeply fragmented across Facebook groups and word of mouth.",
      bn: "বাংলাদেশে সিংহভাগ রোগী ভাষার জটিলতা ও ডাক্তারের হস্তাক্ষরের কারণে প্রেসক্রিপশন ও ল্যাব টেস্টের রিপোর্ট বুঝতে পারেন না। একইসাথে জরুরি প্রয়োজনে অ্যাম্বুলেন্স, রক্তদাতা কিংবা মানসিক স্বাস্থ্যসেবা খুঁজে পাওয়া অত্যন্ত কষ্টসাধ্য।",
    },
    audience: {
      en: "Patients, families, and caregivers across Bangladesh seeking clear, reliable health interpretation in their native language.",
      bn: "বাংলাদেশের সকল সাধারণ রোগী এবং তাদের পরিবার, যারা সহজ বাংলায় সঠিক স্বাস্থ্য নির্দেশিকা পেতে চান।",
    },
    solution: {
      en: "A comprehensive health companion that combines AI report analysis with Bengali text-to-speech, symptom concordances, and a dedicated emergency directory. Built with medical-safety guardrails so AI guides without diagnosing or prescribing doses.",
      bn: "একটি নির্ভরযোগ্য স্বাস্থ্য প্ল্যাটফর্ম যা কৃত্রিম বুদ্ধিমত্তার মাধ্যমে ল্যাব রিপোর্ট বিশ্লেষণ, বাংলা অডিও পাঠ এবং জরুরি সেবা ডিরেক্টরি সরবরাহ করে — কঠোর চিকিৎসা নীতিমালার অধীনে।",
    },
    stack: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "Cloudflare R2",
      "Google Gemini Pro / Flash",
      "Edge TTS (Bengali Audio)",
      "NextAuth.js",
      "Zod",
    ],
    highlights: {
      en: [
        "Multi-model AI fallback cascade with latency timers and circuit-breaker failovers.",
        "Clinical safety guardrail: models are strictly prevented from recommending drug dosages or absolute diagnoses.",
        "Bengali speech synthesis (Edge TTS) allowing low-literacy patients to listen to their structured lab report summaries.",
        "Comprehensive Emergency Hub: curated directory of ambulances, blood donors, 24/7 pharmacies, and national helplines.",
        "Admin-curated diagnostic test price directory to protect patients from predatory pricing.",
      ],
      bn: [
        "টাইমআউট এবং হেলথ-ট্র্যাকিং সহ মাল্টি-মডেল এআই ফলব্যাক ক্যাসকেড আর্কিটেকচার।",
        "ক্লিনিক্যাল সেফটি গার্ডরেল: এআই কখনোই সংবেদনশীল ক্ষেত্রে প্রেসক্রিপশন বা নির্দিষ্ট ওষুধের ডোজ নির্ধারণ করে না।",
        "সহজেই শোনার জন্য বাংলা ভয়েস সিন্থেসিস (TTS), যা কম পড়াশোনা জানা রোগীদেরও সহায়তা করে।",
        "জরুরি কেন্দ্র: অ্যাম্বুলেন্স, রক্তদাতা, সার্বক্ষণিক ফার্মেসি ও জাতীয় হটলাইনের সংরক্ষিত তালিকা।",
        "ডায়াগনস্টিক টেস্টের সঠিক বাজারদর জানার জন্য নির্ভরযোগ্য অ্যাডমিন-ভেরিফায়েড মূল্য তালিকা।",
      ],
    },
    security: {
      en: [
        "Encrypted report storage via signed Cloudflare R2 URLs with expiration limits.",
        "Zero long-term retention of unanonymized patient medical imaging on third-party AI endpoints.",
        "Input sanitization, file-signature MIME verification, and strict payload size limits.",
      ],
      bn: [
        "ক্লাউডফ্লেয়ার R2 এর সাময়িক সাইনড ইউআরএল এর মাধ্যমে নিরাপদ ফাইল স্টোরেজ।",
        "তৃতীয় পক্ষের এআই সার্ভারে রোগীর নাম বা সংবেদনশীল তথ্যের কোনো দীর্ঘমেয়াদী সংরক্ষণ নেই।",
        "ইনপুট স্যানিটাইজেশন এবং কঠোর ফাইল সিগনেচার যাচাই।",
      ],
    },
    roadmap: {
      en: [
        "Women's Health Corner (safe, private reproductive & maternal guidance).",
        "Better Me: Crisis-safe mental wellness and confidential therapist booking.",
        "Offline Progressive Web App (PWA) for rural clinic connectivity.",
        "Integrated Family Health Vault with chronologically indexed lab records.",
      ],
      bn: [
        "উইমেন্স কর্নার: নারীদের প্রজনন ও মাতৃত্বকালীন স্বাস্থ্য বিষয়ে নিরাপদ ও গোপনীয় পরামর্শ।",
        "বেটার মি: মানসিক সুস্থতা এবং বিশ্বস্ত কাউন্সেলরদের সাথে যোগাযোগের মাধ্যম।",
        "ইন্টারনেটহীন প্রত্যন্ত অঞ্চলের জন্য অফলাইন পিডব্লিউএ (PWA) মোড।",
        "পুরো পরিবারের মেডিকেল হিস্ট্রি ক্রমানুসারে সংরক্ষণ করার ডিজিটাল ভল্ট।",
      ],
    },
    lessons: {
      en: [
        "AI temperature tuning is insufficient for medical safety; hardcoded post-processing regex and rule-based interceptors are mandatory.",
        "Local latency matters more than maximum model parameter size for mobile web users on 4G in Bangladesh.",
      ],
      bn: [
        "মেডিকেল নিরাপত্তার জন্য শুধুমাত্র এআই প্রম্পট যথেষ্ট নয়; রুল-ভিত্তিক ফিল্টার ও পোস্ট-প্রসেসিং অপরিহার্য।",
        "বাংলাদেশের মোবাইল নেটওয়ার্কে সবচেয়ে ভারী মডেলের চেয়ে দ্রুত রেসপন্স ও স্থিতিশীলতা বেশি কার্যকর।",
      ],
    },
    links: [
      {
        label: { en: "Live Platform (TODO_CONFIRM_URL)", bn: "লাইভ ওয়েবসাইট (TODO_CONFIRM_URL)" },
        url: "https://shasthosathi.com", // [TODO_CONFIRM_SHASTHOSATHI_URL]
        type: "live",
      },
    ],
  },
  {
    slug: "docclinic",
    name: {
      en: "DocClinic",
      bn: "ডকক্লিনিক",
    },
    tagline: {
      en: "Multi-tenant clinic OS and smart prescription desk for doctors and healthcare practices in Bangladesh.",
      bn: "বাংলাদেশের ডাক্তার এবং ক্লিনিকসমূহের জন্য মাল্টি-টেন্যান্ট ক্লিনিক ম্যানেজমেন্ট ও স্মার্ট প্রেসক্রিপশন সফটওয়্যার।",
    },
    status: "building",
    role: {
      en: "Co-Founder & System Architect",
      bn: "সহ-প্রতিষ্ঠাতা ও সিস্টেম আর্কিটেক্ট",
    },
    period: "2024 – Present",
    featured: true,
    problem: {
      en: "Independent clinics and chambers in Bangladesh rely on paper ledgers and manual queues. Patient histories get lost, doctor consultation time is wasted on repetitive writing, and receptionists struggle with double-booked serials.",
      bn: "বাংলাদেশের সিংহভাগ ব্যক্তিগত চেম্বার ও ক্লিনিক এখনো কাগুজে খাতার ওপর নির্ভরশীল। ফলে রোগীর ইতিহাস হারিয়ে যায়, সিরিয়াল নিয়ে বিশৃঙ্খলা তৈরি হয় এবং প্রেসক্রিপশন লিখতে ডাক্তারদের অতিরিক্ত সময় ব্যয় হয়।",
    },
    audience: {
      en: "Specialist doctors, chamber assistants, and multi-doctor outpatient clinics across Bangladesh.",
      bn: "বিশেষজ্ঞ চিকিৎসক, ব্যক্তিগত চেম্বার এবং ছোট-মাঝারি ক্লিনিক কর্তৃপক্ষ।",
    },
    solution: {
      en: "A robust SaaS enabling instant prescription generation with medication auto-complete, optical recognition (OCR) of previous handwritten notes, concurrency-safe patient queues, and isolated clinic tenancy.",
      bn: "একটি আধুনিক ক্লাউড সফটওয়্যার যার মাধ্যমে দ্রুত প্রেসক্রিপশন তৈরি, পূর্ববর্তী কাগজপত্রের এআই স্ক্যানিং এবং নিশ্ছিদ্র সিরিয়াল ম্যানেজমেন্ট নিশ্চিত হয়।",
    },
    stack: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS (Clinical Tokens)",
      "React Query (@tanstack)",
      "React Hook Form",
      "Node.js / Express",
      "MySQL with Tenant Guards",
      "JWT httpOnly Cookies",
      "Google Gemini Flash (OCR)",
    ],
    highlights: {
      en: [
        "High-speed Prescription Desk with instant drug dosage templates and clinical investigation presets.",
        "Handwritten prescription & lab OCR powered by Gemini Flash vision pipeline.",
        "Concurrency-safe serial allocation preventing collision under simultaneous receptionist bookings.",
        "Hybrid appointment scheduling: strict serial order combined with dynamic estimated consultation windows.",
        "Server-enforced RBAC distinguishing Doctor, Receptionist, and Administrative operations.",
      ],
      bn: [
        "দ্রুত প্রেসক্রিপশন লেখার উপযোগী ড্রাগ অটো-কমপ্লিট এবং ল্যাব টেস্টের তৈরি টেমপ্লেট।",
        "হাতে লেখা পুরনো প্রেসক্রিপশন ও রিপোর্টের জন্য হাই-স্পিড এআই ওসিআর (OCR)।",
        "একই সাথে একাধিক সহকারী সিরিয়াল বুক করলেও যাতে কোনো সংঘর্ষ না ঘটে তার নির্ভরযোগ্য লক মেকানিজম।",
        "সিরিয়াল এবং সম্ভাব্য সময়ের সুষম সমন্বয়ে প্রস্তুত স্মার্ট শিডিউলিং।",
        "ডাক্তার এবং রিসেপশনিস্টের জন্য আলাদা ও নিয়ন্ত্রিত রোল-বেসড পারমিশন (RBAC)।",
      ],
    },
    security: {
      en: [
        "Tenant isolation query wrapper: every SQL execution enforces `tenant_id` validation at the connection pool middleware.",
        "Synthetic demo data mandate: zero real patient or doctor identifiable records are ever displayed in staging or portfolio previews.",
        "Helmet HTTP security headers, DOMPurify for HTML sanitization, and tamper-resistant signed cookies.",
      ],
      bn: [
        "কঠোর টেন্যান্ট আইসোলেশন: প্রতিটি ডাটাবেজ কোয়েরিতে বাধ্যতামূলক টেন্যান্ট আইডি ভ্যালিডেশন।",
        "পোর্টফোলিও ও ডেমোতে কেবলমাত্র কাল্পনিক ও সিন্থেটিক ডেটা ব্যবহারের কঠোর নিয়ম।",
        "এইচটিএমএল স্যানিটাইজেশন, সিকিউর কুকি এবং ডেটা ভ্যালিডেশন।",
      ],
    },
    roadmap: {
      en: [
        "Clinic billing, doctor revenue reconciliation, and automated invoice PDF generation (In Progress).",
        "Automated WhatsApp and SMS appointment reminders for patients.",
        "Telemedicine consultation bridge with integrated digital token lobby.",
        "HL7/FHIR compliant data export for hospital interoperability.",
      ],
      bn: [
        "ক্লিনিক বিলিং ও আয়-ব্যয়ের হিসাব ব্যবস্থা (চলমান কাজ)।",
        "রোগীদের জন্য এসএমএস এবং হোয়াটসঅ্যাপ অ্যাপয়েন্টমেন্ট রিমাইন্ডার।",
        "টেলিমেডিসিন ভিডিও কনসাল্টেশন ও ভার্চুয়াল টোকেন সিস্টেম।",
        "হাসপাতাল ডাটাবেজের সাথে সংযোগের জন্য আন্তর্জাতিক এফএইচআইআর (FHIR) কমপ্লায়েন্স।",
      ],
    },
    lessons: {
      en: [
        "Strangler-fig migration from legacy Express monolith to Next.js server actions requires careful boundary encapsulation of session state.",
        "Clinicians will abandon software if prescription creation takes more than 45 seconds; UX speed is a clinical requirement.",
      ],
      bn: [
        "ডাক্তারদের জন্য কোনো সফটওয়্যারে প্রেসক্রিপশন লিখতে ৪৫ সেকেন্ডের বেশি লাগলে তারা কাগুজে খাতায় ফিরে যান; তাই গতিই প্রধান ফিচার।",
        "ডাটাবেজ আর্কিটেকচারে মাল্টি-টেন্যান্ট লজিক প্রথম দিন থেকেই নিখুঁত রাখা জরুরি।",
      ],
    },
    links: [
      {
        label: { en: "Request Demo", bn: "ডেমো অনুরোধ করুন" },
        url: "https://docclinic.app", // [TODO_CONFIRM_DOCCLINIC_URL]
        type: "demo",
      },
    ],
  },
  {
    slug: "nationalian",
    name: {
      en: "Nationalian",
      bn: "ন্যাশনালিওন",
    },
    tagline: {
      en: "Educational community platform and student initiative connecting learners across Bangladesh.",
      bn: "শিক্ষার্থীদের জন্য তৈরি কমিউনিটি প্ল্যাটফর্ম ও শিক্ষামূলক উদ্যোগ।",
    },
    status: "archived",
    role: {
      en: "Marketing Strategy & Operations Lead [CONFIRM exact title]",
      bn: "মার্কেটিং স্ট্র্যাটেজি ও অপারেশনস লিড [CONFIRM]",
    },
    period: "2022 – 2023",
    featured: false,
    problem: {
      en: "High school and college students in Bangladesh lacked cohesive digital community hubs for peer learning, academic updates, and co-curricular networking.",
      bn: "বাংলাদেশের কলেজ শিক্ষার্থীদের মধ্যে পারস্পরিক যোগাযোগ এবং সহ-শিক্ষা কার্যক্রমের জন্য একটি সুসংগঠিত প্ল্যাটফর্মের অভাব ছিল।",
    },
    audience: {
      en: "National curriculum students, youth competitors, and academic mentors.",
      bn: "জাতীয় শিক্ষাক্রমের শিক্ষার্থী এবং শিক্ষার্থীকেন্দ্রিক বিভিন্ন সংগঠন।",
    },
    solution: {
      en: "Led campaign execution, organic social outreach, community engagement events, and digital communication strategies.",
      bn: "কমিউনিটি গঠন, ডিজিটাল যোগাযোগ কৌশল এবং শিক্ষার্থীদের সংযুক্ত করার বিভিন্ন ইভেন্ট পরিচালনা।",
    },
    stack: ["Digital Community", "Content Strategy", "Growth Marketing", "Event Execution"],
    highlights: {
      en: [
        "Spearheaded messaging strategy and digital student outreach across educational institutions.",
        "Coordinated academic peer-support initiatives and competitive event marketing.",
      ],
      bn: [
        "বিভিন্ন শিক্ষাপ্রতিষ্ঠানের শিক্ষার্থীদের মধ্যে যোগাযোগ ও এনগেজমেন্ট কৌশল পরিচালনা।",
        "সহশিক্ষা ও প্রতিযোগিতামূলক ইভেন্টের সমন্বয় এবং ডিজিটাল ব্র্যান্ডিং।",
      ],
    },
    security: {
      en: ["Community guidelines adherence and member data privacy."],
      bn: ["কমিউনিটির নিরাপত্তা ও সদস্য তথ্যের গোপনীয়তা রক্ষা।"],
    },
    roadmap: {
      en: ["Archived initiative."],
      bn: ["সম্পন্ন উদ্যোগ।"],
    },
    links: [],
  },
  {
    slug: "softstation",
    name: {
      en: "Softstation",
      bn: "সফটস্টেশন",
    },
    tagline: {
      en: "Web engineering and digital presence solutions for educational institutes, schools, and madrasas.",
      bn: "স্কুল, কলেজ ও মাদ্রাসার জন্য ডিজিটাল পোর্টাল ও ওয়েব ইঞ্জিনিয়ারিং সেবা।",
    },
    status: "archived",
    role: {
      en: "Business Development & Client Solutions [CONFIRM exact title]",
      bn: "বিজনেস ডেভেলপমেন্ট ও ক্লায়েন্ট সলিউশনস [CONFIRM]",
    },
    period: "2023",
    featured: false,
    problem: {
      en: "Educational institutions in district and rural areas struggled to establish modern, compliant, and cost-effective digital portals required by education boards.",
      bn: "জেলা ও গ্রামীণ পর্যায়ের শিক্ষাপ্রতিষ্ঠানসমূহের শিক্ষা বোর্ডের নীতিমালা অনুযায়ী ডিজিটাল পোর্টাল তৈরিতে কারিগরি সহযোগিতার প্রয়োজন ছিল।",
    },
    audience: {
      en: "School administrators, college principals, and madrasa governing committees in Bangladesh.",
      bn: "স্কুল, কলেজ ও মাদ্রাসা পরিচালনা কমিটি এবং শিক্ষাপ্রতিষ্ঠান প্রধানগণ।",
    },
    solution: {
      en: "Consulted directly with institutional leadership, mapped portal functional requirements, and structured delivered web software to match statutory academic board standards.",
      bn: "শিক্ষাপ্রতিষ্ঠানগুলোর সাথে সরাসরি আলোচনা, রিকয়ারমেন্ট নির্ধারণ এবং উপযুক্ত ওয়েব সমাধান কাঠামো বাস্তবায়ন।",
    },
    stack: ["Web Consulting", "Institutional Portals", "Client Solutions", "Technical Sales"],
    highlights: {
      en: [
        "Delivered web solutions for educational institutions adhering to statutory ministry guidelines.",
        "Managed client discovery, requirement specifications, and delivery sign-offs.",
      ],
      bn: [
        "শিক্ষা বোর্ডের নিয়ম মেনে প্রতিষ্ঠানের ওয়েব পোর্টাল বাস্তবায়নে ভূমিকা।",
        "গ্রাহকদের প্রয়োজনীয়তা বিশ্লেষণ ও সফলভাবে বাস্তবায়ন নিশ্চিতকরণ।",
      ],
    },
    security: {
      en: ["Standard web security and institutional data confidentiality."],
      bn: ["প্রাতিষ্ঠানিক ডেটার নিরাপত্তা ও গোপনীয়তা বজায় রাখা।"],
    },
    roadmap: {
      en: ["Archived institutional project consulting."],
      bn: ["সম্পন্ন প্রজেক্ট কনসাল্টিং।"],
    },
    links: [],
  },
];
