import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import { timeline } from "@/data/timeline";
import { books } from "@/data/books";
import { StatusDot } from "@/components/ui/StatusDot";
import { PortraitLightbox } from "@/components/ui/PortraitLightbox";
import { PassionsSection } from "@/components/ui/PassionsSection";
import { TimelineSection } from "@/components/ui/TimelineSection";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Phone,
  ShieldCheck,
  Cpu,
} from "@/components/ui/Icons";

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
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO & VISION */}
      <section className="space-y-6">
        {/* Top bar: Portrait & Executive Operational Beacon */}
        <div className="flex items-center justify-between gap-4">
          <PortraitLightbox
            src={profile.avatar || "/rifat.jpg"}
            alt={`${profile.name} - Software Developer & Tech Entrepreneur`}
            name={profile.name}
            isBn={isBn}
          />

          <div className="flex flex-col items-end gap-2 text-right">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[11.5px] bg-surface/90 border border-border/90 text-muted shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="text-text font-medium text-[11.5px] tracking-tight">
                {isBn ? "ঢাকা · সক্রিয় আর্কিটেকচার ও উদ্ভাবন" : "Dhaka · Building Sovereign Systems"}
              </span>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-wider text-muted/70">
              Founder & System Architect
            </span>
          </div>
        </div>

        {/* Identity Headings */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-[40px] font-semibold text-text tracking-tight font-serif leading-tight text-balance">
            {profile.name}
          </h1>
          <p className="text-[16.5px] sm:text-[18px] text-muted font-normal leading-snug text-balance">
            {profile.tagline[loc]}
          </p>
        </div>

        {/* Executive Bio */}
        <p className="text-[16px] sm:text-[16.5px] text-text leading-[1.8] max-w-prose">
          {profile.bio[loc]}
        </p>

        {/* Founder Thesis / Core Manifesto Box */}
        {profile.thesis && (
          <div className="p-4 sm:p-5 rounded-xl bg-surface/80 border border-border/80 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-gold via-accent to-gold" />
            <p className="text-[14.5px] sm:text-[15.5px] text-text/90 italic font-serif leading-relaxed pl-1">
              &ldquo;{profile.thesis[loc]}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] uppercase font-mono tracking-wider text-muted/80 pl-1">
              <span className="text-gold font-medium">Core Thesis</span>
              <span>·</span>
              <span>Health Infrastructure for 170M+ People</span>
            </div>
          </div>
        )}

        {/* Quick Presence & Direct Connection */}
        <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-text hover:border-accent hover:text-accent shadow-soft transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-muted/70" />
            <span className="font-mono text-[12.5px]">{profile.email}</span>
          </a>

          <a
            href={`tel:${profile.phone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-text hover:border-accent hover:text-accent shadow-soft transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-muted/70" />
            <span className="font-mono text-[12.5px]">{profile.displayPhone}</span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-muted hover:text-text hover:border-text/30 shadow-soft transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-muted hover:text-text hover:border-text/30 shadow-soft transition-all"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* 2. VENTURES (SOVEREIGN PLATFORMS) */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted/60">01</span>
            <span className="text-border">/</span>
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
              {isBn ? "উদ্যোগ ও প্ল্যাটফর্মসমূহ" : "Ventures & Platforms"}
            </h2>
          </div>
          <span className="text-[11.5px] text-muted/60 font-mono">
            {ventures.length} {isBn ? "টি অবকাঠামো প্ল্যাটফর্ম" : "Sovereign Systems"}
          </span>
        </div>

        <div className="space-y-2.5">
          {ventures.map((venture) => (
            <div
              key={venture.slug}
              className="group relative -mx-3 sm:-mx-4 p-4 sm:p-4.5 rounded-xl bg-surface/50 hover:bg-surface hover:shadow-soft border border-border/60 hover:border-gold/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/ventures/${venture.slug}`}
                      className="font-medium text-[16.5px] text-text group-hover:text-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="font-serif">{venture.name[loc]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>

                    {/* Architecture tag */}
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-muted/70 bg-surface-subtle px-2 py-0.5 rounded border border-border/60">
                      {venture.slug === "sasthosathi"
                        ? "Sovereign Patient AI"
                        : "Clinical Management OS"}
                    </span>
                  </div>

                  <p className="text-muted text-[14.5px] leading-relaxed">
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
      </section>

      {/* 3. OPERATING PRINCIPLES (THE FOUNDER'S PHILOSOPHY) */}
      {profile.operatingPrinciples && (
        <section className="space-y-4 pt-10 border-t border-border/70">
          <div className="flex items-center gap-2 pb-1">
            <span className="font-mono text-[11px] text-muted/60">02</span>
            <span className="text-border">/</span>
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
              {isBn ? "কাজের দর্শন ও মূলনীতি" : "Operating Principles"}
            </h2>
          </div>

          <div className="space-y-3.5 pt-1">
            {profile.operatingPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-surface/40 border border-border/60 hover:bg-surface hover:border-border/80 transition-colors space-y-1"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[12px] text-gold font-bold">
                    {item.num}.
                  </span>
                  <h3 className="font-serif font-medium text-[15px] text-text">
                    {item.title[loc]}
                  </h3>
                </div>
                <p className="text-[14px] text-muted leading-relaxed pl-5">
                  {item.desc[loc]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. CAREER MILESTONES & JOURNEY */}
      {timeline && timeline.length > 0 && (
        <section className="space-y-4 pt-10 border-t border-border/70">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted/60">03</span>
              <span className="text-border">/</span>
              <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
                {isBn ? "ক্যারিয়ার জার্নি ও মাইলফলক" : "Journey & Career Milestones"}
              </h2>
            </div>
            <span className="text-[11.5px] text-muted/60 font-mono">
              {timeline.length} {isBn ? "টি অধ্যায়" : "Key Milestones"}
            </span>
          </div>

          <TimelineSection items={timeline} isBn={isBn} />
        </section>
      )}

      {/* 4. CONVICTIONS & INTERESTS */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">04</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "দূরদর্শিতা ও আগ্রহের বিষয়" : "Convictions & Focus Areas"}
          </h2>
        </div>

        <ul className="space-y-3 text-[15px] sm:text-[15.5px] text-text leading-relaxed">
          {profile.interests.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent/60 select-none text-[13px] mt-1 shrink-0">✦</span>
              <div>
                <strong className="font-medium text-text">{item.lead[loc]}</strong>{" "}
                <span className="text-muted">{item.desc[loc]}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. PASSIONS & PERSONAL PURSUITS */}
      {profile.passions && (
        <section className="space-y-4 pt-10 border-t border-border/70">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted/60">05</span>
              <span className="text-border">/</span>
              <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
                {isBn ? "প্যাশন ও ব্যক্তিগত অনুরাগ" : "Passions & Personal Pursuits"}
              </h2>
            </div>
            <span className="text-[11.5px] text-muted/60 font-mono">
              {profile.passions.length} {isBn ? "টি অনুরাগ" : "Pursuits"}
            </span>
          </div>

          <PassionsSection
            passions={profile.passions}
            books={books}
            locale={locale}
            isBn={isBn}
          />
        </section>
      )}

      {/* 6. ALSO (INSTITUTIONAL ROLES & VENTURES) */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">06</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "প্রাতিষ্ঠানিক দায়িত্ব ও ভূমিকা" : "Institutional Roles"}
          </h2>
        </div>

        <div className="space-y-2 text-[15px]">
          {profile.also.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1.5 px-3 -mx-3 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <div>
                <span className="font-medium text-text">{item.name}</span>
                <span className="text-muted ml-2 text-[14px]">{item.desc[loc]}</span>
              </div>
              <span className="text-[12px] font-mono text-muted/70 shrink-0">
                {item.role[loc]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NOW */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted/60">07</span>
            <span className="text-border">/</span>
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
              {isBn ? "বর্তমান রোডম্যাপ ও ব্যস্ততা" : "Active Focus"}
            </h2>
          </div>
          <span className="text-[12px] text-muted/70 font-mono">
            {isBn ? `আপডেট: ${profile.now.lastUpdated}` : `Updated: ${profile.now.lastUpdated}`}
          </span>
        </div>

        <ul className="space-y-3 text-[14.5px] sm:text-[15px] text-text leading-relaxed">
          {profile.now.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-gold/80 select-none text-[13px] mt-1 shrink-0">✦</span>
              <span className="text-text">{bullet[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. ELSEWHERE */}
      <section className="space-y-3 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">08</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "সরাসরি যোগাযোগের মাধ্যম" : "Direct Channels"}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-muted hover:text-text hover:border-text/40 shadow-soft transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-muted hover:text-text hover:border-text/40 shadow-soft transition-all"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-text hover:text-accent hover:border-accent shadow-soft transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-muted/70" />
            <span>Email</span>
          </a>

          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-text hover:text-live hover:border-live shadow-soft transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-live" />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
