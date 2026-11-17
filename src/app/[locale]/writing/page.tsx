import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { BookOpen, Calendar, ArrowRight, Tag } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "প্রবন্ধ ও ইঞ্জিনিয়ারিং নোটস" : "Writing & Engineering Notes",
    description: isBn
      ? "সিস্টেম আর্কিটেকচার, ডেটা আইসোলেশন ও হেলথকেয়ার এআই সেফটি সম্পর্কিত বিস্তারিত বিশ্লেষণ।"
      : "Articles and case analyses by BM Rifat covering systems architecture, security, and healthcare AI.",
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
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isBn ? "প্রকৌশল ডায়েরি" : "Technical RFCs & Essays"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "প্রবন্ধ ও ইঞ্জিনিয়ারিং নোটস" : "Writing & Engineering Notes"}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {isBn
              ? "সিস্টেম আর্কিটেকচার, ডেটাবেজ নিরাপত্তা এবং হেলথকেয়ার এআই সেফটি সম্পর্কিত বিস্তারিত বিশ্লেষণ ও বাস্তব অভিজ্ঞতা।"
              : "Deep-dives into systems architecture, multi-tenant database isolation, and healthcare AI safety."}
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug} hoverable className="p-7">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 text-xs font-mono text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-elevated text-muted border border-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-text mb-3 hover:text-primary transition-colors">
                <Link href={`/writing/${post.slug}`}>
                  {post.title[loc]}
                </Link>
              </h2>

              <p className="text-sm text-muted leading-relaxed mb-5">
                {post.summary[loc]}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-xs font-mono text-muted">
                  slug: /{post.slug}
                </span>
                <Link
                  href={`/writing/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>{isBn ? "প্রবন্ধ পড়ুন" : "Read Article"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
