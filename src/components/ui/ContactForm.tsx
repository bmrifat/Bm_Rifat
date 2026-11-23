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
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          intent: "other",
          message: message.trim(),
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
        <label htmlFor="message" className="block text-[12px] uppercase tracking-wider text-muted font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={4}
          required
          minLength={3}
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isBn ? "আপনার বার্তা বা প্রস্তাব লিখুন..." : "Your note, proposal or question..."}
          className="w-full px-3 py-2 text-[14.5px] rounded-md border border-border/80 bg-surface/80 text-text placeholder:text-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors resize-none leading-relaxed"
        />
      </div>

      {status === "error" && (
        <div className="text-[13px] text-building">
          {errorMessage}
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
