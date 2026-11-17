import { profile } from "@/data/profile";
import { Venture } from "./validators";
import { Post } from "./validators";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title.en,
    worksFor: [
      {
        "@type": "Organization",
        name: "ShasthoSathi",
      },
      {
        "@type": "Organization",
        name: "DocClinic",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Daffodil International University",
    },
    url: "https://bmrifat.com",
    sameAs: [
      "https://github.com/bmrifat",
      "https://linkedin.com/in/TODO_PROVIDE_LINKEDIN",
    ],
  };
}

export function getOrganizationJsonLd(venture: Venture) {
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
