import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
    <article className="space-y-10 sm:space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-text transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "সকল উদ্যোগ" : "Ventures"}</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-2 pb-6 border-b border-border/80">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
            {venture.name[loc]}
          </h1>
          <StatusDot status={venture.status} text={venture.statusText[loc]} />
        </div>
        <p className="text-[15.5px] text-muted font-normal leading-relaxed">
          {venture.tagline[loc]}
        </p>
      </header>

      {/* Single Screenshot Placeholder (Synthetic data frame) */}
      <div className="rounded-xl border border-border/80 bg-surface-subtle/70 p-8 sm:p-12 text-center text-[13px] text-muted shadow-soft">
        <div className="font-medium text-text">
          {venture.name.en} — System Interface Preview
        </div>
        <div className="text-[11.5px] text-muted/80 mt-1 max-w-sm mx-auto">
          {isBn
            ? "গোপনীয়তা রক্ষা: সম্পূর্ণ কাল্পনিক টেস্ট ডেটা। কোনো রোগীর বাস্তব তথ্য ব্যবহৃত হয় না।"
            : "Synthetic test data only. Zero real patient or doctor records are ever presented."}
        </div>
      </div>

      {/* What it is */}
      <section className="space-y-2.5">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "এটি কি" : "What it is"}
        </h2>
        <p className="text-[15.5px] text-text leading-[1.8]">
          {venture.whatItIs[loc]}
        </p>
      </section>

      {/* Why */}
      <section className="space-y-2.5">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "কেন তৈরি (সমস্যা ও পটভূমি)" : "Why"}
        </h2>
        <p className="text-[15.5px] text-text leading-[1.8]">
          {venture.why[loc]}
        </p>
      </section>

      {/* What it does */}
      <section className="space-y-2.5">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "যা যা করতে পারে" : "What it does"}
        </h2>
        <ul className="space-y-2.5 text-[15.5px] text-text leading-relaxed">
          {venture.whatItDoes[loc].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-muted/60 select-none font-serif text-sm mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Status & Roadmap */}
      <section className="space-y-3">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "বর্তমান অবস্থা ও পরিকল্পনা" : "Status & Roadmap"}
        </h2>
        <p className="text-[15px] text-text">
          <span className="font-medium">{isBn ? "বর্তমান:" : "Current:"}</span>{" "}
          <span className="text-muted">{venture.statusText[loc]}</span>
        </p>
        <div className="pt-1 space-y-2">
          <div className="text-[14px] font-medium text-text">
            {isBn ? "পরিকল্পিত ফিচারসমূহ (Planned):" : "Planned roadmap:"}
          </div>
          <ul className="space-y-2 text-[14.5px] text-muted leading-relaxed">
            {venture.plannedFeatures[loc].map((plan, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-muted/60 select-none font-serif text-sm mt-0.5">—</span>
                <span>{plan}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Built with */}
      <section className="space-y-2.5">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "ব্যবহৃত প্রযুক্তি" : "Built with"}
        </h2>
        <p className="text-[14px] text-muted leading-relaxed font-mono">
          {venture.builtWith}
        </p>
      </section>

      {/* Engineering notes */}
      <section className="space-y-2.5">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "ইঞ্জিনিয়ারিং সিদ্ধান্ত ও নোট" : "Engineering notes"}
        </h2>
        <ul className="space-y-2.5 text-[15px] text-text leading-relaxed">
          {venture.engineeringNotes[loc].map((note, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-muted/60 select-none font-serif text-sm mt-0.5">—</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Links */}
      <section className="space-y-2.5 pt-2">
        <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold">
          {isBn ? "প্রয়োজনীয় লিংক" : "Links"}
        </h2>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14.5px]">
          {venture.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 text-text hover:text-accent underline underline-offset-4 decoration-border/80 hover:decoration-accent transition-colors"
            >
              <span>{link.label[loc]}</span>
              {link.isExternal && (
                <ArrowUpRight className="w-3.5 h-3.5 text-muted/60 inline-block -mt-0.5" />
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Medical Disclaimer */}
      <div className="pt-8 border-t border-border/70 text-[12.5px] text-muted/80 leading-relaxed italic">
        {isBn
          ? "মেডিকেল ডিসক্লেইমার: স্বাস্থ্য সাথী ও ডকক্লিনিক হলো সফটওয়্যার সমাধান এবং এগুলো সরাসরি বিশেষজ্ঞ চিকিৎসকের বিকল্প নয়।"
          : "Medical disclaimer: ShasthoSathi and DocClinic are software tools and are not a substitute for professional clinical medical advice."}
      </div>
    </article>
  );
}
