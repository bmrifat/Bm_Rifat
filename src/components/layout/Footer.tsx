"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { socials } from "@/data/socials";
import { Github, Linkedin, Mail, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-border bg-surface/50 transition-colors mt-auto">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Positioning */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-primary text-primary-fg flex items-center justify-center font-bold text-sm">
                R
              </span>
              <span className="font-display font-bold text-base tracking-tight text-text">
                BM Rifat
              </span>
            </div>
            <p className="text-sm text-muted max-w-md leading-relaxed">
              Software Engineer & Healthtech Founder. Building production-grade, Bengali-first healthcare and clinical systems for Bangladesh.
            </p>
            <div className="flex items-center gap-3 pt-2 text-muted">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border hover:bg-elevated hover:text-text transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border hover:bg-elevated hover:text-text transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socials.email}
                className="p-2 rounded-full border border-border hover:bg-elevated hover:text-text transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/ventures" className="hover:text-primary transition-colors">
                  {tNav("ventures")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:text-primary transition-colors">
                  {tNav("writing")}
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-primary transition-colors">
                  {tNav("leadership")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Resources & Press
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/now" className="hover:text-primary transition-colors">
                  {tNav("now")}
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-primary transition-colors">
                  {tNav("press")}
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-primary transition-colors">
                  {tNav("resume")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Clinical / Medical Disclaimer Notice */}
        <div className="p-4 rounded-xl border border-border/80 bg-elevated/60 text-xs text-muted flex items-start gap-3 mb-8">
          <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t("medicalDisclaimer")}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © {currentYear} BM Rifat. {t("allRightsReserved")}.
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
