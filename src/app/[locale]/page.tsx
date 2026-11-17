import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import { StatusDot } from "@/components/ui/StatusDot";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";
  const loc = isBn ? "bn" : "en";

  return (
    <div className="space-y-12">
      {/* 1. INTRO BLOCK */}
      <section className="space-y-4">
        {/* Photo: 96x96, rounded-lg */}
        <div className="w-24 h-24 rounded-lg bg-border/40 border border-border flex items-center justify-center text-xs text-muted font-mono select-none overflow-hidden">
          {/* Portrait placeholder */}
          <span className="text-center px-1">[Photo]</span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-text tracking-tight">
            {profile.name}
          </h1>
          <p className="text-muted text-base mt-1">
            {profile.tagline[loc]}
          </p>
        </div>

        <p className="text-base text-text leading-relaxed">
          {profile.bio[loc]}
        </p>

        {/* Quick Link Line */}
        <div className="text-sm text-muted pt-1 flex flex-wrap items-center gap-x-2">
          <span>{isBn ? "ইমেইল:" : "Email:"}</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-accent hover:underline"
          >
            {profile.email}
          </a>
          <span>·</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* 2. VENTURES SECTION */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "উদ্যোগসমূহ" : "Ventures"}
        </h2>

        <div className="space-y-3">
          {ventures.map((venture) => (
            <div
              key={venture.slug}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 py-1"
            >
              <div>
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="font-medium text-accent hover:underline"
                >
                  {venture.name[loc]}
                </Link>
                <span className="text-muted text-sm ml-2">
                  {venture.tagline[loc]}
                </span>
              </div>
              <StatusDot status={venture.status} text={venture.statusText[loc]} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. THINGS I'M INTERESTED IN */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "আগ্রহের বিষয়সমূহ" : "Things I'm interested in"}
        </h2>

        <ul className="space-y-2.5 text-base text-text list-disc list-inside">
          {profile.interests.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              <strong className="font-semibold">{item.lead[loc]}</strong>{" "}
              <span className="text-muted">{item.desc[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. ALSO (OTHER ACTIVITIES) */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "অন্যান্য কার্যক্রম" : "Also"}
        </h2>

        <div className="space-y-2 text-base">
          {profile.also.map((item, idx) => (
            <div key={idx} className="py-0.5">
              <span className="font-semibold text-text">{item.name}</span>
              <span className="text-muted ml-2">{item.desc[loc]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NOW */}
      <section className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
            {isBn ? "বর্তমান ব্যস্ততা" : "Now"}
          </h2>
          <span className="text-xs text-muted">
            {isBn ? `সর্বশেষ আপডেট: ${profile.now.lastUpdated}` : `Last updated: ${profile.now.lastUpdated}`}
          </span>
        </div>

        <ul className="space-y-2 text-base text-muted list-disc list-inside">
          {profile.now.bullets.map((bullet, idx) => (
            <li key={idx} className="leading-relaxed text-text">
              {bullet[loc]}
            </li>
          ))}
        </ul>
      </section>

      {/* 6. ELSEWHERE */}
      <section className="space-y-3 pt-4 border-t border-border">
        <h2 className="text-xs uppercase tracking-wider text-muted font-semibold">
          {isBn ? "অন্যান্য মাধ্যম" : "Elsewhere"}
        </h2>

        <div className="text-sm flex flex-wrap items-center gap-x-3 text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-accent hover:underline"
          >
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
