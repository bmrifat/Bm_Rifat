"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="mt-16 pt-6 pb-12 border-t border-border text-xs text-muted">
      <div className="flex items-center justify-between">
        <span>© 2026 BM Rifat</span>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:text-text hover:underline">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
