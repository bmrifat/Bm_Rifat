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
          {isBn ? "উদ্যোগসমূহ" : "Ventures"}
        </h1>
        <p className="text-[15px] text-muted">
          {isBn
            ? "বাংলাদেশের স্বাস্থ্যসেবার উপযোগী প্রোডাকশন সফটওয়্যার সিস্টেম।"
            : "Production healthcare software systems built for Bangladesh."}
        </p>
      </div>

      <div className="space-y-6 pt-2">
        {ventures.map((venture) => (
          <div key={venture.slug} className="group space-y-1.5 pb-6 border-b border-border/70 last:border-b-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={`/ventures/${venture.slug}`}
                className="font-medium text-[16px] text-text group-hover:text-accent transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-border/80 group-hover:decoration-accent"
              >
                <span>{venture.name[loc]}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted/50 group-hover:text-accent transition-colors inline-block -mt-0.5" />
              </Link>
              <StatusDot status={venture.status} text={venture.statusText[loc]} />
            </div>
            <p className="text-[14.5px] text-muted leading-relaxed">
              {venture.tagline[loc]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
