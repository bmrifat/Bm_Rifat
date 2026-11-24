import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "প্রবন্ধ ও নোট — বিএম রিফাত" : "Writing & RFCs — BM Rifat",
    description: isBn
      ? "সিস্টেম আর্কিটেকচার, ডেটা আইসোলেশন ও হেলথকেয়ার এআই সেফটি সম্পর্কিত নোট।"
      : "Articles and case notes by BM Rifat on architecture, security, and healthcare systems.",
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <div className="space-y-10 sm:space-y-12 pb-14">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border/80 text-muted hover:text-text shadow-soft transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "মূল পাতা" : "Home"}</span>
        </Link>
      </div>

      <div className="space-y-1.5 pb-6 border-b border-border/70">
        <h1 className="text-2xl sm:text-[30px] font-semibold text-text tracking-tight">
          {isBn ? "প্রবন্ধ ও নোট" : "Writing & Case Notes"}
        </h1>
        <p className="text-[15.5px] text-muted">
          {isBn
            ? "সিস্টেম আর্কিটেকচার, ডেটাবেজ সিকিউরিটি এবং স্বাস্থ্যপ্রযুক্তি সম্পর্কিত বিশ্লেষণ।"
            : "Notes on software architecture, security models, and healthcare engineering."}
        </p>
      </div>

      <div className="space-y-3 pt-1">
        {posts.map((post, idx) => (
          <article
            key={post.slug}
            className="group relative -mx-3 sm:-mx-4 p-4 rounded-xl hover:bg-surface/90 hover:shadow-soft border border-transparent hover:border-border/70 transition-all duration-200 space-y-1.5"
          >
            <div className="flex items-center justify-between text-[12px] font-mono text-muted/70">
              <span>0{idx + 1} · {post.date}</span>
              <span>{post.readingTime}</span>
            </div>

            <h2 className="text-[16.5px] font-medium text-text group-hover:text-accent transition-colors">
              <Link
                href={`/writing/${post.slug}`}
                className="inline-flex items-center gap-1.5"
              >
                <span>{post.title[loc]}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </h2>

            <p className="text-[14.5px] text-muted leading-relaxed">
              {post.summary[loc]}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
