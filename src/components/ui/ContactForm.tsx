"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./Button";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  initialIntent?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialIntent = "partnership" }) => {
  const locale = useLocale();
  const isBn = locale === "bn";

  const [intent, setIntent] = useState(initialIntent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const intentOptions = [
    { id: "partnership", en: "Partnership / Clinic Collaboration", bn: "পার্টনারশিপ / ক্লিনিকাল কোলাবোরেশন" },
    { id: "demo", en: "Live Demo (ShasthoSathi / DocClinic)", bn: "লাইভ ডেমো অনুরোধ (স্বাস্থ্য সাথী / ডকক্লিনিক)" },
    { id: "hiring", en: "Senior Engineering / Consulting", bn: "সিনিয়র ইঞ্জিনিয়ারিং / পরামর্শ" },
    { id: "speaking", en: "Speaking / Keynote Invitation", bn: "কি-নোট / স্পিকিং আমন্ত্রণ" },
    { id: "other", en: "General Inquiry", bn: "অন্যান্য জিজ্ঞাসা" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          intent,
          message,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || (isBn ? "বার্তা পাঠাতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" : "Failed to deliver message. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
        <h3 className="font-display font-bold text-xl text-text">
          {isBn ? "বার্তা সফলভাবে পৌঁছেছে!" : "Message Received!"}
        </h3>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          {isBn
            ? "আপনার বার্তার জন্য ধন্যবাদ। সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে রিফাত সরাসরি উত্তর প্রদান করেন।"
            : "Thank you for reaching out! BM Rifat will review your message and reply within 24–48 hours."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs font-semibold text-primary underline"
        >
          {isBn ? "অন্য আরেকটি বার্তা পাঠান" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot anti-spam (hidden) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {/* Intent Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted">
          {isBn ? "১. কি বিষয়ে আলোচনা করতে চান?" : "1. What would you like to discuss?"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {intentOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setIntent(opt.id)}
              className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                intent === opt.id
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                  : "border-border bg-surface text-muted hover:border-border/80 hover:bg-elevated"
              }`}
            >
              {isBn ? opt.bn : opt.en}
            </button>
          ))}
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-text">
            {isBn ? "আপনার নাম" : "Your Name"} <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-text">
            {isBn ? "ইমেইল ঠিকানা" : "Email Address"} <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tanvir@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Organization (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor="org" className="text-xs font-semibold text-text">
          {isBn ? "প্রতিষ্ঠান / ক্লিনিক / বিশ্ববিদ্যালয় (ঐচ্ছিক)" : "Organization / Hospital / Chamber (Optional)"}
        </label>
        <input
          id="org"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder={isBn ? "যেমন: ঢাকা মেডিকেল কলেজ / ডায়াগনস্টিক" : "e.g. CarePoint Diagnostic / Tech Corp"}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-text">
          {isBn ? "আপনার বার্তা" : "Your Message"} <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isBn
              ? "আপনার প্রস্তাবনা বা জিজ্ঞাসা সংক্ষেপে তুলে ধরুন..."
              : "Share specifics regarding your clinic setup, technical query, or speaking theme..."
          }
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
        />
      </div>

      {/* Error state */}
      {status === "error" && (
        <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3 flex items-center gap-2 text-sm font-bold"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isBn ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
          </>
        ) : (
          <>
            <span>{isBn ? "বার্তা পাঠান" : "Send Message"}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
};
