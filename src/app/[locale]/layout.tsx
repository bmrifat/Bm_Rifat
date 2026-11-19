import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Inter, Hind_Siliguri } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600"],
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isBn = locale === "bn";

  return {
    title: {
      default: isBn
        ? "বিএম রিফাত — সফটওয়্যার প্রকৌশলী ও স্বাস্থ্যপ্রযুক্তি উদ্যোক্তা"
        : "BM Rifat — Software Engineer & Healthtech Founder",
      template: isBn ? "%s | বিএম রিফাত" : "%s | BM Rifat",
    },
    description: isBn
      ? "বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি তৈরি করছি। স্বাস্থ্য সাথী ও ডকক্লিনিকের প্রতিষ্ঠাতা ও সিইও।"
      : "Building healthcare software for Bangladesh. Founder & CEO of ShasthoSathi and DocClinic.",
    metadataBase: new URL("https://bmrifat.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        bn: "/bn",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      className={clsx(
        inter.variable,
        hindSiliguri.variable,
        locale === "bn" ? "font-bengali" : "font-sans"
      )}
    >
      <body className="min-h-screen bg-bg text-text antialiased selection:bg-amber-200/60 dark:selection:bg-accent/30 selection:text-text relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Ambient subtle cream glow */}
            <div
              aria-hidden="true"
              className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-gradient-to-b from-amber-400/[0.04] via-amber-200/[0.02] to-transparent pointer-events-none blur-3xl -z-10"
            />

            {/* Skip link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-3.5 py-1.5 bg-text text-bg rounded-full text-xs font-medium shadow-soft"
            >
              {locale === "bn" ? "সরাসরি মূল অংশে যান" : "Skip to main content"}
            </a>

            {/* Sticky subtle glassmorphic header container */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-bg/85 border-b border-border/60 transition-colors">
              <div className="max-w-reading mx-auto px-6 sm:px-8">
                <Header />
              </div>
            </div>

            {/* Single column, max-width: 680px, centered content */}
            <div className="max-w-reading mx-auto px-6 sm:px-8 pt-8 sm:pt-10">
              <main id="main-content">
                {children}
              </main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
