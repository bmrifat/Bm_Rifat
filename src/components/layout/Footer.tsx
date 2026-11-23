"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="mt-20 pt-8 pb-14 border-t border-border/70 text-[12.5px] text-muted space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-serif font-medium text-text">BM Rifat</span>
          <span className="text-border">·</span>
          <span className="text-[12px] font-mono text-muted/70">Sovereign Healthcare Infrastructure</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>© 2026</span>
          <Link
            href="/contact"
            className="hover:text-text transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-text"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/admin"
            className="hover:text-gold transition-colors font-mono text-[11.5px] opacity-75 hover:opacity-100 flex items-center gap-1"
            title="Executive Telemetry Console"
          >
            <span>Telemetry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-live inline-block" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
