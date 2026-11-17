import { SkillCategory } from "@/lib/validators";

export const skillCategories: SkillCategory[] = [
  {
    title: {
      en: "Product & Architecture",
      bn: "প্রোডাক্ট ও আর্কিটেকচার",
    },
    skills: [
      "System Architecture & Scaling",
      "Multi-tenant SaaS Architecture",
      "Domain-Driven Design (DDD)",
      "API & Microservice Design",
      "Relational & Document Modeling",
    ],
  },
  {
    title: {
      en: "Full-Stack Web Engineering",
      bn: "ফুল-স্ট্যাক ওয়েব ইঞ্জিনিয়ারিং",
    },
    skills: [
      "Next.js 15 (App Router, Server Actions)",
      "TypeScript (Strict Mode)",
      "React 19 & React Query",
      "Tailwind CSS & Design Tokens",
      "Node.js & Express.js",
      "MySQL, PostgreSQL, Prisma ORM",
      "RESTful APIs & GraphQL",
    ],
  },
  {
    title: {
      en: "AI Engineering & Integration",
      bn: "এআই ইঞ্জিনিয়ারিং ও ইন্টিগ্রেশন",
    },
    skills: [
      "Google Gemini Pro / Flash API",
      "Multi-Model Fallback Cascades",
      "Vision OCR (Medical Prescriptions & Reports)",
      "Bengali Text-To-Speech (Edge TTS)",
      "Clinical Safety Guardrails & Interceptors",
      "Prompt Optimization & Structured Outputs (Zod)",
    ],
  },
  {
    title: {
      en: "Security & Privacy",
      bn: "সিকিউরিটি ও প্রাইভেসি",
    },
    skills: [
      "Tenant Isolation SQL Wrappers",
      "Role-Based Access Control (RBAC)",
      "JWT & Secure httpOnly Cookie Sessions",
      "Input Sanitization (DOMPurify, Zod)",
      "Content Security Policy (CSP) & HSTS",
      "Zero PII Exposure Discipline",
    ],
  },
  {
    title: {
      en: "Leadership & Communication",
      bn: "নেতৃত্ব ও যোগাযোগ",
    },
    skills: [
      "Public Speaking & Keynotes",
      "Event Organisation (DIU CSE Speakers Club)",
      "Technical Writing & Case Documentation",
      "Cross-Functional Team Collaboration",
      "Mentorship & Student Community Building",
    ],
  },
  {
    title: {
      en: "Business & Marketing",
      bn: "বিজনেস ও মার্কেটিং",
    },
    skills: [
      "Healthcare Market Discovery (Bangladesh)",
      "Product-Led Growth (PLG) Strategy",
      "Value Proposition Messaging",
      "Institutional Sales & Client Solutions",
    ],
  },
];
