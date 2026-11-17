import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { Award, Mic, Users, Calendar, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "নেতৃত্ব ও বক্তব্য — বিএম রিফাত" : "Leadership & Speaking — BM Rifat",
    description: isBn
      ? "ডিআইইউ সিএসই স্পিকার্স ক্লাবের সাংগঠনিক সম্পাদক হিসেবে কার্যক্রম, ইভেন্ট পরিচালনা এবং স্পিকিং বিষয়সমূহ।"
      : "Organising Secretary at DIU CSE Speakers Club, speaking topics, campus leadership, and symposium organizing.",
  };
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  const speakingTopics = [
    {
      title: {
        en: "Engineering Reliable Healthcare Systems in Developing Markets",
        bn: "উন্নয়নশীল দেশের প্রেক্ষাপটে টেকসই স্বাস্থ্যপ্রযুক্তি ইঞ্জিনিয়ারিং",
      },
      desc: {
        en: "Lessons from ShasthoSathi & DocClinic: fallback cascades, linguistic nuance in Bengali NLP, and medical safety guardrails.",
        bn: "স্বাস্থ্য সাথী ও ডকক্লিনিকের অভিজ্ঞতা: ফলব্যাক ক্যাসকেড, বাংলা এনএলপি এবং চিকিৎসা নিরাপত্তা বিধি।",
      },
    },
    {
      title: {
        en: "Student to Healthtech Founder: Turning Classroom Theory into Real Software",
        bn: "শিক্ষার্থী থেকে স্বাস্থ্যপ্রযুক্তি উদ্যোক্তা: প্রাতিষ্ঠানিক জ্ঞানকে বাস্তব সফটওয়্যারে রূপান্তর",
      },
      desc: {
        en: "How undergraduate computer science students can identify deep infrastructural problems in Bangladesh and ship production-grade software.",
        bn: "সিএসই শিক্ষার্থীরা কিভাবে স্থানীয় সমস্যা চিহ্নিত করে স্বাবলম্বী সফটওয়্যার সমাধান নির্মাণ করতে পারে।",
      },
    },
    {
      title: {
        en: "Technical Communication: The Core Multiplier for Engineers",
        bn: "টেকনিক্যাল কমিউনিকেশন: একজন ইঞ্জিনিয়ারের সবচেয়ে বড় শক্তি",
      },
      desc: {
        en: "Why writing architectural RFCs, presenting trade-offs, and public speaking separate senior engineers from code monkeys.",
        bn: "আর্কিটেকচারাল সিদ্ধান্ত তুলে ধরা, বিতর্ক এবং কার্যকর যোগাযোগ কিভাবে প্রকৌশলীদের ক্যারিয়ার সমৃদ্ধ করে।",
      },
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>{isBn ? "কমিউনিটি ও পাবলিক স্পিকিং" : "Leadership & Voice"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
            {isBn ? "নেতৃত্ব ও পাবলিক স্পিকিং" : "Leadership & Public Speaking"}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {isBn
              ? "ডিআইইউ সিএসই স্পিকার্স ক্লাবের সাংগঠনিক সম্পাদক হিসেবে কার্যক্রম, ইভেন্ট পরিচালনা এবং স্পিকিং বিষয়সমূহ।"
              : "Directing public speaking initiatives, speech competitions, and anchoring large-scale technical symposiums."}
          </p>
        </div>

        {/* 1. DIU CSE SPEAKERS CLUB DEEP-DIVE */}
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 mb-14 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
            <div>
              <span className="text-xs font-mono text-primary font-bold">
                {profile.community.role[loc]}
              </span>
              <h2 className="text-2xl font-display font-bold text-text mt-1">
                {profile.community.organization[loc]}
              </h2>
            </div>
            <div className="text-xs font-mono text-muted bg-elevated px-3 py-1.5 rounded-md border border-border/60">
              Daffodil International University
            </div>
          </div>

          <p className="text-base text-muted leading-relaxed">
            {isBn
              ? "ডিআইইউ সিএসই স্পিকার্স ক্লাবের সাংগঠনিক সম্পাদক হিসেবে বিশ্ববিদ্যালয়ের শত শত কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং শিক্ষার্থীর যোগাযোগ দক্ষতা, বিতর্ক এবং প্রযুক্তি উপস্থাপন কৌশল বিকাশে নেতৃত্ব প্রদান করছি।"
              : "As Organising Secretary of the DIU CSE Speakers Club, I lead initiatives that empower hundreds of computer science students to master public speaking, impromptu argumentation, technical presentation, and professional anchoring."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { en: "Public Speaking & Keynotes", bn: "পাবলিক স্পিকিং ও কি-নোট" },
              { en: "Event & Stage Direction", bn: "মঞ্চ ও ইভেন্ট নির্দেশনা" },
              { en: "Debate & Argumentation", bn: "বিতর্ক ও বিশ্লেষণ" },
              { en: "Student Mentorship", bn: "শিক্ষার্থীদের মেন্টরিং" },
            ].map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-3.5 rounded-xl border border-border/70 bg-elevated/50 text-xs font-semibold text-text flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{skill[loc]}</span>
              </div>
            ))}
          </div>

          {/* Events Organised List */}
          <div className="pt-4 border-t border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                {isBn ? "আয়োজিত ইভেন্ট ও কর্মশালা" : "Key Events & Workshops Organised"}
              </h3>
              <span className="text-xs font-mono text-muted">[TODO_PROVIDE_SPEAKERS_CLUB_EVENTS_LIST]</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                <span>
                  <strong>Annual DIU CSE Public Speaking Showcase:</strong> University-wide tournament training students in impromptu and structured speeches.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                <span>
                  <strong>Technical Presentation Masterclass:</strong> Practical sessions teaching engineers how to communicate system trade-offs cleanly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                <span>
                  <strong>Anchor Grooming & Stage Presence Bootcamp:</strong> Intensive training for student moderators and hosts.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. SPEAKING TOPICS */}
        <section className="my-14 space-y-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {isBn ? "আলোচনার ক্ষেত্র" : "Knowledge Sharing"}
            </div>
            <h2 className="text-3xl font-display font-extrabold text-text tracking-tight">
              {isBn ? "যেসব বিষয়ে কথা বলি ও সেশন নিই" : "Speaking Topics & Workshops"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakingTopics.map((topic, idx) => (
              <Card key={idx} className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-base text-text mb-2 leading-snug">
                    {topic.title[loc]}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {topic.desc[loc]}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/60 text-[11px] font-mono text-primary">
                  Keynote / Workshop Ready
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. INVITE CTA */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-elevated p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-sm my-14">
          <Mic className="w-8 h-8 text-primary mx-auto" />
          <h3 className="text-2xl font-display font-bold text-text">
            {isBn ? "স্পিকার হিসেবে আমন্ত্রণ জানান" : "Invite Me to Speak"}
          </h3>
          <p className="text-sm text-muted leading-relaxed max-w-lg mx-auto">
            {isBn
              ? "বিশ্ববিদ্যালয় সেমিনার, স্বাস্থ্যপ্রযুক্তি প্যানেল কিংবা সফটওয়্যার আর্কিটেকচার ওয়ার্কশপের জন্য আমন্ত্রণ জানাতে পারেন।"
              : "Available for university technical symposiums, developer panels, healthtech conferences, and speaking workshops."}
          </p>
          <div className="pt-2">
            <Link
              href="/contact?intent=speaking"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-fg text-xs font-bold hover:opacity-90 shadow-sm transition-all"
            >
              <span>{isBn ? "বক্তব্যের অনুরোধ পাঠান" : "Request Speaking Engagement"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
