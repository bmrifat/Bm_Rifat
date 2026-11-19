import React from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/ui/ContactForm";

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
    <div className="space-y-10 sm:space-y-12">
      <div className="space-y-1.5 pb-6 border-b border-border/80">
        <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
          {isBn ? "যোগাযোগ" : "Contact"}
        </h1>
        <p className="text-[15px] text-muted">
          {isBn
            ? "আমার সাথে যোগাযোগের সবচেয়ে দ্রুত ও সরাসরি মাধ্যম হলো ইমেইল।"
            : "The most direct way to reach me is by email."}
        </p>
      </div>

      {/* Email first */}
      <div className="space-y-1.5">
        <span className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold block">
          {isBn ? "সরাসরি ইমেইল" : "Direct email"}
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="text-[16px] text-text hover:text-accent font-mono underline underline-offset-4 decoration-border/80 hover:decoration-accent transition-colors"
        >
          {profile.email}
        </a>
      </div>

      {/* Tiny form second */}
      <div className="pt-8 border-t border-border/70 space-y-3">
        <span className="text-[11.5px] uppercase tracking-[0.14em] text-muted/80 font-semibold block">
          {isBn ? "অথবা একটি সংক্ষিপ্ত বার্তা পাঠান" : "Or send a short note"}
        </span>
        <ContactForm />
      </div>

      <div className="pt-4 text-[12.5px] text-muted/80">
        {isBn
          ? "গড় রেসপন্স সময়: সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে উত্তর দেওয়া হয়।"
          : "Response turnaround: usually within 24–48 hours."}
      </div>
    </div>
  );
}
