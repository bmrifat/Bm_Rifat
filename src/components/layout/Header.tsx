"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header: React.FC = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const isVentures = pathname.startsWith("/ventures");
  const isWriting = pathname.startsWith("/writing");
  const isContact = pathname.startsWith("/contact");

  return (
    <header className="py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand / Left */}
      <Link
        href="/"
        className="text-[14.5px] font-semibold text-text tracking-tight hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm inline-flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent/80" aria-hidden="true" />
        <span>{t("brand")}</span>
      </Link>

      {/* Right Nav */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
        <Link
          href="/ventures/shasthosathi"
          className={
            isVentures
              ? "text-text font-medium border-b border-text/80 pb-0.5"
              : "hover:text-text transition-colors"
          }
        >
          {t("ventures")}
        </Link>
        <Link
          href="/writing"
          className={
            isWriting
              ? "text-text font-medium border-b border-text/80 pb-0.5"
              : "hover:text-text transition-colors"
          }
        >
          {t("writing")}
        </Link>
        <Link
          href="/contact"
          className={
            isContact
              ? "text-text font-medium border-b border-text/80 pb-0.5"
              : "hover:text-text transition-colors"
          }
        >
          {t("contact")}
        </Link>

        <span className="text-border select-none" aria-hidden="true">
          ·
        </span>

        <LangSwitch />
        <ThemeToggle />
      </nav>
    </header>
  );
};
