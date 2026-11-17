"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header: React.FC = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="pt-8 pb-6 border-b border-border mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        {/* Brand / Left */}
        <Link
          href="/"
          className="text-base font-semibold text-text hover:text-accent tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          {t("brand")}
        </Link>

        {/* Right Nav: plain text links */}
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <Link
            href="/ventures/shasthosathi"
            className={
              pathname.startsWith("/ventures")
                ? "text-accent font-medium underline underline-offset-4"
                : "hover:text-text"
            }
          >
            {t("ventures")}
          </Link>
          <Link
            href="/writing"
            className={
              pathname.startsWith("/writing")
                ? "text-accent font-medium underline underline-offset-4"
                : "hover:text-text"
            }
          >
            {t("writing")}
          </Link>
          <Link
            href="/contact"
            className={
              pathname.startsWith("/contact")
                ? "text-accent font-medium underline underline-offset-4"
                : "hover:text-text"
            }
          >
            {t("contact")}
          </Link>

          <span className="text-border">|</span>

          <LangSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
