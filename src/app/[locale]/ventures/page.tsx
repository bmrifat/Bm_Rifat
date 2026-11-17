import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Layers } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "উদ্যোগসমূহ ও প্রযুক্তিগত সিস্টেম" : "Ventures & Systems",
    description: isBn
      ? "স্বাস্থ্য সাথী ও ডকক্লিনিক সহ স্বহস্তে নির্মিত প্রোডাকশন সফটওয়্যার আর্কিটেকচার।"
      : "Healthcare technology, clinic operating systems, and engineering ventures built by BM Rifat.",
  };
}

export default async function VenturesPage({
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
            <Layers className="w-3.5 h-3.5" />
            <span>{isBn ? "প্রকল্প পোর্টফোলিও" : "Systems & Ventures"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "উদ্যোগ ও প্রযুক্তিগত সিস্টেম" : "Ventures & Systems"}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {isBn
              ? "শুরু থেকে শেষ পর্যন্ত স্বহস্তে নির্মিত সফটওয়্যার: আর্কিটেকচার প্ল্যানিং, সিকিউরিটি বাউন্ডারি এবং প্রোডাকশন কোডিং।"
              : "Healthcare platforms and technical systems built end-to-end: product architecture, security boundaries, and production code."}
          </p>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ventures.map((venture) => (
            <Card key={venture.slug} hoverable className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-text">
                    {venture.name[loc]}
                  </h2>
                  <StatusBadge status={venture.status} />
                </div>

                <p className="text-sm font-semibold text-primary">
                  {venture.tagline[loc]}
                </p>

                <p className="text-sm text-muted leading-relaxed">
                  {venture.problem[loc]}
                </p>

                <div className="pt-3 border-t border-border/60 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {isBn ? "দায়িত্ব ও সময়কাল" : "Role & Period"}
                  </span>
                  <div className="flex items-center justify-between text-xs text-text font-medium">
                    <span>{venture.role[loc]}</span>
                    <span className="font-mono text-muted">{venture.period}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {isBn ? "প্রযুক্তিগত দিকসমূহ" : "Stack Highlights"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {venture.stack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-elevated text-muted border border-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-muted">
                  slug: /{venture.slug}
                </span>
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  {isBn ? "কেস স্টাডি দেখুন" : "Explore Case Study"}
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
