import React from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { Newspaper, Copy, Check, Download, Camera } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "প্রেস কিট — বিএম রিফাত" : "Press Kit — BM Rifat",
    description: isBn
      ? "মিডিয়া, সাংবাদিক ও কনফারেন্স আয়োজকদের জন্য অফিসিয়াল বায়ো, ব্র্যান্ড রিসোর্স ও তথ্য।"
      : "Official biographies, logos, and verified facts for conference organizers, journalists, and media.",
  };
}

export default async function PressPage({
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
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Newspaper className="w-3.5 h-3.5" />
            <span>{isBn ? "মিডিয়া ও প্রেস কিট" : "Media & Press Kit"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "প্রেস কিট ও ব্র্যান্ড রিসোর্স" : "Press Kit & Assets"}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {isBn
              ? "সম্মেলন আয়োজক, প্যানেল মডারেটর এবং সংবাদমাধ্যমের জন্য অফিসিয়াল বায়ো, হেডশট এবং যাচাইকৃত তথ্যের ভাণ্ডার।"
              : "Official biographies, approved photography guidelines, and verified company details for event hosts and media."}
          </p>
        </div>

        {/* 1. BIOGRAPHIES */}
        <div className="space-y-8 my-10">
          {/* Short Bio */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/70">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isBn ? "সংক্ষিপ্ত পরিচিতি (৫০ শব্দ)" : "Short Bio (50 words)"}
              </span>
              <span className="text-xs font-mono text-muted">Intro / Event Badge</span>
            </div>
            <p className="text-sm text-text leading-relaxed">
              {profile.shortBio[loc]}
            </p>
          </div>

          {/* Long Bio */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/70">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isBn ? "পূর্ণাঙ্গ পরিচিতি (১৫০ শব্দ)" : "Full Bio (150 words)"}
              </span>
              <span className="text-xs font-mono text-muted">Keynote / Program Booklet</span>
            </div>
            <p className="text-sm text-text leading-relaxed">
              {profile.longBio[loc]}
            </p>
          </div>
        </div>

        {/* 2. VERIFIED FACTS & SPELLING */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 my-10 space-y-6">
          <h2 className="text-xl font-display font-bold text-text">
            {isBn ? "যাচাইকৃত ব্র্যান্ড ও নাম বানান" : "Verified Identity & Nomenclature"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-elevated/50 border border-border/60">
              <div className="text-[11px] font-mono text-muted uppercase">Full Name</div>
              <div className="text-sm font-bold text-text mt-1">BM Rifat</div>
              <div className="text-[11px] text-muted">[TODO_CONFIRM_FULL_NAME]</div>
            </div>
            <div className="p-4 rounded-xl bg-elevated/50 border border-border/60">
              <div className="text-[11px] font-mono text-muted uppercase">Primary Venture 01</div>
              <div className="text-sm font-bold text-text mt-1">ShasthoSathi (স্বাস্থ্য সাথী)</div>
              <div className="text-[11px] text-muted">Founder & CEO</div>
            </div>
            <div className="p-4 rounded-xl bg-elevated/50 border border-border/60">
              <div className="text-[11px] font-mono text-muted uppercase">Primary Venture 02</div>
              <div className="text-sm font-bold text-text mt-1">DocClinic</div>
              <div className="text-[11px] text-muted">Co-Founder & System Architect</div>
            </div>
          </div>
        </div>

        {/* 3. HEADSHOTS & LOGOS PLACEHOLDER */}
        <div className="rounded-2xl border border-dashed border-border bg-elevated/30 p-8 sm:p-10 my-10 text-center space-y-3">
          <Camera className="w-8 h-8 text-muted mx-auto" />
          <h3 className="text-lg font-display font-bold text-text">
            {isBn ? "মিডিয়া সম্পদ ও হাই-রেজুলিউশন হেডশট" : "Approved Headshots & Venture Logos"}
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Official high-resolution print-ready headshots and venture SVGs will be provided here.
          </p>
          <div className="pt-2 text-xs font-mono text-primary">
            [TODO_PROVIDE_HEADSHOTS_AND_LOGOS_ZIP]
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
