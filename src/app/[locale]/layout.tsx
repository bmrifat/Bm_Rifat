import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Inter, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
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
        ? "বিএম রিফাত — সফটওয়্যার ইঞ্জিনিয়ার ও স্বাস্থ্যপ্রযুক্তি প্রতিষ্ঠাতা"
        : "BM Rifat — Software Engineer & Healthtech Founder",
      template: isBn ? "%s | বিএম রিফাত" : "%s | BM Rifat",
    },
    description: isBn
      ? "বাংলাদেশের জন্য স্বাস্থ্যপ্রযুক্তি গড়ছি — বাংলা-ভিত্তিক, AI-সহায়ক, প্রোডাকশন-মানের। প্রতিষ্ঠাতা: স্বাস্থ্য সাথী ও ডকক্লিনিক।"
      : "Building healthcare technology for Bangladesh — Bengali-first, AI-assisted, production-grade. Founder & CEO of ShasthoSathi and DocClinic.",
    metadataBase: new URL("https://bmrifat.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        bn: "/bn",
      },
    },
    openGraph: {
      type: "website",
      locale: isBn ? "bn_BD" : "en_US",
      url: `https://bmrifat.com/${locale}`,
      siteName: "BM Rifat",
      title: isBn
        ? "বিএম রিফাত — স্বাস্থ্যপ্রযুক্তি ও সফটওয়্যার প্রকৌশল"
        : "BM Rifat — Healthcare Technology & Software Engineering",
      description: isBn
        ? "বাংলা-ভিত্তিক স্বাস্থ্য প্ল্যাটফর্ম স্বাস্থ্য সাথী এবং ক্লিনিকাল ম্যানেজমেন্ট সিস্টেম ডকক্লিনিকের স্থপতি।"
        : "Architect of ShasthoSathi and DocClinic: production-grade healthtech engineered for Bangladesh.",
    },
    twitter: {
      card: "summary_large_image",
      title: "BM Rifat — Software Engineer & Healthtech Founder",
      description:
        "Building healthcare technology for Bangladesh — Bengali-first, AI-assisted, production-grade.",
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
        plusJakarta.variable,
        hindSiliguri.variable,
        locale === "bn" ? "font-bengali" : "font-sans"
      )}
    >
      <body className="min-h-screen flex flex-col bg-bg text-text antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Skip link for keyboard accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-fg rounded-md shadow-lg font-medium text-sm"
            >
              {locale === "bn" ? "সরাসরি মূল অংশে যান" : "Skip to main content"}
            </a>

            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
