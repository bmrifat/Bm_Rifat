import React from "react";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Phone,
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
    <div className="space-y-12 sm:space-y-14 pb-12">
      {/* 1. HERO & BIO */}
      <section className="space-y-6">
        {/* Avatar & Availability Badge */}
        <div className="flex items-center justify-between">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-surface via-surface-subtle to-surface border border-border p-1 shadow-soft flex items-center justify-center transition-transform group-hover:scale-[1.02] overflow-hidden">
              <Image
                src={profile.avatar || "/rifat.jpg"}
                alt={profile.name}
                width={96}
                height={96}
                priority
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] bg-surface border border-border/80 text-muted shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
            </span>
            <span className="text-text font-medium text-[11.5px]">
              {isBn ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
            </span>
          </div>
        </div>

        {/* Identity Headings */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-[32px] font-semibold text-text tracking-tight">
            {profile.name}
          </h1>
          <p className="text-[15.5px] text-muted font-normal">
            {profile.tagline[loc]}
          </p>
        </div>

        {/* Bio */}
        <p className="text-[16px] text-text leading-[1.8] max-w-prose">
          {profile.bio[loc]}
        </p>

        {/* Quick Presence Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-text hover:border-accent hover:text-accent shadow-soft transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-muted/70" />
            <span className="font-mono text-[12.5px]">{profile.email}</span>
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

      {/* 2. VENTURES SECTION */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted/60">01</span>
            <span className="text-border">/</span>
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
              {isBn ? "উদ্যোগসমূহ" : "Ventures"}
            </h2>
          </div>
          <span className="text-[11.5px] text-muted/60 font-mono">
            {ventures.length} {isBn ? "টি উদ্যোগ" : "systems"}
          </span>
        </div>

        <div className="space-y-2">
          {ventures.map((venture) => (
            <div
              key={venture.slug}
              className="group relative -mx-3 sm:-mx-4 p-3.5 sm:p-4 rounded-xl hover:bg-surface/90 hover:shadow-soft border border-transparent hover:border-border/70 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4">
                <div className="space-y-1">
                  <Link
                    href={`/ventures/${venture.slug}`}
                    className="font-medium text-[16px] text-text group-hover:text-accent transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{venture.name[loc]}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                  <p className="text-muted text-[14px] leading-relaxed">
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

      {/* 3. THINGS I'M INTERESTED IN */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">02</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "আগ্রহের বিষয়সমূহ" : "Things I'm interested in"}
          </h2>
        </div>

        <ul className="space-y-3.5 text-[15.5px] text-text leading-relaxed">
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

      {/* 4. ALSO (OTHER ACTIVITIES) */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">03</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "অন্যান্য কার্যক্রম" : "Also"}
          </h2>
        </div>

        <div className="space-y-2.5 text-[15px]">
          {profile.also.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1 px-3 -mx-3 rounded-lg hover:bg-surface/50 transition-colors"
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

      {/* 5. NOW */}
      <section className="space-y-4 pt-10 border-t border-border/70">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted/60">04</span>
            <span className="text-border">/</span>
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
              {isBn ? "বর্তমান ব্যস্ততা" : "Now"}
            </h2>
          </div>
          <span className="text-[12px] text-muted/70 font-mono">
            {isBn ? `আপডেট: ${profile.now.lastUpdated}` : `Updated: ${profile.now.lastUpdated}`}
          </span>
        </div>

        <ul className="space-y-3 text-[15px] text-text leading-relaxed">
          {profile.now.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent/60 select-none text-[13px] mt-1 shrink-0">✦</span>
              <span className="text-text">{bullet[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. ELSEWHERE */}
      <section className="space-y-3 pt-10 border-t border-border/70">
        <div className="flex items-center gap-2 pb-1">
          <span className="font-mono text-[11px] text-muted/60">05</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "অন্যান্য মাধ্যম" : "Elsewhere"}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-muted hover:text-text hover:border-text/40 shadow-soft transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-muted hover:text-text hover:border-text/40 shadow-soft transition-all"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-text hover:text-accent hover:border-accent shadow-soft transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-muted/70" />
            <span>Email</span>
          </a>

          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-text hover:text-live hover:border-live shadow-soft transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-live" />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
