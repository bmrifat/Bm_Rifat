"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export const Navbar: React.FC = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/ventures", label: t("ventures") },
    { href: "/about", label: t("about") },
    { href: "/writing", label: t("writing") },
    { href: "/leadership", label: t("leadership") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg/85 border-b border-border transition-colors">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 px-1.5 -ml-1.5"
        >
          <span className="w-8 h-8 rounded-lg bg-primary text-primary-fg flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            R
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-text">
            BM Rifat
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-elevated text-primary font-semibold"
                    : "text-muted hover:text-text hover:bg-elevated/60"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-primary text-primary-fg hover:opacity-90 shadow-sm transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("talkCTA")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-muted hover:text-text hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-5 transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === "/" ? "bg-elevated text-primary font-bold" : "text-muted hover:text-text"
              )}
            >
              {t("home")}
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-elevated text-primary font-bold" : "text-muted hover:text-text"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-border mt-1">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-primary text-primary-fg text-sm font-semibold shadow-sm"
              >
                {t("talkCTA")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
