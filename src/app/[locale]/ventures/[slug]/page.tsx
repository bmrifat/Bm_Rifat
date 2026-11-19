import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Cpu, Code2 } from "@/components/ui/Icons";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ["en", "bn"];

  for (const locale of locales) {
    for (const venture of ventures) {
      params.push({ locale, slug: venture.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const venture = ventures.find((v) => v.slug === slug);
  if (!venture) return {};

  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return {
    title: `${venture.name[loc]} — Case Study`,
    description: venture.tagline[loc],
  };
}

export default async function VentureCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const venture = ventures.find((v) => v.slug === slug);
  if (!venture) {
    notFound();
  }

  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  const stackArray = venture.builtWith.split(",").map((s) => s.trim());

  return (
    <article className="space-y-10 sm:space-y-12 pb-14">
      {/* Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border/80 text-muted hover:text-text shadow-soft transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "সকল উদ্যোগ" : "Ventures"}</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-3 pb-6 border-b border-border/70">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-2xl sm:text-[30px] font-semibold text-text tracking-tight">
            {venture.name[loc]}
          </h1>
          <StatusDot status={venture.status} text={venture.statusText[loc]} asPill />
        </div>
        <p className="text-[16px] text-muted font-normal leading-relaxed max-w-prose">
          {venture.tagline[loc]}
        </p>
      </header>

      {/* Elegant Window Frame for System Interface */}
      <div className="rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-surface-subtle/50 text-[11px] font-mono text-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[11px] text-muted/70 truncate max-w-[200px]">
            {venture.slug}.app / system-preview
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted/50">
            Synthetic
          </span>
        </div>

        {/* Screenshot / Interface Canvas */}
        <div className="p-8 sm:p-14 text-center space-y-2 bg-gradient-to-b from-surface via-surface-subtle/30 to-surface">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto">
            <Cpu className="w-6 h-6" />
          </div>
          <div className="text-[14px] font-medium text-text pt-2">
            {venture.name.en} — System Architecture & Interface
          </div>
          <p className="text-[12px] text-muted/80 max-w-sm mx-auto leading-relaxed">
            {isBn
              ? "গোপনীয়তা রক্ষা: সম্পূর্ণ কাল্পনিক ও টেস্ট ডেটা দ্বারা গঠিত।"
              : "Interface preview using synthetic test data. Zero real clinical records exposed."}
          </p>
        </div>
      </div>

      {/* 01 / WHAT IT IS */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">01</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "এটি কি" : "What it is"}
          </h2>
        </div>
        <p className="text-[15.5px] text-text leading-[1.8] max-w-prose">
          {venture.whatItIs[loc]}
        </p>
      </section>

      {/* 02 / WHY */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">02</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "কেন তৈরি (সমস্যা ও পটভূমি)" : "The Problem in Bangladesh"}
          </h2>
        </div>
        <p className="text-[15.5px] text-text leading-[1.8] max-w-prose">
          {venture.why[loc]}
        </p>
      </section>

      {/* 03 / WHAT IT DOES */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">03</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "যা যা করতে পারে" : "Built Capabilities"}
          </h2>
        </div>
        <ul className="space-y-3 text-[15.5px] text-text leading-relaxed">
          {venture.whatItDoes[loc].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent/60 select-none text-[13px] mt-1 shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 / STATUS & ROADMAP */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">04</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "বর্তমান অবস্থা ও পরিকল্পনা" : "Status & Roadmap"}
          </h2>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border/70 space-y-3 shadow-soft">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="font-medium text-text">{isBn ? "বর্তমান অবস্থা:" : "Current Stage:"}</span>
            <StatusDot status={venture.status} text={venture.statusText[loc]} asPill />
          </div>

          <div className="pt-2 border-t border-border/60 space-y-2">
            <span className="text-[12.5px] font-medium text-text block">
              {isBn ? "পরিকল্পিত ফিচারসমূহ (Planned):" : "Planned milestones:"}
            </span>
            <ul className="space-y-1.5 text-[14px] text-muted leading-relaxed">
              {venture.plannedFeatures[loc].map((plan, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-muted/60 font-mono text-[11px] mt-0.5">•</span>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 / BUILT WITH */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">05</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "ব্যবহৃত প্রযুক্তি" : "Built With"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {stackArray.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-surface border border-border/80 text-[12px] font-mono text-text shadow-soft"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* 06 / ENGINEERING NOTES */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">06</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "ইঞ্জিনিয়ারিং সিদ্ধান্ত ও নোট" : "Engineering Decisions & Trade-offs"}
          </h2>
        </div>
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 space-y-3 shadow-soft">
          {venture.engineeringNotes[loc].map((note, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-[14.5px] text-text leading-relaxed">
              <span className="text-accent font-mono text-[12px] mt-0.5 shrink-0">
                0{idx + 1}.
              </span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 07 / LINKS */}
      <section className="space-y-2.5 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">07</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "প্রয়োজনীয় লিংক" : "Links & Access"}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {venture.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-medium text-text hover:text-accent hover:border-accent shadow-soft transition-all"
            >
              <span>{link.label[loc]}</span>
              {link.isExternal && (
                <ArrowUpRight className="w-3.5 h-3.5 text-muted/60 -mt-0.5" />
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Medical Disclaimer */}
      <div className="pt-8 border-t border-border/70 text-[12.5px] text-muted/80 leading-relaxed italic flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-muted/60 shrink-0 mt-0.5" />
        <span>
          {isBn
            ? "মেডিকেল ডিসক্লেইমার: স্বাস্থ্য সাথী ও ডকক্লিনিক হলো সফটওয়্যার সমাধান এবং এগুলো সরাসরি বিশেষজ্ঞ চিকিৎসকের বিকল্প নয়।"
            : "Medical disclaimer: ShasthoSathi and DocClinic are software tools and are not a substitute for professional clinical medical advice."}
        </span>
      </div>
    </article>
  );
}
