"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export const AnalyticsTracker: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double firing for the same path or admin/api paths
    if (!pathname || pathname === lastTrackedPath.current || pathname.includes("/admin") || pathname.includes("/api")) {
      return;
    }

    lastTrackedPath.current = pathname;

    // Detect device type based on viewport width
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;
    const device = width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop";

    // Non-blocking fire and forget
    const payload = JSON.stringify({
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      device,
      locale: locale === "bn" ? "bn" : "en",
    });

    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore background tracking errors
    }
  }, [pathname, locale]);

  return null;
};
