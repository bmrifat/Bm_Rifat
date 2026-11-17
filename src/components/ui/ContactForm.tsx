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
          name,
          email,
          intent: "other",
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
      <div className="py-4 text-sm text-live">
        {t("sent")}
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

      <div>
        <label htmlFor="name" className="block text-xs text-muted mb-1">
          {t("name")}
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded border border-border bg-transparent text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs text-muted mb-1">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded border border-border bg-transparent text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-muted mb-1">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded border border-border bg-transparent text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
        />
      </div>

      {status === "error" && (
        <div className="text-xs text-building">
          {errorMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-1.5 text-xs font-medium rounded border border-border bg-text text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
};
