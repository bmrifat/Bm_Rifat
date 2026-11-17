import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ["en", "bn"];

  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return {
    title: `${post.title[loc]} — BM Rifat`,
    description: post.summary[loc],
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <article className="space-y-6">
      <div>
        <Link
          href="/writing"
          className="text-xs text-muted hover:text-accent"
        >
          {isBn ? "← সকল প্রবন্ধে ফিরে যান" : "← Back to Writing"}
        </Link>
      </div>

      <header className="space-y-2 pb-6 border-b border-border">
        <div className="text-xs text-muted">
          {post.date} · {post.readingTime}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight">
          {post.title[loc]}
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {post.summary[loc]}
        </p>
      </header>

      <div className="space-y-4 text-base leading-relaxed text-text whitespace-pre-line">
        {post.content[loc]}
      </div>
    </article>
  );
}
