import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { ArrowLeft } from "lucide-react";

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
    <article className="space-y-8 sm:space-y-10">
      <div>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-text transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "সকল প্রবন্ধ" : "Writing"}</span>
        </Link>
      </div>

      <header className="space-y-3 pb-6 border-b border-border/80">
        <div className="text-[12.5px] text-muted font-normal">
          {post.date} · {post.readingTime}
        </div>
        <h1 className="text-2xl sm:text-[30px] font-semibold text-text tracking-tight leading-snug">
          {post.title[loc]}
        </h1>
        <p className="text-[15.5px] text-muted leading-relaxed">
          {post.summary[loc]}
        </p>
      </header>

      <div className="space-y-5 text-[15.5px] leading-[1.85] text-text whitespace-pre-line font-normal">
        {post.content[loc]}
      </div>
    </article>
  );
}
