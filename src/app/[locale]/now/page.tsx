import React from "react";
import { setRequestLocale } from "next-intl/server";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Clock, CheckCircle2, BookOpen, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "বর্তমান কাজ (Now) — বিএম রিফাত" : "What I'm Doing Now — BM Rifat",
    description: isBn
      ? "বিএম রিফাত বর্তমানে কি নিয়ে কাজ করছেন, পড়াশোনা ও সক্রিয় প্রজেক্ট।"
      : "A public log of current priorities, engineering milestones, and books by BM Rifat.",
  };
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";

  const currentFocus = [
    {
      en: "Scaling ShasthoSathi's multi-model AI fallback cascade and fine-tuning clinical concordance for Bengali speech output.",
      bn: "স্বাস্থ্য সাথীর মাল্টি-মডেল এআই ফলব্যাক ক্যাসকেড স্কেলিং এবং বাংলা অডিও সিন্থেসিসের নির্ভুলতা বৃদ্ধি।",
    },
    {
      en: "Finalizing the Prescription Desk OCR & patient appointment serial locking mechanism in DocClinic.",
      bn: "ডকক্লিনিকে প্রেসক্রিপশন ডেস্ক ওসিআর এবং কনকারেন্সি-সেফ সিরিয়াল লকিং মেকানিজম সম্পন্ন করা।",
    },
    {
      en: "Organizing the upcoming flagship speaking and debate showcase at DIU CSE Speakers Club.",
      bn: "ডিআইইউ সিএসই স্পিকার্স ক্লাবের আসন্ন ফ্ল্যাগশিপ পাবলিক স্পিকিং টুর্নামেন্ট আয়োজন।",
    },
    {
      en: "Undergraduate coursework in Software Architecture & Distributed Systems at Daffodil International University.",
      bn: "ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটিতে সফটওয়্যার আর্কিটেকচার ও ডিস্ট্রিবিউটেড সিস্টেমস অধ্যয়ন।",
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Now Page</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "বর্তমানে যেসব বিষয়ে কাজ করছি" : "What I'm Doing Now"}
          </h1>
          <p className="text-base text-muted">
            {isBn
              ? "এটি ডেরেক সিভার্সের 'Now Page' আন্দোলন দ্বারা অনুপ্রাণিত একটি পাবলিক লগ। বর্তমানে আমার মনোযোগ যেখানে নিবদ্ধ।"
              : "Inspired by Derek Sivers' now-page movement. A public log of my current priorities, active software builds, and focus areas."}
          </p>
          <div className="text-xs font-mono text-muted/80 pt-1">
            {isBn ? "সর্বশেষ আপডেট: নভেম্বর ২০২৪" : "Last updated: November 2024"}
          </div>
        </div>

        {/* Current Priorities List */}
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 max-w-3xl space-y-6 shadow-sm">
          <h2 className="text-xl font-display font-bold text-text">
            {isBn ? "সক্রিয় অগ্রাধিকারসমূহ" : "Current Active Focus"}
          </h2>
          <ul className="space-y-4">
            {currentFocus.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-text leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{isBn ? item.bn : item.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </div>
  );
}
