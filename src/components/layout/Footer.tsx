"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="mt-20 pt-8 pb-14 border-t border-border/70 text-[12.5px] text-muted">
      <div className="flex items-center justify-between">
        <span>© 2026 BM Rifat</span>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hover:text-text transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-text"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
