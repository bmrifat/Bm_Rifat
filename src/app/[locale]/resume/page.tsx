import React from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { FileText, Download, Briefcase, GraduationCap, Award, Mail, Globe, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "জীবনবৃত্তান্ত (CV) — বিএম রিফাত" : "Resume / CV — BM Rifat",
    description: isBn
      ? "বিএম রিফাতের প্রাতিষ্ঠানিক জীবনবৃত্তান্ত ও সফটওয়্যার ইঞ্জিনিয়ারিং ক্যারিয়ার প্রোফাইল।"
      : "Curriculum Vitae of BM Rifat: Software Engineer & Healthcare Tech Founder.",
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Header with Download Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border/80 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>{isBn ? "প্রফেশনাল সিভি" : "Web CV"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-text tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-primary mt-1">
              {profile.title[loc]}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <a
              href="/rifat-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-fg text-xs font-bold hover:opacity-90 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isBn ? "পিডিএফ সিভি ডাউনলোড" : "Download PDF CV"}</span>
            </a>
            <span className="text-[10px] font-mono text-muted">
              [TODO_PROVIDE_PDF_CV: /public/rifat-cv.pdf]
            </span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-muted mb-12 py-3 px-4 rounded-xl bg-surface border border-border">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {profile.location[loc]}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            {profile.education.institution[loc]}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" />
            bmrifat.com
          </span>
        </div>

        {/* Executive Summary */}
        <div className="mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
            {isBn ? "সারাংশ" : "Executive Summary"}
          </h2>
          <p className="text-sm text-text leading-relaxed">
            {profile.longBio[loc]}
          </p>
        </div>

        {/* Experience & Ventures */}
        <div className="mb-12 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border/80">
            {isBn ? "অভিজ্ঞতা ও উদ্যোগসমূহ" : "Professional Experience & Ventures"}
          </h2>
          <div className="space-y-8">
            {timeline.filter(t => t.type === "venture" || t.type === "work").map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-text">
                    {item.title[loc]} — <span className="text-primary">{item.org[loc]}</span>
                  </h3>
                  <span className="text-xs font-mono text-muted">{item.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description[loc]}
                </p>
                {item.skills && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-elevated text-muted border border-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-12 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border/80">
            {isBn ? "প্রাতিষ্ঠানিক শিক্ষা" : "Education"}
          </h2>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base font-bold text-text">
                {profile.education.degree[loc]}
              </h3>
              <span className="text-xs font-mono text-muted">2022 – Present</span>
            </div>
            <p className="text-sm text-muted">
              {profile.education.institution[loc]} · {profile.education.status[loc]}
            </p>
          </div>
        </div>

        {/* Leadership & Community */}
        <div className="mb-12 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border/80">
            {isBn ? "নেতৃত্ব ও সাংগঠনিক ভূমিকা" : "Leadership & Community"}
          </h2>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base font-bold text-text">
                {profile.community.role[loc]} — <span className="text-primary">{profile.community.organization[loc]}</span>
              </h3>
              <span className="text-xs font-mono text-muted">2024 – Present</span>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Leading campus-wide public speaking workshops, student speech symposiums, and anchor mentoring.
            </p>
          </div>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border/80">
            {isBn ? "কারিগরি দক্ষতা" : "Technical Skills & Competencies"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-surface">
                <div className="text-xs font-bold text-text mb-2">
                  {cat.title[loc]}
                </div>
                <div className="text-xs text-muted leading-relaxed">
                  {cat.skills.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
