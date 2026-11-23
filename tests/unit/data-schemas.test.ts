import { describe, it, expect } from "vitest";
import { ventures } from "@/data/ventures";
import { profile } from "@/data/profile";
import { posts } from "@/data/posts";
import { timeline } from "@/data/timeline";
import { books } from "@/data/books";
import { galleryItems } from "@/data/gallery";
import { ContactSubmissionSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";
import { hashIp, normalizeReferrer, recordVisit, getAnalyticsStats } from "@/lib/analytics";

describe("Minimal v2 Portfolio Data Integrity", () => {
  it("has valid profile facts with DIU = Dhaka International University", () => {
    expect(profile.name).toBe("BM Rifat");
    expect(profile.institution).toBe("Dhaka International University (DIU)");
    expect(profile.communityRole).toContain("DIU CSE Speakers Club");
    expect(profile.interests.length).toBeGreaterThanOrEqual(4);
    expect(profile.also.length).toBe(3);
    expect(profile.passions.length).toBe(8);
    const passionIds = profile.passions.map((p) => p.id);
    expect(passionIds).toContain("poetry");
    expect(passionIds).toContain("reading");
    expect(passionIds).toContain("traveling");
    expect(passionIds).toContain("family");
    expect(passionIds).toContain("friends");
    expect(passionIds).toContain("gardening");
    expect(passionIds).toContain("biking");
    expect(passionIds).toContain("photography");
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

  it("has valid timeline milestones and curated books", () => {
    expect(timeline.length).toBeGreaterThanOrEqual(5);
    const orgs = timeline.map((t) => t.org.en);
    expect(orgs.some((o) => o.includes("SasthoSathi"))).toBe(true);
    expect(orgs.some((o) => o.includes("DocClinic"))).toBe(true);

    expect(books.length).toBe(4);
    const bookIds = books.map((b) => b.id);
    expect(bookIds).toContain("zero-to-one");
    expect(bookIds).toContain("high-output-management");
    expect(bookIds).toContain("thinking-in-systems");
    expect(bookIds).toContain("gitanjali");
  });

  it("has valid visual chronicle and achievements gallery items", () => {
    expect(galleryItems.length).toBeGreaterThanOrEqual(5);

    const categories = new Set(galleryItems.map((item) => item.category));
    expect(categories.has("startups")).toBe(true);
    expect(categories.has("achievements")).toBe(true);
    expect(categories.has("speaking")).toBe(true);
    expect(categories.has("fieldwork")).toBe(true);

    for (const item of galleryItems) {
      expect(item.id.length).toBeGreaterThan(0);
      expect(item.title.en.length).toBeGreaterThan(0);
      expect(item.title.bn.length).toBeGreaterThan(0);
      expect(item.src.length).toBeGreaterThan(0);
      expect(item.caption.en.length).toBeGreaterThan(0);
      expect(item.caption.bn.length).toBeGreaterThan(0);
      expect(item.tags.length).toBeGreaterThan(0);
      expect(["image", "video"]).toContain(item.mediaType);
      if (item.mediaType === "video") {
        expect(item.videoUrl).toBeDefined();
      }
    }
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

  it("accepts valid message with 20+ characters and meaningful text", () => {
    const valid = {
      name: "Dr. Alim",
      email: "alim@example.com",
      message: "We would like to test the DocClinic prescription desk in our chamber.",
    };
    const result = ContactSubmissionSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.intent).toBe("other");
    }
  });

  it("rejects messages under 20 characters", () => {
    const tooShort = {
      name: "Dr. Alim",
      email: "alim@example.com",
      message: "Hello there!",
    };
    const result = ContactSubmissionSchema.safeParse(tooShort);
    expect(result.success).toBe(false);
  });

  it("rejects repetitive spam character sequences", () => {
    const spam = {
      name: "Dr. Alim",
      email: "alim@example.com",
      message: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };
    const result = ContactSubmissionSchema.safeParse(spam);
    expect(result.success).toBe(false);
  });

  it("allows honeypot in schema so API handler can trap bots silently", () => {
    const withHoneypot = {
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "Check out this great website offering special medicine discounts",
      honeypot: "https://spam.com",
    };
    const result = ContactSubmissionSchema.safeParse(withHoneypot);
    expect(result.success).toBe(true);
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

describe("Sovereign Telemetry & Analytics Engine", () => {
  it("anonymizes IP address with cryptographic hashing", () => {
    const rawIp = "103.205.12.89";
    const hashed = hashIp(rawIp);
    expect(hashed).toHaveLength(16);
    expect(hashed).not.toContain(rawIp);
    expect(hashIp(rawIp)).toBe(hashed); // deterministic within the same day
  });

  it("normalizes referrer channels correctly", () => {
    expect(normalizeReferrer("https://github.com/bmrifat")).toBe("GitHub");
    expect(normalizeReferrer("https://www.linkedin.com/feed/")).toBe("LinkedIn");
    expect(normalizeReferrer("https://www.google.com/search?q=bm+rifat")).toBe("Google Search");
    expect(normalizeReferrer("")).toBe("Direct / Bookmark");
    expect(normalizeReferrer("https://bmrifat.com/ventures")).toBe("Direct / Bookmark");
  });

  it("records telemetry and calculates aggregated stats", () => {
    const event = recordVisit({
      path: "/en/ventures/sasthosathi",
      referrer: "LinkedIn",
      device: "desktop",
      browser: "Chrome",
      country: "Bangladesh",
      city: "Dhaka",
      durationSec: 85,
      locale: "en",
    });

    expect(event.id).toBeDefined();
    expect(event.timestamp).toBeDefined();

    const stats = getAnalyticsStats();
    expect(stats.totalPageviews).toBeGreaterThan(0);
    expect(stats.uniqueVisitors).toBeGreaterThan(0);
    expect(stats.dailyTraffic.length).toBe(7);
    expect(stats.topPages.length).toBeGreaterThan(0);
    expect(stats.devices.length).toBe(3);
    expect(stats.countries.length).toBeGreaterThan(0);
    expect(stats.recentEvents.length).toBeGreaterThan(0);
  });
});
