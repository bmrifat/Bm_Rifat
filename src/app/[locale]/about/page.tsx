import React from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { TimelineVisualizer } from "@/components/ui/TimelineVisualizer";
import { SkillGrid } from "@/components/ui/SkillGrid";
import { Card } from "@/components/ui/Card";
import { Heart, Sparkles, User, Image as ImageIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "পরিচিতি — বিএম রিফাত" : "About — BM Rifat",
    description: isBn
      ? "বিএম রিফাত সম্পর্কে: বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি নির্মাতা, শিক্ষাগত পটভূমি এবং মূল দৃষ্টিভঙ্গি।"
      : "About BM Rifat: Software engineer, healthcare technology builder, and entrepreneur in Dhaka, Bangladesh.",
  };
}

export default async function AboutPage({
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
        {/* Page Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <User className="w-3.5 h-3.5" />
            <span>{isBn ? "পরিচিতি ও দর্শন" : "Biography & Mission"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "বিএম রিফাত সম্পর্কে" : "About BM Rifat"}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {profile.longBio[loc]}
          </p>
        </div>

        {/* 1. WHY HEALTHCARE TECH IN BANGLADESH (Story-Led) */}
        <div className="rounded-2xl border border-primary/20 bg-surface p-8 sm:p-10 my-12 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-primary/20" />
            <span>{isBn ? "ব্যক্তিগত উদ্দেশ্য ও লক্ষ্য" : "Core Motivation"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text">
            {isBn
              ? "কেন বাংলাদেশে স্বাস্থ্যপ্রযুক্তি নির্মাণ?"
              : "Why Healthcare Technology in Bangladesh"}
          </h2>
          <p className="text-base text-muted leading-relaxed font-normal">
            {profile.personalMotivation[loc]}
          </p>
          <div className="pt-2 text-xs font-mono text-muted/70">
            [TODO_CONFIRM_PERSONAL_MOTIVATION_PARAGRAPH]
          </div>
        </div>

        {/* 2. PHOTO GALLERY PLACEHOLDERS (3 images max per spec) */}
        <section className="my-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-xl text-text">
              {isBn ? "ছবি গ্যালারি" : "Photo Gallery"}
            </h3>
            <span className="text-xs font-mono text-muted">[TODO_PROVIDE_3_PHOTOS]</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 rounded-2xl border border-dashed border-border bg-elevated/40 flex flex-col items-center justify-center p-4 text-center text-muted"
              >
                <ImageIcon className="w-8 h-8 text-muted/50 mb-2" />
                <span className="text-xs font-semibold text-text">
                  Photo Placeholder {item}
                </span>
                <span className="text-[11px] font-mono text-muted mt-1">
                  Speaking / Campus / Workshop
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. TIMELINE (Student → Builder → Founder) */}
        <section className="my-16">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {isBn ? "ক্যারিয়ার পথচলা" : "Journey & Progression"}
            </div>
            <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
              {isBn ? "মাইলফলক ও সময়রেখা" : "Timeline: Student → Builder → Founder"}
            </h2>
          </div>
          <TimelineVisualizer items={timeline} />
        </section>

        {/* 4. SKILLS GROUPED */}
        <section className="my-16">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {isBn ? "দক্ষতা ও দক্ষতা ক্ষেত্র" : "Capabilities"}
            </div>
            <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
              {isBn ? "প্রযুক্তি ও ব্যবস্থাপনা দক্ষতা" : "Core Engineering & Leadership Skills"}
            </h2>
          </div>
          <SkillGrid categories={skillCategories} />
        </section>

        {/* 5. VALUES */}
        <section className="my-16">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {isBn ? "মূল দর্শন" : "Core Values"}
            </div>
            <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
              {isBn ? "যে নীতিতে বিশ্বাসী" : "How I Think & Operate"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.principles.map((pr, idx) => (
              <Card key={idx} className="space-y-2">
                <h4 className="font-display font-bold text-base text-text">
                  {pr.title[loc]}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {pr.description[loc]}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </SectionContainer>
    </div>
  );
}
