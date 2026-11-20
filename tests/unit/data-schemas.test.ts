import { describe, it, expect } from "vitest";
import { ventures } from "@/data/ventures";
import { profile } from "@/data/profile";
import { posts } from "@/data/posts";
import { ContactSubmissionSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

describe("Minimal v2 Portfolio Data Integrity", () => {
  it("has valid profile facts with DIU = Dhaka International University", () => {
    expect(profile.name).toBe("BM Rifat");
    expect(profile.institution).toBe("Dhaka International University (DIU)");
    expect(profile.communityRole).toContain("DIU CSE Speakers Club");
    expect(profile.interests.length).toBeGreaterThanOrEqual(4);
    expect(profile.also.length).toBe(3);
  });

  it("has valid ventures (SasthoSathi and DocClinic)", () => {
    expect(ventures.length).toBe(2);
    const slugs = ventures.map((v) => v.slug);
    expect(slugs).toContain("sasthosathi");
    expect(slugs).toContain("docclinic");

    const sasthosathi = ventures.find((v) => v.slug === "sasthosathi");
    expect(sasthosathi?.status).toBe("live");
    expect(sasthosathi?.whatItDoes.en.length).toBeGreaterThan(0);
    expect(sasthosathi?.engineeringNotes.en.length).toBe(3);

    const docclinic = ventures.find((v) => v.slug === "docclinic");
    expect(docclinic?.status).toBe("building");
    expect(docclinic?.whatItDoes.en.length).toBeGreaterThan(0);
    expect(docclinic?.engineeringNotes.en.length).toBe(3);
  });

  it("has valid posts", () => {
    expect(posts.length).toBeGreaterThan(0);
  });
});

describe("Contact Validation & Rate Limiting", () => {
  it("accepts valid contact submission payload", () => {
    const valid = {
      name: "Dr. Alim Chowdhury",
      email: "alim@example.com",
      intent: "other",
      message: "We would like to test the DocClinic prescription desk in our chamber.",
    };
    const result = ContactSubmissionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects contact submission with invalid email", () => {
    const invalid = {
      name: "Dr. Alim",
      email: "not-an-email",
      intent: "other",
      message: "Hello there!",
    };
    const result = ContactSubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rate limits rapid requests per IP", async () => {
    const testIp = "10.0.0.55";
    for (let i = 0; i < 5; i++) {
      const res = await rateLimit(testIp, 5, 10000);
      expect(res.success).toBe(true);
    }
    const blocked = await rateLimit(testIp, 5, 10000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
