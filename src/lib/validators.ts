import { z } from "zod";

export const LocalizedStringSchema = z.object({
  en: z.string(),
  bn: z.string(),
});

export const LocalizedListSchema = z.object({
  en: z.array(z.string()),
  bn: z.array(z.string()),
});

export const VentureStatusSchema = z.enum(["live", "building", "planned", "archived"]);

export const VentureLinkSchema = z.object({
  label: LocalizedStringSchema,
  url: z.string().url(),
  type: z.enum(["live", "github", "demo", "docs", "case-study"]),
});

export const VentureSchema = z.object({
  slug: z.string(),
  name: LocalizedStringSchema,
  tagline: LocalizedStringSchema,
  status: VentureStatusSchema,
  role: LocalizedStringSchema,
  period: z.string(),
  problem: LocalizedStringSchema,
  audience: LocalizedStringSchema,
  solution: LocalizedStringSchema,
  stack: z.array(z.string()),
  highlights: LocalizedListSchema,
  security: LocalizedListSchema,
  roadmap: LocalizedListSchema,
  lessons: LocalizedListSchema.optional(),
  links: z.array(VentureLinkSchema),
  featured: z.boolean().default(false),
});

export type Venture = z.infer<typeof VentureSchema>;

export const TimelineItemSchema = z.object({
  period: z.string(),
  title: LocalizedStringSchema,
  org: LocalizedStringSchema,
  description: LocalizedStringSchema,
  skills: z.array(z.string()).optional(),
  type: z.enum(["work", "education", "leadership", "venture"]),
});

export type TimelineItem = z.infer<typeof TimelineItemSchema>;

export const SkillCategorySchema = z.object({
  title: LocalizedStringSchema,
  skills: z.array(z.string()),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;

export const PostSchema = z.object({
  slug: z.string(),
  title: LocalizedStringSchema,
  date: z.string(),
  summary: LocalizedStringSchema,
  tags: z.array(z.string()),
  readingTime: z.string(),
  content: LocalizedStringSchema,
});

export type Post = z.infer<typeof PostSchema>;

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  organization: z.string().max(100).optional(),
  intent: z.enum([
    "partnership",
    "demo",
    "hiring",
    "speaking",
    "other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  honeypot: z.string().max(0, "Bot detected").optional(),
  turnstileToken: z.string().optional(),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;
