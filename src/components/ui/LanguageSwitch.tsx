"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export const LanguageSwitch: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-border bg-surface hover:bg-elevated text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={locale === "en" ? "Switch to Bengali" : "Switch to English"}
      title={locale === "en" ? "বাংলা ভাষায় দেখুন" : "View in English"}
    >
      <span className={locale === "en" ? "font-bold text-primary" : "text-muted"}>EN</span>
      <span className="text-muted/40">/</span>
      <span className={locale === "bn" ? "font-bold text-primary" : "text-muted"}>বাং</span>
    </button>
  );
};
