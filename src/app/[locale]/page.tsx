import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import { posts } from "@/data/posts";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Activity,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Users,
} from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  const featuredVentures = ventures.filter((v) => v.featured);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-border/60 overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary/10 via-sky-500/5 to-transparent blur-3xl -z-10 pointer-events-none"
        />

        <SectionContainer spaced={false}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Role chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold text-text shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile.roles[loc]}</span>
              </div>

              {/* Headline & Positioning */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-text leading-[1.15]">
                  {isBn ? (
                    <>
                      বাংলাদেশের জন্য <span className="text-primary">স্বাস্থ্যপ্রযুক্তি</span> গড়ছি
                    </>
                  ) : (
                    <>
                      Building healthcare technology for <span className="text-primary">Bangladesh</span>.
                    </>
                  )}
                </h1>
                <p className="text-lg sm:text-xl text-muted max-w-2xl font-normal leading-relaxed">
                  {profile.positioning[loc]}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/ventures"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-fg font-semibold text-sm hover:opacity-90 shadow-sm transition-all"
                >
                  {isBn ? "প্রকল্পসমূহ দেখুন" : "View ventures"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface text-text hover:bg-elevated font-semibold text-sm transition-all"
                >
                  {isBn ? "যোগাযোগ করুন" : "Contact me"}
                </Link>
              </div>

              {/* Venture Badge Row */}
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="font-medium text-text">Ventures:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-elevated border border-border/80">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  ShasthoSathi (স্বাস্থ্য সাথী)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-elevated border border-border/80">
                  <Layers className="w-3.5 h-3.5 text-sky-500" />
                  DocClinic
                </span>
              </div>
            </div>

            {/* Portrait placeholder */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border-2 border-border bg-gradient-to-br from-surface via-elevated to-surface/80 p-3 shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl mb-3">
                    BMR
                  </div>
                  <span className="font-display font-bold text-base text-text">
                    BM Rifat
                  </span>
                  <span className="text-xs text-muted mt-1 px-4">
                    {profile.title[loc]}
                  </span>
                  <div className="mt-3 px-2 py-0.5 rounded bg-elevated text-[11px] font-mono text-muted border border-border/60">
                    [TODO_PROVIDE_PORTRAIT]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* 2. CREDIBILITY STRIP */}
      <section className="py-8 bg-surface/70 border-b border-border/60">
        <SectionContainer spaced={false}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.credibilityPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-text leading-snug">
                  {point[loc]}
                </span>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 3. FEATURED VENTURES */}
      <SectionContainer>
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            {isBn ? "নির্বাচিত প্ল্যাটফর্ম" : "Core Systems"}
          </div>
          <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
            {isBn ? "স্বাস্থ্য সাথী ও ডকক্লিনিক" : "Featured Ventures"}
          </h2>
          <p className="text-muted text-base mt-2">
            {isBn
              ? "বাংলাদেশের রোগীদের জন্য বাংলা এআই স্বাস্থ্য প্ল্যাটফর্ম এবং চিকিৎসকদের জন্য আধুনিক ক্লিনিক ম্যানেজমেন্ট সিস্টেম।"
              : "Healthcare platforms built end-to-end: product architecture, security boundaries, and production code."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredVentures.map((venture) => (
            <Card key={venture.slug} hoverable className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-text">
                    {venture.name[loc]}
                  </h3>
                  <StatusBadge status={venture.status} />
                </div>

                <p className="text-sm text-primary font-medium">
                  {venture.tagline[loc]}
                </p>

                <p className="text-sm text-muted leading-relaxed">
                  {venture.problem[loc]}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {isBn ? "প্রধান কারিগরি বৈশিষ্ট্য" : "Capabilities"}
                  </span>
                  <ul className="space-y-2">
                    {venture.highlights[loc].slice(0, 3).map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs text-text flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {venture.stack.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-elevated text-muted border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  {isBn ? "কেস স্টাডি" : "Case Study"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* 4. HOW I BUILD (4 Principles) */}
      <section className="py-20 bg-elevated/40 border-y border-border/60">
        <SectionContainer spaced={false}>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              {isBn ? "নীতি ও দর্শন" : "Guiding Philosophy"}
            </div>
            <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
              {isBn ? "যেভাবে সিস্টেম তৈরি করি" : "How I Build"}
            </h2>
            <p className="text-muted text-base mt-2">
              {isBn
                ? "বাস্তবসম্মত ইঞ্জিনিয়ারিং, রোগীর ডেটার নিশ্ছিদ্র নিরাপত্তা এবং দেশীয় প্রেক্ষাপটে রচিত চারটি ভিত্তি।"
                : "Four concrete principles governing every architectural choice and line of code."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.principles.map((principle, idx) => (
              <div
                key={idx}
                className="rounded-card border border-border bg-surface p-6 flex flex-col justify-between shadow-sm hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display font-bold text-base text-text mb-2">
                    {principle.title[loc]}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {principle.description[loc]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 5. LEADERSHIP & COMMUNITY SNIPPET */}
      <SectionContainer>
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Users className="w-3.5 h-3.5" />
              <span>{profile.community.organization[loc]}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-text">
              {isBn
                ? "নেতৃত্ব ও প্রযুক্তিগত বক্তব্য"
                : "Organising Secretary, DIU CSE Speakers Club"}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {isBn
                ? "পাবলিক স্পিকিং কর্মশালা, ছাত্র বিতর্ক প্রতিযোগিতা এবং বিভিন্ন টেকনিক্যাল সেমিনারের আয়োজন ও পরিচালনা।"
                : "Championing technical communication, public speaking workshops, and anchoring symposiums for computer science undergraduates at Daffodil International University."}
            </p>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-elevated text-text hover:bg-border/60 text-xs font-semibold shrink-0 transition-colors"
          >
            {isBn ? "নেতৃত্বের বিবরণী" : "Explore Leadership"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </SectionContainer>

      {/* 6. LATEST WRITING */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-surface/40 border-t border-border/60">
          <SectionContainer spaced={false}>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  {isBn ? "প্রকৌশল নোট" : "Technical Writing"}
                </div>
                <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
                  {isBn ? "সাম্প্রতিক প্রবন্ধ ও গবেষণা" : "Latest Writing"}
                </h2>
              </div>
              <Link
                href="/writing"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                {isBn ? "সকল লেখা দেখুন" : "View all articles"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Card key={post.slug} hoverable className="flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h4 className="font-display font-bold text-base text-text leading-snug">
                      <Link href={`/writing/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title[loc]}
                      </Link>
                    </h4>

                    <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                      {post.summary[loc]}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/60">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      {isBn ? "বিস্তারিত পড়ুন" : "Read Article"}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      {/* 7. CLOSING CTA BANNER */}
      <section className="py-20 border-t border-border/60">
        <SectionContainer spaced={false}>
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-elevated p-8 md:p-14 text-center max-w-3xl mx-auto shadow-sm space-y-6">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-text tracking-tight">
              {isBn
                ? "বাংলাদেশে স্বাস্থ্য বা শিক্ষাপ্রযুক্তিতে কাজ করছেন? আসুন কথা বলি।"
                : "Building something in healthcare or tech in Bangladesh? Let's talk."}
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
              {isBn
                ? "কারিগরি পরামর্শ, ক্লিনিকাল সফটওয়্যার পার্টনারশিপ, স্পিকিং আমন্ত্রণ কিংবা সহযোগিতামূলক উদ্যোগের জন্য উন্মুক্ত।"
                : "Open to technical advising, healthcare clinic partnerships, speaking invitations, and senior engineering roles."}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-fg font-bold text-sm hover:opacity-90 shadow-md transition-all active:scale-[0.98]"
              >
                {isBn ? "যোগাযোগ শুরু করুন" : "Get in touch"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
