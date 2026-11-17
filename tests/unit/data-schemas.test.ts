import { describe, it, expect } from "vitest";
import { ventures } from "@/data/ventures";
import { timeline } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { posts } from "@/data/posts";
import {
  VentureSchema,
  TimelineItemSchema,
  SkillCategorySchema,
  PostSchema,
  ContactSubmissionSchema,
} from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

describe("Content Model & Zod Schemas Validation", () => {
  it("validates all ventures against VentureSchema", () => {
    expect(ventures.length).toBeGreaterThan(0);
    for (const venture of ventures) {
      const result = VentureSchema.safeParse(venture);
      expect(result.success).toBe(true);
    }
  });

  it("validates that ShasthoSathi and DocClinic are present as core ventures", () => {
    const slugs = ventures.map((v) => v.slug);
    expect(slugs).toContain("shasthosathi");
    expect(slugs).toContain("docclinic");
  });

  it("validates all timeline entries", () => {
    expect(timeline.length).toBeGreaterThan(0);
    for (const item of timeline) {
      const result = TimelineItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    }
  });

  it("validates all skill categories", () => {
    expect(skillCategories.length).toBeGreaterThan(0);
    for (const cat of skillCategories) {
      const result = SkillCategorySchema.safeParse(cat);
      expect(result.success).toBe(true);
    }
  });

  it("validates all posts", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      const result = PostSchema.safeParse(post);
      expect(result.success).toBe(true);
    }
  });
});

describe("Contact Validation & Rate Limiting", () => {
  it("accepts valid contact submission payload", () => {
    const valid = {
      name: "Dr. Alim Chowdhury",
      email: "alim@example.com",
      organization: "Care Medical",
      intent: "demo",
      message: "We would like to test the DocClinic prescription desk in our chamber.",
    };
    const result = ContactSubmissionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects contact submission with invalid email", () => {
    const invalid = {
      name: "Dr. Alim",
      email: "not-an-email",
      intent: "demo",
      message: "Hello there!",
    };
    const result = ContactSubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rate limits rapid requests", async () => {
    const testIp = "192.168.1.100";
    // Send 5 requests (within limit)
    for (let i = 0; i < 5; i++) {
      const res = await rateLimit(testIp, 5, 10000);
      expect(res.success).toBe(true);
    }
    // 6th request should be rate-limited
    const blocked = await rateLimit(testIp, 5, 10000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
