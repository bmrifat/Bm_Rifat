import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { ArrowLeft, Clock, Calendar } from "@/components/ui/Icons";

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
    <article className="space-y-8 sm:space-y-10 pb-14">
      <div>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border/80 text-muted hover:text-text shadow-soft transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "সকল প্রবন্ধ" : "Writing"}</span>
        </Link>
      </div>

      <header className="space-y-3 pb-6 border-b border-border/70">
        <div className="flex items-center gap-3 text-[12px] font-mono text-muted/80">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted/60" />
            {post.date}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted/60" />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-[32px] font-semibold text-text tracking-tight leading-snug">
          {post.title[loc]}
        </h1>

        <p className="text-[16px] text-muted leading-relaxed max-w-prose">
          {post.summary[loc]}
        </p>
      </header>

      <div className="space-y-5 text-[16px] leading-[1.85] text-text whitespace-pre-line font-normal">
        {post.content[loc]}
      </div>
    </article>
  );
}
