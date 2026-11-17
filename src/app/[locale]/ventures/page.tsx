import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";

export default async function VenturesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-xs text-muted hover:text-accent">
          {isBn ? "← মূল পাতায় ফিরে যান" : "← Back to Home"}
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-text tracking-tight">
        {isBn ? "উদ্যোগসমূহ" : "Ventures"}
      </h1>

      <div className="space-y-4 pt-2">
        {ventures.map((venture) => (
          <div key={venture.slug} className="space-y-1 pb-3 border-b border-border">
            <div className="flex items-baseline justify-between">
              <Link
                href={`/ventures/${venture.slug}`}
                className="font-medium text-accent hover:underline"
              >
                {venture.name[loc]}
              </Link>
              <StatusDot status={venture.status} text={venture.statusText[loc]} />
            </div>
            <p className="text-sm text-muted">
              {venture.tagline[loc]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
