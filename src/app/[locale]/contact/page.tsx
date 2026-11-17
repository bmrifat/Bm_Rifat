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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight">
          {isBn ? "যোগাযোগ" : "Contact"}
        </h1>
        <p className="text-base text-muted mt-1">
          {isBn
            ? "আমার সাথে যোগাযোগের সবচেয়ে দ্রুত ও সরাসরি মাধ্যম হলো ইমেইল।"
            : "The most reliable way to reach me is by direct email."}
        </p>
      </div>

      {/* Email first */}
      <div className="py-2">
        <span className="text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
          {isBn ? "সরাসরি ইমেইল" : "Direct email"}
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="text-base text-accent hover:underline font-mono"
        >
          {profile.email}
        </a>
      </div>

      {/* Tiny form second */}
      <div className="pt-6 border-t border-border space-y-2">
        <span className="text-xs uppercase tracking-wider text-muted font-semibold block">
          {isBn ? "অথবা একটি সংক্ষিপ্ত বার্তা পাঠান" : "Or send a short note"}
        </span>
        <ContactForm />
      </div>

      <div className="pt-4 text-xs text-muted">
        {isBn
          ? "গড় রেসপন্স সময়: সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে উত্তর দেওয়া হয়।"
          : "Response turnaround: usually within 24–48 hours."}
      </div>
    </div>
  );
}
