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
    <header className="pt-10 pb-6 border-b border-border/70 mb-10 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Left */}
        <Link
          href="/"
          className="text-[15px] font-semibold text-text tracking-tight hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
        >
          {t("brand")}
        </Link>

        {/* Right Nav: refined minimalist links */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-muted">
          <Link
            href="/ventures/shasthosathi"
            className={
              isVentures
                ? "text-text font-medium border-b border-text/70 pb-0.5"
                : "hover:text-text"
            }
          >
            {t("ventures")}
          </Link>
          <Link
            href="/writing"
            className={
              isWriting
                ? "text-text font-medium border-b border-text/70 pb-0.5"
                : "hover:text-text"
            }
          >
            {t("writing")}
          </Link>
          <Link
            href="/contact"
            className={
              isContact
                ? "text-text font-medium border-b border-text/70 pb-0.5"
                : "hover:text-text"
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
      </div>
    </header>
  );
};
