import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight">
          {isBn ? "প্রবন্ধ ও নোট" : "Writing"}
        </h1>
        <p className="text-base text-muted mt-1">
          {isBn
            ? "সিস্টেম আর্কিটেকচার, সিকিউরিটি এবং স্বাস্থ্যপ্রযুক্তি সম্পর্কিত সংক্ষিপ্ত নোট।"
            : "Notes on software architecture, security models, and healthcare engineering."}
        </p>
      </div>

      <div className="space-y-6 pt-4 border-t border-border">
        {posts.map((post) => (
          <article key={post.slug} className="space-y-1">
            <div className="flex items-baseline justify-between text-xs text-muted">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-text">
              <Link
                href={`/writing/${post.slug}`}
                className="text-accent hover:underline"
              >
                {post.title[loc]}
              </Link>
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {post.summary[loc]}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
