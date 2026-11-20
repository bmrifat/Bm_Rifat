import React from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/ui/ContactForm";
import { Mail, Clock, ArrowLeft, Phone } from "@/components/ui/Icons";
import { Link } from "@/i18n/routing";

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
      ? "বিএম রিফাতের সাথে সরাসরি যোগাযোগের মাধ্যম ও ইমেইল।"
      : "Contact BM Rifat: email first, short note second.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";

  return (
    <div className="space-y-10 sm:space-y-12 pb-14">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border/80 text-muted hover:text-text shadow-soft transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted/60 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isBn ? "মূল পাতা" : "Home"}</span>
        </Link>
      </div>

      <div className="space-y-1.5 pb-6 border-b border-border/70">
        <h1 className="text-2xl sm:text-[30px] font-semibold text-text tracking-tight">
          {isBn ? "যোগাযোগ" : "Contact"}
        </h1>
        <p className="text-[15.5px] text-muted">
          {isBn
            ? "আমার সাথে যোগাযোগের সবচেয়ে দ্রুত ও সরাসরি মাধ্যম হলো ইমেইল।"
            : "The most direct way to reach me is by email."}
        </p>
      </div>

      {/* Direct contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-[11.5px] uppercase tracking-[0.14em] text-muted font-semibold">
              {isBn ? "সরাসরি ইমেইল" : "Direct Email"}
            </span>
          </div>
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="text-[15px] sm:text-[16px] text-text hover:text-accent font-mono underline underline-offset-4 decoration-border/80 hover:decoration-accent transition-colors break-all"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-live" />
            <span className="text-[11.5px] uppercase tracking-[0.14em] text-muted font-semibold">
              {isBn ? "ফোন / হোয়াটসঅ্যাপ" : "Phone / WhatsApp"}
            </span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={`tel:${profile.phone}`}
              className="text-[15px] sm:text-[16px] text-text hover:text-accent font-mono underline underline-offset-4 decoration-border/80 hover:decoration-accent transition-colors"
            >
              {profile.displayPhone}
            </a>
            <span className="text-border text-xs">·</span>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-live hover:underline"
            >
              WhatsApp →
            </a>
          </div>
        </div>
      </div>

      {/* Tiny form */}
      <div className="pt-8 border-t border-border/70 space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted/60">02</span>
          <span className="text-border">/</span>
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-muted/90 font-semibold">
            {isBn ? "অথবা একটি সংক্ষিপ্ত বার্তা পাঠান" : "Or send a short note"}
          </h2>
        </div>
        <ContactForm />
      </div>

      {/* Response time */}
      <div className="pt-4 text-[12.5px] text-muted/80 flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-muted/60" />
        <span>
          {isBn
            ? "গড় রেসপন্স সময়: সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে উত্তর দেওয়া হয়।"
            : "Response turnaround: usually within 24–48 hours."}
        </span>
      </div>
    </div>
  );
}
