import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

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
    title: isBn ? "এডমিন অ্যানালিটিক্স — বিএম রিফাত" : "Executive Analytics — BM Rifat",
    description: isBn
      ? "ওয়েবসাইটের ভিজিটর ট্র্যাকিং এবং রিয়েল-টাইম মেট্রিক্স।"
      : "Private telemetry dashboard tracking visitor acquisition and venture engagement.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminDashboard />;
}
