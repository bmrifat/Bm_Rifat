import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";

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

  return (
    <article className="space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="text-xs text-muted hover:text-accent"
        >
          {isBn ? "← মূল পাতায় ফিরে যান" : "← Back to Home"}
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-border">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight">
            {venture.name[loc]}
          </h1>
          <StatusDot status={venture.status} text={venture.statusText[loc]} />
        </div>
        <p className="text-base text-muted">
          {venture.tagline[loc]}
        </p>
      </div>

      {/* Single Screenshot Placeholder (1 image max in v1, synthetic data) */}
      <div className="rounded-lg border border-border bg-border/20 p-8 sm:p-12 text-center text-xs text-muted font-mono">
        <div>[Screenshot: {venture.name.en} Preview with synthetic test data]</div>
        <div className="text-[11px] text-muted/70 mt-1">
          {isBn ? "গোপনীয়তা রক্ষা: সম্পূর্ণ কাল্পনিক টেস্ট ডেটা।" : "Zero real patient or doctor records are ever displayed."}
        </div>
      </div>

      {/* What it is */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "এটি কি" : "What it is"}
        </h2>
        <p className="text-base text-text leading-relaxed">
          {venture.whatItIs[loc]}
        </p>
      </section>

      {/* Why */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "কেন তৈরি (সমস্যা ও পটভূমি)" : "Why"}
        </h2>
        <p className="text-base text-text leading-relaxed">
          {venture.why[loc]}
        </p>
      </section>

      {/* What it does (Built features) */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "যা যা করতে পারে (Built features)" : "What it does"}
        </h2>
        <ul className="space-y-2 text-base text-text list-disc list-inside">
          {venture.whatItDoes[loc].map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Status & Roadmap */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "বর্তমান অবস্থা ও পরিকল্পনা" : "Status & Roadmap"}
        </h2>
        <p className="text-sm text-text">
          <span className="font-semibold">{isBn ? "বর্তমান:" : "Current:"}</span>{" "}
          <span className="text-muted">{venture.statusText[loc]}</span>
        </p>
        <p className="text-sm font-semibold text-text pt-1">
          {isBn ? "পরিকল্পিত ফিচারসমূহ (Planned):" : "Planned features:"}
        </p>
        <ul className="space-y-1 text-sm text-muted list-disc list-inside">
          {venture.plannedFeatures[loc].map((plan, idx) => (
            <li key={idx} className="leading-relaxed">
              {plan}
            </li>
          ))}
        </ul>
      </section>

      {/* Built with */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "ব্যবহৃত প্রযুক্তি" : "Built with"}
        </h2>
        <p className="text-sm font-mono text-muted leading-relaxed">
          {venture.builtWith}
        </p>
      </section>

      {/* Engineering notes */}
      <section className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "ইঞ্জিনিয়ারিং সিদ্ধান্ত ও নোট" : "Engineering notes"}
        </h2>
        <ul className="space-y-2 text-base text-text list-disc list-inside">
          {venture.engineeringNotes[loc].map((note, idx) => (
            <li key={idx} className="leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* Links */}
      <section className="space-y-2 pt-2">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "প্রয়োজনীয় লিংক" : "Links"}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 text-sm">
          {venture.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-accent hover:underline"
            >
              {link.label[loc]}
            </a>
          ))}
        </div>
      </section>

      {/* Medical Disclaimer */}
      <div className="pt-6 border-t border-border text-xs text-muted leading-relaxed">
        <em>
          {isBn
            ? "মেডিকেল ডিসক্লেইমার: স্বাস্থ্য সাথী ও ডকক্লিনিক হলো সফটওয়্যার সমাধান এবং এগুলো সরাসরি বিশেষজ্ঞ চিকিৎসকের বিকল্প নয়।"
            : "Medical disclaimer: ShasthoSathi and DocClinic are software tools and are not a substitute for professional clinical medical advice."}
        </em>
      </div>
    </article>
  );
}
