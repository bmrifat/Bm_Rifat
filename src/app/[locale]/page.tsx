import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowUpRight } from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* 1. INTRO BLOCK */}
      <section className="space-y-5">
        {/* Photo: 96x96, rounded-lg */}
        <div className="relative group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-muted select-none overflow-hidden shadow-soft">
            {/* Elegant Monogram / Portrait Placeholder */}
            <span className="font-serif italic text-2xl text-muted/70 tracking-tight">
              R
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
            {profile.name}
          </h1>
          <p className="text-[15px] text-muted font-normal">
            {profile.tagline[loc]}
          </p>
        </div>

        <p className="text-[16px] text-text leading-[1.8] max-w-prose">
          {profile.bio[loc]}
        </p>

        {/* Quick Contact & Presence */}
        <div className="text-[14px] text-muted pt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{isBn ? "ইমেইল:" : "Email:"}</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-text hover:text-accent underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
          >
            {profile.email}
          </a>
          <span className="text-border" aria-hidden="true">·</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
          >
            GitHub
          </a>
          <span className="text-border" aria-hidden="true">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* 2. VENTURES SECTION */}
      <section className="space-y-4 pt-8 border-t border-border/70">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "উদ্যোগসমূহ" : "Ventures"}
        </h2>

        <div className="space-y-3.5">
          {ventures.map((venture) => (
            <div
              key={venture.slug}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4 py-1"
            >
              <div className="leading-snug">
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="font-medium text-[15.5px] text-text group-hover:text-accent transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-border/80 group-hover:decoration-accent"
                >
                  <span>{venture.name[loc]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted/50 group-hover:text-accent transition-colors inline-block -mt-0.5" />
                </Link>
                <span className="text-muted text-[14px] ml-2 block sm:inline mt-0.5 sm:mt-0">
                  {venture.tagline[loc]}
                </span>
              </div>
              <StatusDot status={venture.status} text={venture.statusText[loc]} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. THINGS I'M INTERESTED IN */}
      <section className="space-y-4 pt-8 border-t border-border/70">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "আগ্রহের বিষয়সমূহ" : "Things I'm interested in"}
        </h2>

        <ul className="space-y-3 text-[15.5px] text-text leading-relaxed">
          {profile.interests.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-muted/60 select-none font-serif text-sm mt-0.5">—</span>
              <div>
                <strong className="font-medium text-text">{item.lead[loc]}</strong>{" "}
                <span className="text-muted">{item.desc[loc]}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. ALSO (OTHER ACTIVITIES) */}
      <section className="space-y-4 pt-8 border-t border-border/70">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "অন্যান্য কার্যক্রম" : "Also"}
        </h2>

        <div className="space-y-2.5 text-[15px]">
          {profile.also.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 py-0.5">
              <span className="font-medium text-text">{item.name}</span>
              <span className="text-muted">{item.desc[loc]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NOW */}
      <section className="space-y-4 pt-8 border-t border-border/70">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
            {isBn ? "বর্তমান ব্যস্ততা" : "Now"}
          </h2>
          <span className="text-[12px] text-muted font-normal">
            {isBn ? `সর্বশেষ আপডেট: ${profile.now.lastUpdated}` : `Last updated: ${profile.now.lastUpdated}`}
          </span>
        </div>

        <ul className="space-y-2.5 text-[15px] text-text leading-relaxed">
          {profile.now.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-muted/60 select-none font-serif text-sm mt-0.5">—</span>
              <span className="text-text">{bullet[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. ELSEWHERE */}
      <section className="space-y-3 pt-8 border-t border-border/70">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "অন্যান্য মাধ্যম" : "Elsewhere"}
        </h2>

        <div className="text-[14px] flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-text"
          >
            GitHub
          </a>
          <span className="text-border" aria-hidden="true">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-text"
          >
            LinkedIn
          </a>
          <span className="text-border" aria-hidden="true">·</span>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-text transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-text"
          >
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
