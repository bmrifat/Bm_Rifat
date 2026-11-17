import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

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
    title: `${post.title[loc]} | BM Rifat`,
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
    <article className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? "সকল প্রবন্ধে ফিরে যান" : "Back to all articles"}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl space-y-4 pb-8 border-b border-border/80">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
            {post.title[loc]}
          </h1>

          <p className="text-lg text-muted leading-relaxed">
            {post.summary[loc]}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-elevated text-muted border border-border/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-3xl py-10 prose prose-slate dark:prose-invert max-w-none text-text">
          <div className="whitespace-pre-line text-base leading-relaxed space-y-4 font-normal">
            {post.content[loc]}
          </div>
        </div>

        {/* Author Bio Footer */}
        <div className="max-w-3xl mt-12 pt-8 border-t border-border/80 flex items-center justify-between">
          <div>
            <h4 className="font-display font-bold text-base text-text">
              BM Rifat
            </h4>
            <p className="text-xs text-muted mt-1">
              {isBn
                ? "সফটওয়্যার প্রকৌশলী ও স্বাস্থ্যপ্রযুক্তি উদ্যোক্তা, ঢাকা, বাংলাদেশ।"
                : "Software engineer & healthtech founder based in Dhaka, Bangladesh."}
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs font-bold text-primary hover:underline"
          >
            {isBn ? "মতামত দিন" : "Discuss this post"} →
          </Link>
        </div>
      </SectionContainer>
    </article>
  );
}
