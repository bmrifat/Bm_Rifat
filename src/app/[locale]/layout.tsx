import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { Inter, Hind_Siliguri } from "next/font/google";
import clsx from "clsx";
import "@/styles/globals.css";

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
      ? "বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি তৈরি করছি। স্বাস্থ্যসাথীর প্রতিষ্ঠাতা ও সিইও, ডকক্লিনিকের প্রতিষ্ঠাতা ও সিস্টেম আর্কিটেক্ট।"
      : "Building sovereign healthcare software for Bangladesh. Founder & CEO of SasthoSathi and Founder & System Architect of DocClinic.",
    metadataBase: new URL("https://bmrifat.com"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
    },
    openGraph: {
      title: isBn
        ? "বিএম রিফাত — সফটওয়্যার প্রকৌশলী ও প্রযুক্তি উদ্যোক্তা"
        : "BM Rifat — Software Engineer & Tech Entrepreneur",
      description: isBn
        ? "স্বাস্থ্য সাথী ও ডকক্লিনিকের প্রতিষ্ঠাতা ও সিস্টেম আর্কিটেক্ট। Dream Big, Build Bigger."
        : "Founder & System Architect of SasthoSathi and DocClinic. Dream Big, Build Bigger.",
      url: `/${locale}`,
      siteName: "BM Rifat",
      images: [
        {
          url: "/rifat.jpg",
          width: 682,
          height: 1024,
          alt: "BM Rifat — Founder & Systems Architect",
        },
      ],
      locale: isBn ? "bn_BD" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isBn
        ? "বিএম রিফাত — সফটওয়্যার প্রকৌশলী ও প্রযুক্তি উদ্যোক্তা"
        : "BM Rifat — Software Engineer & Tech Entrepreneur",
      description: isBn
        ? "স্বাস্থ্য সাথী ও ডকক্লিনিকের প্রতিষ্ঠাতা ও সিস্টেম আর্কিটেক্ট।"
        : "Founder & System Architect of SasthoSathi and DocClinic.",
      images: ["/rifat.jpg"],
    },
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
      <body className="min-h-screen bg-bg text-text antialiased selection:bg-gold/20 dark:selection:bg-gold/30 selection:text-text relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Sovereign Privacy-Preserving Telemetry Tracker */}
            <AnalyticsTracker />

            {/* Ambient luxury radial glow */}
            <div
              aria-hidden="true"
              className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-gold/[0.06] via-gold/[0.02] to-transparent pointer-events-none blur-3xl -z-10"
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
              <div className="max-w-reading has-[~div_.admin-viewport]:max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-300">
                <Header />
              </div>
            </div>

            {/* Content container: 680px for reading, expands to 5xl for admin dashboard */}
            <div className="max-w-reading has-[.admin-viewport]:max-w-5xl mx-auto px-6 sm:px-8 pt-8 sm:pt-10 transition-all duration-300">
              <main id="main-content">
                {children}
              </main>
              <Footer />
            </div>

            {/* Back to top floating indicator */}
            <BackToTop isBn={locale === "bn"} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
