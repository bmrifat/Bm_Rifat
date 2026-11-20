import { profile } from "@/data/profile";
import { MinimalVenture } from "@/data/ventures";
import { Post } from "./validators";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.tagline.en,
    worksFor: [
      {
        "@type": "Organization",
        name: "SasthoSathi",
      },
      {
        "@type": "Organization",
        name: "DocClinic",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dhaka International University (DIU)",
    },
    url: "https://bmrifat.com",
    sameAs: [
      profile.github,
      profile.linkedin,
    ],
  };
}

export function getOrganizationJsonLd(venture: MinimalVenture) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: venture.name.en,
    description: venture.tagline.en,
    founder: {
      "@type": "Person",
      name: profile.name,
    },
    url: venture.links[0]?.url || "https://bmrifat.com",
  };
}

export function getArticleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title.en,
    description: post.summary.en,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    url: `https://bmrifat.com/en/writing/${post.slug}`,
  };
}
