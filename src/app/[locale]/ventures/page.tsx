import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default async function VenturesIndexPage({
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
          {isBn ? "উদ্যোগসমূহ" : "Ventures & Systems"}
        </h1>
        <p className="text-[15.5px] text-muted">
          {isBn
            ? "বাংলাদেশের স্বাস্থ্যসেবার উপযোগী প্রোডাকশন সফটওয়্যার আর্কিটেকচার।"
            : "Production healthcare software platforms engineered for Bangladesh."}
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {ventures.map((venture, idx) => (
          <div
            key={venture.slug}
            className="group relative -mx-3 sm:-mx-4 p-4 rounded-xl hover:bg-surface/90 hover:shadow-soft border border-transparent hover:border-border/70 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div className="space-y-1">
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="font-medium text-[16.5px] text-text group-hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="font-mono text-xs text-muted/60">0{idx + 1}.</span>
                  <span>{venture.name[loc]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
                <p className="text-[14.5px] text-muted leading-relaxed">
                  {venture.tagline[loc]}
                </p>
              </div>

              <div className="shrink-0 pt-0.5">
                <StatusDot status={venture.status} text={venture.statusText[loc]} asPill />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
