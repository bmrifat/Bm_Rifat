/**
 * ============================================================================
 * 📸 BM RIFAT — VISUAL CHRONICLE & ACHIEVEMENTS GALLERY
 * ============================================================================
 *
 * HOW TO ADD A NEW PHOTO OR VIDEO IN THE FUTURE:
 * ----------------------------------------------------------------------------
 * 1. ADDING A PHOTO:
 *    a. Copy your photo into the `/public/gallery/` folder
 *       (e.g., `/public/gallery/speaking-at-diu-2026.jpg`).
 *    b. Add a new object to the `galleryItems` array below:
 *       ```ts
 *       {
 *         id: "unique-slug-name",
 *         title: {
 *           en: "Your Title in English",
 *           bn: "আপনার ছবির বাংলা শিরোনাম"
 *         },
 *         category: "startups" | "achievements" | "speaking" | "fieldwork",
 *         mediaType: "image",
 *         src: "/gallery/speaking-at-diu-2026.jpg",
 *         aspectRatio: "16/9" | "4/3" | "1/1", // optional (defaults to 16/9)
 *         date: "2026",
 *         location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
 *         caption: {
 *           en: "Detailed description of the achievement or moment.",
 *           bn: "অর্জনের অথবা মুহূর্তের বিস্তারিত বিবরণ।"
 *         },
 *         tags: ["Startup", "Leadership", "Award"],
 *         featured: true // optional
 *       }
 *       ```
 *
 * 2. ADDING A VIDEO:
 *    a. Save a thumbnail image to `/public/gallery/my-video-thumb.jpg`.
 *    b. Set `mediaType: "video"`.
 *    c. Provide `videoUrl` with a YouTube embed link (e.g., "https://www.youtube.com/embed/VIDEO_ID")
 *       or a direct link to an MP4 video.
 * ----------------------------------------------------------------------------
 */

export type GalleryCategory =
  | "all"
  | "startups"
  | "achievements"
  | "speaking"
  | "fieldwork";

export interface GalleryItem {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  category: "startups" | "achievements" | "speaking" | "fieldwork";
  mediaType: "image" | "video";
  src: string;
  videoUrl?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  date: string;
  location?: {
    en: string;
    bn: string;
  };
  caption: {
    en: string;
    bn: string;
  };
  tags: string[];
  featured?: boolean;
}

export const galleryCategories: {
  id: GalleryCategory;
  label: { en: string; bn: string };
}[] = [
  { id: "all", label: { en: "All Visuals", bn: "সকল ছবি ও ভিডিও" } },
  { id: "startups", label: { en: "Startups & Ventures", bn: "স্টার্টআপ ও উদ্যোগ" } },
  { id: "achievements", label: { en: "Achievements & Awards", bn: "অর্জন ও সম্মাননা" } },
  { id: "speaking", label: { en: "Speaking & Leadership", bn: "বক্তব্য ও নেতৃত্ব" } },
  { id: "fieldwork", label: { en: "Fieldwork & Ground Realities", bn: "মাঠপর্যায় ও গবেষণা" } },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "sasthosathi-core-architecture",
    title: {
      en: "SasthoSathi — Sovereign Health AI Architecture",
      bn: "স্বাস্থ্যসাথী — সার্বভৌম স্বাস্থ্য এআই ও ক্লিনিক্যাল আর্কিটেকচার",
    },
    category: "startups",
    mediaType: "image",
    src: "/gallery/sasthosathi-core.svg",
    aspectRatio: "16/9",
    date: "2025 – Present",
    location: {
      en: "Dhaka, Bangladesh",
      bn: "ঢাকা, বাংলাদেশ",
    },
    caption: {
      en: "Architecting the deterministic multi-model fallback cascades and high-concurrency electronic triage system serving citizens in their native tongue.",
      bn: "বাংলাদেশের ১৭ কোটি মানুষের জন্য বাংলা-ভিত্তিক প্রথম ডিটারমিনিস্টিক ট্রায়াজ ও ইমার্জেন্সি স্বাস্থ্য সমন্বয় সফটওয়্যার আর্কিটেকচার ডিজাইন পর্ব।",
    },
    tags: ["HealthTech", "SasthoSathi", "Architecture", "Bengali AI"],
    featured: true,
  },
  {
    id: "diu-keynote-leadership",
    title: {
      en: "Keynote on System Architecture & Leadership",
      bn: "সিস্টেম আর্কিটেকচার ও নেতৃত্ব বিষয়ক কনফারেন্স কিনোট",
    },
    category: "speaking",
    mediaType: "image",
    src: "/gallery/diu-keynote.svg",
    aspectRatio: "16/9",
    date: "2024",
    location: {
      en: "Dhaka International University (DIU)",
      bn: "ঢাকা ইন্টারন্যাশনাল ইউনিভার্সিটি (DIU)",
    },
    caption: {
      en: "Delivering address to engineering students on deterministic computing, high-scale software architectures, and executive duties as Ex-Organising Secretary of the DIU CSE Speakers Club.",
      bn: "ডিআইইউ সিএসই স্পিকার্স ক্লাবের সাবেক সাংগঠনিক সম্পাদক হিসেবে শিক্ষার্থীদের উদ্দেশ্যে সফটওয়্যার ইঞ্জিনিয়ারিং, ডিটারমিনিস্টিক কম্পিউটিং ও টেক ক্যারিয়ার নিয়ে মূল বক্তব্য।",
    },
    tags: ["DIU CSE Speakers Club", "Keynote", "Leadership", "DIU"],
    featured: true,
  },
  {
    id: "docclinic-chamber-trials",
    title: {
      en: "DocClinic Chamber Desk & Practice Workflow Trial",
      bn: "ডকক্লিনিক চেম্বার ডেস্ক ও প্রাইভেট প্র্যাকটিস ট্রায়াল",
    },
    category: "startups",
    mediaType: "image",
    src: "/gallery/docclinic-trial.svg",
    aspectRatio: "16/9",
    date: "2025",
    location: {
      en: "Clinical Innovation Center, Dhaka",
      bn: "ক্লিনিক্যাল ইনোভেশন সেন্টার, ঢাকা",
    },
    caption: {
      en: "Testing isolated multi-tenant MySQL architecture and sub-100ms prescription auto-generation directly with private practitioners.",
      bn: "প্রাইভেট প্র্যাকটিশনারদের সরাসরি ফিডব্যাকের ভিত্তিতে তৈরি ডকক্লিনিক ডিজিটাল চেম্বার ডেস্ক—যেখানে ১০০ মিলি-সেকেন্ডের নিচে প্রেসক্রিপশন কম্পাইল হয়।",
    },
    tags: ["DocClinic", "Multi-Tenant", "Clinical UX", "MySQL"],
  },
  {
    id: "nationalian-award-ceremony",
    title: {
      en: "Nationalian IT Excellence & Software Innovation Award",
      bn: "ন্যাশনালিয়ান আইটি এক্সেলেন্স ও সফটওয়্যার ইনোভেশন অ্যাওয়ার্ড",
    },
    category: "achievements",
    mediaType: "image",
    src: "/gallery/nationalian-award.svg",
    aspectRatio: "16/9",
    date: "2024",
    location: {
      en: "Nationalian Grand Auditorium, Dhaka",
      bn: "ন্যাশনালিয়ান অডিটোরিয়াম, ঢাকা",
    },
    caption: {
      en: "Honored with the IT Innovation Award for demonstrated leadership in indigenous health-tech software engineering and student community impact.",
      bn: "সফটওয়্যার স্থাপত্যে স্বকীয় উদ্ভাবন, স্টুডেন্ট টেক কমিউনিটি গঠন ও দেশীয় স্বাস্থ্যপ্রযুক্তি সমাধান তৈরির স্বীকৃতিস্বরূপ সম্মানজনক অ্যাওয়ার্ড গ্রহণ।",
    },
    tags: ["Award", "Achievement", "Nationalian", "Innovation"],
    featured: true,
  },
  {
    id: "rural-healthcare-telemedicine-fieldwork",
    title: {
      en: "Grassroots Healthcare Network & Telemedicine Survey",
      bn: "মাঠপর্যায়ের টেলিমেডিসিন সমীক্ষা ও রোগী ইন্টারভিউ",
    },
    category: "fieldwork",
    mediaType: "image",
    src: "/gallery/fieldwork-telemed.svg",
    aspectRatio: "16/9",
    date: "2025",
    location: {
      en: "Sub-district Health Centers, Bangladesh",
      bn: "উপজেলা স্বাস্থ্য কমপ্লেক্স ও গ্রামীণ কেন্দ্র",
    },
    caption: {
      en: "Conducting field research on network latency in low-bandwidth rural health clinics to design SasthoSathi's offline-tolerant sync protocol.",
      bn: "কম্পিউটার বা দুর্বল ইন্টারনেটে স্বাস্থ্য সেবা কেন্দ্রগুলোতে সফটওয়্যার ব্যবহারে কী কী বাধার মুখোমুখি হতে হয়, তা সরাসরি মাঠে নেমে সমাধান খোঁজা।",
    },
    tags: ["Fieldwork", "Research", "Healthcare Access", "Low Bandwidth"],
  },
  {
    id: "bengali-tts-ai-system-demo",
    title: {
      en: "Bengali Medical Voice Synthesis & OCR Demo",
      bn: "বাংলা মেডিকেল ভয়েস সিন্থেসিস ও ওসিআর লাইভ ডেমো",
    },
    category: "achievements",
    mediaType: "video",
    src: "/gallery/bengali-tts-demo.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with BM Rifat's video link
    aspectRatio: "16/9",
    date: "2025",
    location: {
      en: "Systems R&D Lab, Dhaka",
      bn: "সিস্টেমস আরঅ্যান্ডডি ল্যাব, ঢাকা",
    },
    caption: {
      en: "Technical demonstration of offline edge-rendered Bengali voice audio explaining complex medical dosages to patients without literacy barriers.",
      bn: "প্রেসক্রিপশনের জটিল নির্দেশনা যাতে নিরক্ষর রোগীরাও নিজ মাতৃভাষায় নির্ভুলভাবে শুনতে পারেন—তার অফলাইন ভয়েস সিন্থেসিস সিস্টেমের লাইভ ভিডিও ডেমো।",
    },
    tags: ["Video Demo", "Voice TTS", "Accessibility", "Bengali AI"],
    featured: true,
  },
];
