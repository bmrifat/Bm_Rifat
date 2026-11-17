import React from "react";
import { setRequestLocale } from "next-intl/server";
import { socials } from "@/data/socials";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ContactForm } from "@/components/ui/ContactForm";
import { Card } from "@/components/ui/Card";
import { Mail, MessageCircle, Clock, ShieldCheck, MapPin, Github, Linkedin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: isBn ? "যোগাযোগ — বিএম রিফাত" : "Contact — BM Rifat",
    description: isBn
      ? "বিএম রিফাতের সাথে সরাসরি যোগাযোগ: স্বাস্থ্য সফটওয়্যার ডেমো, প্রযুক্তিগত পরামর্শ ও পার্টনারশিপ।"
      : "Get in touch with BM Rifat for healthcare platform demos, partnership inquiries, and engineering consulting.",
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ intent?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  setRequestLocale(locale);
  const isBn = locale === "bn";

  return (
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Mail className="w-3.5 h-3.5" />
                <span>{isBn ? "যোগাযোগের মাধ্যম" : "Direct Channels"}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-text">
                {isBn ? "একসাথে কথা বলি" : "Let's Talk"}
              </h1>
              <p className="text-base text-muted leading-relaxed">
                {isBn
                  ? "স্বাস্থ্যপ্রযুক্তি তৈরি, ক্লিনিক ম্যানেজমেন্ট সিস্টেমের ডেমো কিংবা কারিগরি পরামর্শের জন্য যোগাযোগ করতে পারেন।"
                  : "Whether you are exploring healthcare software solutions, seeking a technical advisor, or proposing a speaking engagement, I would love to connect."}
              </p>
            </div>

            {/* Response Time & Location */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-muted">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>
                  {isBn
                    ? "গড় রেসপন্স সময়: ২৪ থেকে ৪৮ ঘণ্টার মধ্যে।"
                    : "Average turnaround: 24–48 hours"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Dhaka, Bangladesh (GMT+6)</span>
              </div>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">Email</div>
                  <div className="text-xs font-semibold text-text mt-0.5">
                    [TODO_PROVIDE_DIRECT_EMAIL]
                  </div>
                </div>
                <a
                  href={socials.email}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-elevated hover:bg-border/60 text-primary transition-colors"
                >
                  {isBn ? "ইমেইল পাঠান" : "Email"}
                </a>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">WhatsApp</div>
                  <div className="text-xs font-semibold text-text mt-0.5">
                    [TODO_PROVIDE_WHATSAPP_NUMBER]
                  </div>
                </div>
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">GitHub & LinkedIn</div>
                  <div className="text-xs font-semibold text-text mt-0.5">
                    @bmrifat · In: [TODO_PROVIDE_LINKEDIN]
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-elevated hover:bg-border/60 text-text"
                    aria-label="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-elevated hover:bg-border/60 text-text"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9 shadow-sm">
              <ContactForm initialIntent={resolvedSearchParams.intent || "partnership"} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
