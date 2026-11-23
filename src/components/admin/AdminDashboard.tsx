"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  AnalyticsStats,
  VisitEvent,
  DayTraffic,
  PageStat,
  ReferrerStat,
} from "@/lib/analytics";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Calendar,
  MapPin,
  Cpu,
  Mail,
  ArrowUpRight,
} from "@/components/ui/Icons";

export const AdminDashboard: React.FC = () => {
  const [adminKey, setAdminKey] = useState<string>("");
  const [keyInput, setKeyInput] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("7d");
  const [searchPath, setSearchPath] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<DayTraffic | null>(null);

  // Check stored key on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("bm_admin_key");
    if (stored) {
      setAdminKey(stored);
      fetchStats(stored);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchStats = async (key: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`/api/analytics/stats?key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("bm_admin_key");
        setAuthError("Invalid Admin Passcode. Please try again.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load analytics");
      }
      const data: AnalyticsStats = await res.json();
      setStats(data);
      setIsAuthenticated(true);
      sessionStorage.setItem("bm_admin_key", key);
      if (data.dailyTraffic && data.dailyTraffic.length > 0) {
        setSelectedDay(data.dailyTraffic[data.dailyTraffic.length - 1]);
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setAdminKey(keyInput.trim());
    fetchStats(keyInput.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bm_admin_key");
    setIsAuthenticated(false);
    setAdminKey("");
    setStats(null);
  };

  const handleRefresh = () => {
    if (adminKey) {
      fetchStats(adminKey);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!stats || !stats.recentEvents) return;
    const headers = "ID,Timestamp,Path,Locale,Device,Browser,City,Country,Referrer,DurationSec\n";
    const rows = stats.recentEvents
      .map(
        (e) =>
          `"${e.id}","${e.timestamp}","${e.path}","${e.locale}","${e.device}","${e.browser}","${e.city}","${e.country}","${e.referrer}",${e.durationSec}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bmrifat-analytics-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered recent events
  const filteredEvents = stats?.recentEvents.filter((e) =>
    searchPath ? e.path.toLowerCase().includes(searchPath.toLowerCase()) : true
  ) || [];

  // 1. PIN / Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-surface border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold text-text tracking-tight">
              Executive Analytics Portal
            </h1>
            <p className="text-xs text-muted">
              Sovereign telemetry console for BM Rifat portfolio &amp; startup infrastructure.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="adminPasscode"
                className="block text-[11px] font-mono uppercase tracking-wider text-muted font-medium"
              >
                Enter Admin Key / Passcode
              </label>
              <input
                id="adminPasscode"
                type="password"
                required
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-subtle text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              />
              <p className="text-[11px] text-muted/60">
                Default key: <code className="text-gold font-mono">rifat2026</code> (configured via ADMIN_KEY)
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-building/10 border border-building/30 text-[12.5px] text-building flex items-center gap-2">
                <span>⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-text text-bg text-[13px] font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-soft"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-border/60">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard Screen
  if (loading && !stats) {
    return (
      <div className="py-24 text-center space-y-3 font-mono text-sm text-muted">
        <div className="inline-block w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p>Loading telemetry stream...</p>
      </div>
    );
  }

  if (!stats) return null;

  // Max value in daily traffic for chart scaling
  const maxDayViews = Math.max(...stats.dailyTraffic.map((d) => d.views), 10);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header / Operational Beacon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-surface border border-border/80 text-muted hover:text-text transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Portfolio</span>
            </Link>
            <span className="text-border">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-gold font-semibold">
              Sovereign Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-text tracking-tight">
            Traffic Intelligence &amp; Visitor Stream
          </h1>
        </div>

        {/* Action Controls & Live Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Now Beacon */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-live/10 border border-live/30 text-live font-medium shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
            </span>
            <span>{stats.activeNow} Active Online</span>
          </div>

          <button
            onClick={handleRefresh}
            title="Refresh analytics data"
            className="p-2 rounded-lg bg-surface border border-border/80 text-muted hover:text-text hover:bg-surface-hover transition-colors shadow-soft"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface border border-border/80 text-muted hover:text-text transition-colors shadow-soft"
          >
            Export CSV
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface-subtle text-muted hover:text-building border border-border/60 transition-colors"
          >
            Lock
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Pageviews */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
            Total Pageviews
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-semibold text-text">
              {stats.totalPageviews.toLocaleString()}
            </span>
            <span className="text-[11px] font-mono text-live font-medium">
              +{stats.trends.pageviewsChange}%
            </span>
          </div>
          <p className="text-[11.5px] text-muted/70">7-day rolling volume</p>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
            Unique Visitors
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-semibold text-gold">
              {stats.uniqueVisitors.toLocaleString()}
            </span>
            <span className="text-[11px] font-mono text-live font-medium">
              +{stats.trends.uniquesChange}%
            </span>
          </div>
          <p className="text-[11.5px] text-muted/70">Hashed fingerprinting</p>
        </div>

        {/* Card 3: Avg Duration */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
            Avg. Session Time
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-semibold text-text">
              {Math.floor(stats.avgDurationSec / 60)}m {stats.avgDurationSec % 60}s
            </span>
            <span className="text-[11px] font-mono text-muted">
              {stats.bounceRatePercent}% bounce
            </span>
          </div>
          <p className="text-[11.5px] text-muted/70">Deep engagement</p>
        </div>

        {/* Card 4: Inquiries / Conversion */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
            Contact Submissions
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
              {stats.conversionInquiries}
            </span>
            <span className="text-[11px] font-mono text-accent font-medium">
              4.2% rate
            </span>
          </div>
          <p className="text-[11.5px] text-muted/70">Partners &amp; recruiters</p>
        </div>
      </div>

      {/* Row 2: Charts & Route Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Interactive Traffic Trend Chart (Takes 2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
                7-Day Traffic Flow
              </h2>
              <p className="text-xs text-muted/70">
                Daily comparison of total page requests vs. unique visitors.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gold" />
                <span className="text-text">Pageviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent/60" />
                <span className="text-muted">Uniques</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-4 h-48 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-border/60">
            {stats.dailyTraffic.map((day, idx) => {
              const viewsHeight = Math.max(12, Math.round((day.views / maxDayViews) * 140));
              const uniquesHeight = Math.max(8, Math.round((day.uniques / maxDayViews) * 140));
              const isSelected = selectedDay?.date === day.date;

              return (
                <div
                  key={day.date}
                  onClick={() => setSelectedDay(day)}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer group h-full justify-end"
                >
                  {/* Bars side by side */}
                  <div className="w-full flex items-end justify-center gap-1">
                    {/* Pageviews bar */}
                    <div
                      style={{ height: `${viewsHeight}px` }}
                      className={`w-3 sm:w-4 rounded-t-sm transition-all duration-300 ${
                        isSelected ? "bg-gold ring-2 ring-gold/40" : "bg-gold/80 group-hover:bg-gold"
                      }`}
                    />
                    {/* Uniques bar */}
                    <div
                      style={{ height: `${uniquesHeight}px` }}
                      className={`w-2.5 sm:w-3 rounded-t-sm transition-all duration-300 ${
                        isSelected ? "bg-accent ring-2 ring-accent/40" : "bg-accent/40 group-hover:bg-accent/70"
                      }`}
                    />
                  </div>

                  {/* Day label */}
                  <span
                    className={`text-[11px] font-mono uppercase pt-1 transition-colors ${
                      isSelected ? "text-gold font-bold" : "text-muted group-hover:text-text"
                    }`}
                  >
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected day detail info bar */}
          {selectedDay && (
            <div className="p-3 rounded-lg bg-surface-subtle border border-border/70 flex items-center justify-between text-xs font-mono">
              <span className="text-muted">
                Selected: <strong className="text-text">{selectedDay.dayName} ({selectedDay.date})</strong>
              </span>
              <div className="flex items-center gap-4">
                <span>
                  Views: <strong className="text-gold">{selectedDay.views}</strong>
                </span>
                <span>
                  Uniques: <strong className="text-accent">{selectedDay.uniques}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top Visited Routes */}
        <div className="p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
              Top Visited Routes
            </h2>
            <span className="text-[11px] font-mono text-muted/60">Share %</span>
          </div>

          <div className="space-y-3">
            {stats.topPages.slice(0, 6).map((page, pIdx) => (
              <div key={page.path} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-text truncate max-w-[160px] sm:max-w-[180px]">
                    {page.path}
                  </span>
                  <span className="font-mono text-muted text-[11px]">
                    {page.views} ({page.percentage}%)
                  </span>
                </div>
                {/* Visual bar */}
                <div className="h-1.5 w-full bg-surface-subtle rounded-full overflow-hidden">
                  <div
                    style={{ width: `${page.percentage}%` }}
                    className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Origins & Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Referrers */}
        <div className="p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-3.5">
          <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
            Traffic Acquisition
          </h2>
          <div className="space-y-2.5">
            {stats.topReferrers.map((ref) => (
              <div key={ref.source} className="flex items-center justify-between text-xs py-1 border-b border-border/40">
                <span className="text-text font-medium">{ref.source}</span>
                <span className="font-mono text-muted text-[11.5px]">
                  {ref.count} hits ({ref.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Platforms */}
        <div className="p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-3.5">
          <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
            Device Split
          </h2>
          <div className="space-y-3 pt-1">
            {stats.devices.map((dev) => (
              <div key={dev.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text">{dev.type}</span>
                  <span className="font-mono text-muted">{dev.count} ({dev.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-surface-subtle rounded-full overflow-hidden">
                  <div
                    style={{ width: `${dev.percentage}%` }}
                    className={`h-full rounded-full ${
                      dev.type === "Desktop"
                        ? "bg-gold"
                        : dev.type === "Mobile"
                        ? "bg-accent"
                        : "bg-live"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countries & Cities */}
        <div className="p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-3.5">
          <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
            Geographic Reach
          </h2>
          <div className="space-y-2.5">
            {stats.countries.map((geo) => (
              <div key={geo.country} className="flex items-center justify-between text-xs py-1 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-subtle text-muted">
                    {geo.code}
                  </span>
                  <span className="text-text">{geo.country}</span>
                </div>
                <span className="font-mono text-muted text-[11.5px]">
                  {geo.views} ({geo.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Real-time Live Event Log Table */}
      <div className="p-5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/70">
          <div>
            <h2 className="text-[13px] font-mono uppercase tracking-wider text-muted font-semibold">
              Live Visitor Audit Stream
            </h2>
            <p className="text-xs text-muted/70">
              Anonymized session logs showing visited URLs, locations, and referrer channels.
            </p>
          </div>

          {/* Search path filter */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchPath}
              onChange={(e) => setSearchPath(e.target.value)}
              placeholder="Filter by path (e.g. /ventures)..."
              className="w-full px-3 py-1.5 rounded-lg border border-border/80 bg-surface-subtle text-xs font-mono text-text placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/70 text-muted/80 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Path Visited</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Device / Browser</th>
                <th className="py-2.5 px-3">Referrer</th>
                <th className="py-2.5 px-3 text-right">Dwell Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredEvents.map((evt) => {
                const dateObj = new Date(evt.timestamp);
                const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

                return (
                  <tr key={evt.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="py-2.5 px-3 text-muted/80 whitespace-nowrap">
                      {timeStr}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-text whitespace-nowrap">
                      <span className="text-gold/90">{evt.path}</span>
                    </td>
                    <td className="py-2.5 px-3 text-muted whitespace-nowrap">
                      {evt.city}, {evt.country}
                    </td>
                    <td className="py-2.5 px-3 text-muted/90 whitespace-nowrap">
                      <span className="capitalize">{evt.device}</span> · {evt.browser}
                    </td>
                    <td className="py-2.5 px-3 text-muted whitespace-nowrap truncate max-w-[140px]">
                      {evt.referrer}
                    </td>
                    <td className="py-2.5 px-3 text-right text-text whitespace-nowrap">
                      {evt.durationSec}s
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredEvents.length === 0 && (
            <div className="py-8 text-center text-muted font-mono text-xs">
              No telemetry events match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
