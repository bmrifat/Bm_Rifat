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
      <body className="min-h-screen bg-bg text-text antialiased selection:bg-accent/20">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Skip link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-3 py-1 bg-accent text-white rounded text-xs"
            >
              {locale === "bn" ? "সরাসরি মূল অংশে যান" : "Skip to main content"}
            </a>

            {/* Single column, max-width: 680px, centered */}
            <div className="max-w-reading mx-auto px-6 sm:px-8">
              <Header />
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
