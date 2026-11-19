import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "প্রবন্ধ ও নোট — বিএম রিফাত" : "Writing — BM Rifat",
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
    <div className="space-y-10 sm:space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-text transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "মূল পাতা" : "Home"}</span>
        </Link>
      </div>

      <div className="space-y-1.5 pb-6 border-b border-border/80">
        <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
          {isBn ? "প্রবন্ধ ও নোট" : "Writing"}
        </h1>
        <p className="text-[15px] text-muted">
          {isBn
            ? "সিস্টেম আর্কিটেকচার, সিকিউরিটি এবং স্বাস্থ্যপ্রযুক্তি সম্পর্কিত সংক্ষিপ্ত বিশ্লেষণ।"
            : "Notes on software architecture, security models, and healthcare engineering."}
        </p>
      </div>

      <div className="space-y-8 pt-2">
        {posts.map((post) => (
          <article key={post.slug} className="group space-y-1.5 pb-6 border-b border-border/70 last:border-b-0">
            <div className="flex items-baseline justify-between text-[12px] text-muted font-normal">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-[16.5px] font-medium text-text group-hover:text-accent transition-colors">
              <Link
                href={`/writing/${post.slug}`}
                className="inline-flex items-center gap-1 underline underline-offset-4 decoration-border/80 group-hover:decoration-accent"
              >
                <span>{post.title[loc]}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted/50 group-hover:text-accent transition-colors inline-block -mt-0.5" />
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
