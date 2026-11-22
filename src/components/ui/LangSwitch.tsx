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
      className="h-8 px-2.5 rounded-lg bg-surface/60 border border-border/70 hover:border-gold/50 hover:bg-surface text-xs text-muted hover:text-text transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer"
      aria-label={locale === "en" ? "Switch to Bengali" : "Switch to English"}
      title={locale === "en" ? "বাংলা ভাষায় দেখুন" : "View in English"}
    >
      <span className={locale === "en" ? "font-semibold text-text" : "text-muted"}>EN</span>
      <span className="mx-1 text-muted/40 text-[10px]">/</span>
      <span className={locale === "bn" ? "font-semibold text-text" : "text-muted"}>বাং</span>
    </button>
  );
};
