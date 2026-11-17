import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  AlertTriangle,
} from "lucide-react";

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

export default async function VentureDetailPage({
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

  return (
    <article className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/ventures"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? "সকল প্রকল্পে ফিরে যান" : "Back to all ventures"}</span>
          </Link>
        </div>

        {/* 1. HERO */}
        <header className="max-w-3xl space-y-6 pb-12 border-b border-border/80">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={venture.status} />
            <span className="text-xs font-mono text-muted">
              {venture.period}
            </span>
            <span className="text-muted/40">·</span>
            <span className="text-xs font-semibold text-primary">
              {venture.role[loc]}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-text tracking-tight">
            {venture.name[loc]}
          </h1>

          <p className="text-xl text-muted leading-relaxed font-normal">
            {venture.tagline[loc]}
          </p>

          {/* Action Links */}
          {venture.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {venture.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-fg text-xs font-bold hover:opacity-90 shadow-sm transition-all"
                >
                  <span>{link.label[loc]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Synthetic Data Alert Banner */}
        <div className="my-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {isBn
              ? "গোপনীয়তা নীতি: পোর্টফোলিও এবং ডেমোতে প্রদর্শিত সমস্ত রোগীর স্ক্রিনশট ও রেকর্ড সম্পূর্ণ কাল্পনিক ও টেস্ট ডেটা।"
              : "Privacy Guarantee: All screenshots, case walkthroughs, and preview metrics use strictly synthetic test data. Zero real patient or doctor records are ever presented."}
          </span>
        </div>

        {/* 2. PROBLEM & WHO IT'S FOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
          <div className="rounded-2xl border border-border bg-surface p-7 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              {isBn ? "সমস্যা ও পটভূমি" : "The Clinical Problem"}
            </div>
            <h3 className="font-display font-bold text-xl text-text">
              {isBn ? "রোগী ও স্বাস্থ্যকর্মীদের সংকট" : "The Core Bottleneck"}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {venture.problem[loc]}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              {isBn ? "কাদের জন্য তৈরি" : "Target Audience"}
            </div>
            <h3 className="font-display font-bold text-xl text-text">
              {isBn ? "ব্যবহারকারী ও সুবিধাপ্রাপ্ত ব্যক্তিগণ" : "Who This Serves"}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {venture.audience[loc]}
            </p>
          </div>
        </div>

        {/* 3. SOLUTION */}
        <section className="my-14 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            {isBn ? "সমাধান কাঠামো" : "The Architecture Solution"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text">
            {isBn ? "কিভাবে সিস্টেমটি কাজ করে" : "Engineered Approach"}
          </h2>
          <p className="text-base text-muted max-w-3xl leading-relaxed">
            {venture.solution[loc]}
          </p>
        </section>

        {/* 4. ARCHITECTURE TOPOLOGY DIAGRAM */}
        {(venture.slug === "shasthosathi" || venture.slug === "docclinic") && (
          <section className="my-14">
            <ArchitectureDiagram type={venture.slug} />
          </section>
        )}

        {/* 5. KEY ENGINEERING HIGHLIGHTS */}
        <section className="my-14 space-y-6">
          <h2 className="text-2xl font-display font-bold text-text">
            {isBn ? "প্রধান ইঞ্জিনিয়ারিং বৈশিষ্ট্যসমূহ" : "Key Engineering Highlights"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venture.highlights[loc].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-border bg-surface flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-sm text-text leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TECH STACK */}
        <section className="my-14 space-y-4">
          <h2 className="text-2xl font-display font-bold text-text">
            {isBn ? "ব্যবহৃত প্রযুক্তি স্ট্যাক" : "Production Stack"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {venture.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-elevated border border-border text-text shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 7. SECURITY & PRIVACY */}
        <section className="my-14 rounded-2xl border border-border bg-surface p-7 sm:p-9 space-y-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-display font-bold text-text">
              {isBn ? "নিরাপত্তা ও রোগীর ডেটার সুরক্ষা" : "Security & Privacy Architecture"}
            </h2>
          </div>
          <ul className="space-y-3">
            {venture.security[loc].map((sec, idx) => (
              <li key={idx} className="text-sm text-muted flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. ROADMAP */}
        {venture.roadmap && venture.roadmap[loc].length > 0 && (
          <section className="my-14 space-y-5">
            <h2 className="text-2xl font-display font-bold text-text">
              {isBn ? "ভবিষ্যত রোডম্যাপ (Planned)" : "Next Milestone Roadmap (Planned)"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venture.roadmap[loc].map((plan, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-dashed border-border bg-elevated/40 flex items-start gap-3"
                >
                  <span className="text-xs font-mono text-primary font-bold shrink-0 mt-0.5">
                    [P-0{idx + 1}]
                  </span>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. LESSONS & TRADE-OFFS */}
        {venture.lessons && venture.lessons[loc].length > 0 && (
          <section className="my-14 space-y-4">
            <h2 className="text-2xl font-display font-bold text-text">
              {isBn ? "শিক্ষা ও টেকনিক্যাল ট্রেড-অফ" : "Architectural Lessons & Trade-offs"}
            </h2>
            <ul className="space-y-3">
              {venture.lessons[loc].map((lesson, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl border border-border bg-surface text-sm text-muted leading-relaxed flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CLOSING CTA */}
        <div className="mt-16 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-text">
              {isBn
                ? "এই সিস্টেম নিয়ে বিস্তারিত আলোচনা করতে চান?"
                : "Interested in discussing this architecture or requesting a walkthrough?"}
            </h4>
            <p className="text-xs text-muted mt-1">
              {isBn
                ? "ক্লিনিক পার্টনারশিপ, কারিগরি পরামর্শ কিংবা স্পিকিং এর জন্য যোগাযোগ করুন।"
                : "Open to clinic pilot partners, technical advising, and technical deep-dives."}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-primary-fg text-xs font-bold hover:opacity-90 shadow-sm transition-all"
          >
            <span>{isBn ? "যোগাযোগ করুন" : "Get in touch"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </SectionContainer>
    </article>
  );
}
