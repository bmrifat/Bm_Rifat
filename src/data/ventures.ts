export interface MinimalVenture {
  slug: string;
  name: { en: string; bn: string };
  tagline: { en: string; bn: string };
  status: "live" | "building" | "planned";
  statusText: { en: string; bn: string };
  whatItIs: { en: string; bn: string };
  why: { en: string; bn: string };
  whatItDoes: { en: string[]; bn: string[] };
  plannedFeatures: { en: string[]; bn: string[] };
  builtWith: string;
  engineeringNotes: { en: string[]; bn: string[] };
  links: {
    label: { en: string; bn: string };
    url: string;
    isExternal: boolean;
  }[];
}

export const ventures: MinimalVenture[] = [
  {
    slug: "shasthosathi",
    name: {
      en: "ShasthoSathi (স্বাস্থ্য সাথী)",
      bn: "স্বাস্থ্য সাথী (ShasthoSathi)",
    },
    tagline: {
      en: "Bengali-language health platform for patients.",
      bn: "সাধারণ রোগীদের জন্য বাংলা-ভিত্তিক স্বাস্থ্য প্ল্যাটফর্ম।",
    },
    status: "live",
    statusText: {
      en: "Live",
      bn: "লাইভ",
    },
    whatItIs: {
      en: "A patient-facing digital health companion built for Bangladesh. It translates clinical laboratory reports, prescriptions, and symptoms into plain, easily understood Bengali, supplemented with speech synthesis.",
      bn: "বাংলাদেশের সাধারণ রোগীদের জন্য তৈরি একটি ডিজিটাল স্বাস্থ্য সঙ্গী। এটি জটিল মেডিকেল ল্যাব রিপোর্ট, প্রেসক্রিপশন ও উপসর্গগুলোকে সহজ বাংলায় ব্যাখ্যা করে এবং অডিওর মাধ্যমে শুনিয়ে দেয়।",
    },
    why: {
      en: "In Bangladesh, medical reports are written in dense English terminology with clinical jargon that over 80% of patients cannot understand. Furthermore, critical emergency services (ambulances, blood donors, mental health helplines) remain scattered and chaotic during crises.",
      bn: "বাংলাদেশে সিংহভাগ মেডিকেল রিপোর্ট ও প্রেসক্রিপশন ইংরেজিতে জটিল পরিভাষায় লেখা থাকে, যা অধিকাংশ রোগীর বোধগম্য নয়। এছাড়া জরুরি প্রয়োজনে রক্তদাতা বা অ্যাম্বুলেন্স খুঁজে পাওয়া অত্যন্ত কষ্টসাধ্য।",
    },
    whatItDoes: {
      en: [
        "AI analysis of laboratory reports, handwritten prescriptions, and diagnostic images with structured findings.",
        "Bengali speech synthesis (Edge TTS) allowing low-literacy patients to listen to their findings.",
        "Symptom checker assessing duration, severity, and concordance without dispensing unauthorized prescriptions.",
        "Emergency hub with verified directories for ambulances, 24/7 pharmacies, blood donors, and national helplines.",
        "Curated clinical cases demonstration gallery.",
      ],
      bn: [
        "ল্যাব রিপোর্ট ও প্রেসক্রিপশনের এআই স্ক্যানিং এবং পয়েন্ট-আকারে সহজ ফলাফল উপস্থাপন।",
        "কম শিক্ষিত রোগীদের সুবিধার্থে সম্পূর্ণ বাংলা অডিও পাঠ (Edge TTS)।",
        "উপসর্গ বিশ্লেষণ ও প্রাথমিক সচেতনতা নির্দেশিকা — কোনো অননুমোদিত ওষুধের ডোজ ছাড়াই।",
        "জরুরি কেন্দ্র: অ্যাম্বুলেন্স, রক্তদাতা, সার্বক্ষণিক ফার্মেসি ও জাতীয় হটলাইনের সংরক্ষিত তালিকা।",
        "কাল্পনিক ও সিন্থেটিক ডেটা ভিত্তিক ডেমো কেস গ্যালারি।",
      ],
    },
    plannedFeatures: {
      en: [
        "Women's Corner (private, culturally aligned maternal & reproductive guidance).",
        "Better Me: Crisis-safe mental wellness and confidential therapist directory.",
        "Diagnostic test price range directory with verified nearby diagnostic centers.",
        "Telemedicine consultation bridge and offline-first PWA mode.",
        "Family health record vault with chronological investigation histories.",
      ],
      bn: [
        "উইমেন্স কর্নার: নারীদের প্রজনন ও মাতৃত্বকালীন স্বাস্থ্য বিষয়ে নিরাপদ ও গোপনীয় পরামর্শ।",
        "বেটার মি: মানসিক সুস্থতা এবং বিশ্বস্ত কাউন্সেলরদের সাথে যোগাযোগের মাধ্যম।",
        "ডায়াগনস্টিক টেস্টের সঠিক বাজারদর জানার জন্য নির্ভরযোগ্য মূল্য তালিকা।",
        "টেলিমেডিসিন সেবা এবং ইন্টারনেটহীন প্রত্যন্ত অঞ্চলের জন্য অফলাইন পিডব্লিউএ মোড।",
        "পরিবারের সদস্যদের পুরনো মেডিকেল রেকর্ড সাজিয়ে রাখার ডিজিটাল ভল্ট।",
      ],
    },
    builtWith: "Next.js 15, TypeScript, Tailwind CSS, Prisma, NextAuth, Zod, Cloudflare R2, Google Gemini, Edge TTS.",
    engineeringNotes: {
      en: [
        "Multi-model AI fallback cascade: Fast vision OCR runs on tight latency budgets (3.5s) with automatic failover to higher-capacity models.",
        "Clinical safety guardrail: Deterministic post-processing regex strips any drug doses or definitive diagnoses before payload hits the client.",
        "Trust over novelty: Diagnostic test price ranges are strictly admin-curated from verified centres rather than hallucinated by AI.",
      ],
      bn: [
        "মাল্টি-মডেল ফলব্যাক ক্যাসকেড: ৩.৫ সেকেন্ডের টাইমআউট ও স্বয়ংক্রিয় মডেল ফেইলওভার।",
        "ক্লিনিক্যাল সেফটি গার্ডরেল: এআই যাতে রোগীদের স্ক্রিনে কোনো ভুল ওষুধের ডোজ না দেয় তার জন্য কোড-লেভেল ফিল্টার।",
        "নির্ভরযোগ্যতা প্রথম: ডায়াগনস্টিক টেস্টের মূল্য এআই দিয়ে আন্দাজে তৈরি না করে অ্যাডমিন-ভেরিফায়েড রাখা হয়েছে।",
      ],
    },
    links: [
      {
        label: { en: "Visit Website (TODO_CONFIRM_URL)", bn: "ওয়েবসাইট দেখুন (TODO_CONFIRM_URL)" },
        url: "https://shasthosathi.com", // [TODO_CONFIRM_SHASTHOSATHI_URL]
        isExternal: true,
      },
      {
        label: { en: "Contact for Demo", bn: "ডেমো অনুরোধ করুন" },
        url: "/contact",
        isExternal: false,
      },
    ],
  },
  {
    slug: "docclinic",
    name: {
      en: "DocClinic (Doctor Management System)",
      bn: "ডকক্লিনিক (ডাক্তার ও ক্লিনিক ম্যানেজমেন্ট)",
    },
    tagline: {
      en: "Multi-tenant clinic software for doctors and chambers.",
      bn: "ডাক্তার ও চেম্বারের জন্য মাল্টি-টেন্যান্ট ক্লিনিক সফটওয়্যার।",
    },
    status: "building",
    statusText: {
      en: "In development",
      bn: "চলমান কাজ",
    },
    whatItIs: {
      en: "A cloud clinical operating system built for independent doctors and outpatient clinics in Bangladesh. It streamlines prescription drafting, patient queues, EHR histories, and chamber administration.",
      bn: "বাংলাদেশের চিকিৎসকদের জন্য তৈরি ক্লাউড ক্লিনিক অপারেটিং সিস্টেম। এটি দ্রুত প্রেসক্রিপশন তৈরি, সিরিয়াল ও রোগী হিস্ট্রি ম্যানেজমেন্ট সহজ করে তোলে।",
    },
    why: {
      en: "Most clinical chambers in Bangladesh still rely on handwritten paper ledgers. Patient medical histories are routinely lost, receptionists struggle with double-booked serials, and doctors spend 30-40% of consultation time repeatedly handwriting medication names.",
      bn: "বাংলাদেশের অধিকাংশ চেম্বার এখনো কাগুজে খাতার ওপর নির্ভরশীল। ফলে রোগীর ইতিহাস হারিয়ে যায়, সিরিয়াল নিয়ে বিশৃঙ্খলা তৈরি হয় এবং প্রেসক্রিপশন লিখতে ডাক্তারদের অতিরিক্ত সময় ব্যয় হয়।",
    },
    whatItDoes: {
      en: [
        "High-speed Prescription Desk with Bangladesh brand medicine autocomplete, dosage presets, and instant print/PDF export.",
        "AI optical character recognition (OCR) extracting details from past handwritten prescriptions and lab reports.",
        "Patient appointment queue and longitudinal EHR timeline.",
        "Server-enforced Role-Based Access Control (RBAC) separating Doctor and Receptionist operational boundaries.",
        "Multi-tenant database isolation preventing cross-chamber data visibility.",
      ],
      bn: [
        "দেশীয় ওষুধের তালিকা, সঠিক ডোজ ও টেস্ট ইনভেস্টিগেশন সহ দ্রুত প্রেসক্রিপশন তৈরির ডেস্ক।",
        "হাতে লেখা পুরনো প্রেসক্রিপশন ও রিপোর্টের জন্য হাই-স্পিড এআই ওসিআর (OCR)।",
        "সিরিয়াল ও রোগীর সম্পূর্ণ পূর্ববর্তী মেডিকেল ইতিহাস।",
        "ডাক্তার এবং রিসেপশনিস্টের জন্য আলাদা ও নিয়ন্ত্রিত রোল-বেসড পারমিশন (RBAC)।",
        "কঠোর মাল্টি-টেন্যান্ট ডাটাবেজ আইসোলেশন।",
      ],
    },
    plannedFeatures: {
      en: [
        "Clinic billing, accounts reconciliation, and automated invoicing (In Progress).",
        "Telemedicine consultation room with digital patient lobby token (In Progress).",
        "Clinic Admin, Super Admin, and Patient self-service portal roles.",
        "Automated WhatsApp and SMS appointment reminder broadcasts.",
        "HL7/FHIR compliant health record export.",
      ],
      bn: [
        "ক্লিনিক বিলিং ও আয়-ব্যয়ের হিসাব ব্যবস্থা (চলমান কাজ)।",
        "টেলিমেডিসিন ভিডিও কনসাল্টেশন ও ভার্চুয়াল টোকেন সিস্টেম (চলমান কাজ)।",
        "ক্লিনিক অ্যাডমিন ও রোগীদের নিজস্ব পোর্টাল।",
        "রোগীদের জন্য এসএমএস এবং হোয়াটসঅ্যাপ অ্যাপয়েন্টমেন্ট রিমাইন্ডার।",
        "আন্তর্জাতিক এফএইচআইআর (FHIR) ডেটা এক্সপোর্ট।",
      ],
    },
    builtWith: "Next.js 15, TypeScript, Tailwind CSS, Node.js / Express, MySQL with Tenant Guards, JWT httpOnly cookies, Gemini Flash.",
    engineeringNotes: {
      en: [
        "Server-side role enforcement: Access boundaries are validated strictly at the API and repository layer, never deferred to UI state.",
        "Tenant-scoped query guards: Database connection wrappers automatically inject tenant validation parameters to avoid data leaks.",
        "Concurrency-safe queue allocation: Row-level transaction locks prevent appointment serial collisions under simultaneous bookings.",
      ],
      bn: [
        "সার্ভার-সাইড রোল যাচাই: পারমিশন শুধুমাত্র ইউআই-তে নয়, সার্ভার ও ডাটাবেজ লেভেলে সুরক্ষিত।",
        "টেন্যান্ট কুয়েরি গার্ড: প্রতিটি ডাটাবেজ কোয়েরিতে বাধ্যতামূলক টেন্যান্ট আইডি ভ্যালিডেশন।",
        "কনকারেন্সি-সেফ সিরিয়াল: একই সময়ে একাধিক বুকিং হলেও সিরিয়াল ডুপ্লিকেশন রোধে রো-লেভেল লকিং।",
      ],
    },
    links: [
      {
        label: { en: "Request Chamber Demo", bn: "ডেমো অনুরোধ করুন" },
        url: "/contact",
        isExternal: false,
      },
    ],
  },
];
