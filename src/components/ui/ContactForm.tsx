"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export const ContactForm: React.FC = () => {
  const locale = useLocale();
  const isBn = locale === "bn";
  const t = useTranslations("contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const trimmedMsg = message.trim();
    if (trimmedMsg.length < 20) {
      setStatus("error");
      setErrorMessage(t("minCharsAlert"));
      return;
    }

    const lettersOnly = trimmedMsg.replace(/[\s\d\p{P}]/gu, "").toLowerCase();
    if (lettersOnly.length < 5 || new Set(lettersOnly).size < 4) {
      setStatus("error");
      setErrorMessage(t("invalidSpamAlert"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          intent: "other",
          message: trimmedMsg,
          honeypot: honeypot.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="py-4 text-[14px] text-live font-medium">
        ✓ {t("sent")}
      </div>
    );
  }

  const charCount = message.trim().length;
  const isLengthValid = charCount >= 20;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md pt-2">
      {/* Honeypot anti-spam */}
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

      <div className="space-y-1">
        <label htmlFor="name" className="block text-[12px] uppercase tracking-wider text-muted font-medium">
          {t("name")}
        </label>
        <input
          id="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isBn ? "আপনার পুরো নাম" : "Your full name"}
          className="w-full px-3 py-2 text-[14.5px] rounded-md border border-border/80 bg-surface/80 text-text placeholder:text-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-[12px] uppercase tracking-wider text-muted font-medium">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isBn ? "example@domain.com" : "example@domain.com"}
          className="w-full px-3 py-2 text-[14.5px] rounded-md border border-border/80 bg-surface/80 text-text placeholder:text-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="block text-[12px] uppercase tracking-wider text-muted font-medium">
            {t("message")}
          </label>
          <span
            className={`font-mono text-[11px] transition-colors ${
              isLengthValid ? "text-live font-medium" : "text-muted/80"
            }`}
          >
            {charCount}/20 {isBn ? "অক্ষর" : "chars"} {isLengthValid ? "✓" : ""}
          </span>
        </div>
        <textarea
          id="message"
          rows={4}
          required
          minLength={20}
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isBn
              ? "কমপক্ষে ২০ অক্ষরে আপনার বার্তা বা প্রস্তাব বিস্তারিত লিখুন..."
              : "Please write your note or inquiry in detail (min 20 characters)..."
          }
          className="w-full px-3 py-2 text-[14.5px] rounded-md border border-border/80 bg-surface/80 text-text placeholder:text-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors resize-none leading-relaxed"
        />
        <p className="text-[11.5px] text-muted/70 leading-normal">
          {t("messageHint")}
        </p>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-building/10 border border-building/30 text-[13px] text-building flex items-start gap-2 shadow-soft animate-fadeIn"
        >
          <span className="font-semibold select-none text-building">⚠️</span>
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-[13px] font-medium rounded-md bg-text text-bg hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-soft"
        >
          {loading ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
};
