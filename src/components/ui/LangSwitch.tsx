"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export const LangSwitch: React.FC = () => {
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
      className="text-xs text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      aria-label={locale === "en" ? "Switch to Bengali" : "Switch to English"}
      title={locale === "en" ? "বাংলা ভাষায় দেখুন" : "View in English"}
    >
      <span className={locale === "en" ? "font-semibold text-text" : "text-muted"}>EN</span>
      <span className="mx-0.5 text-muted/40">/</span>
      <span className={locale === "bn" ? "font-semibold text-text" : "text-muted"}>বাং</span>
    </button>
  );
};
