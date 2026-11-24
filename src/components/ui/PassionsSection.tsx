"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Mic,
  BookOpen,
  Compass,
  Camera,
  Bike,
  Sprout,
  Heart,
  Users,
  Sparkles,
  X,
  ExternalLink,
  Quote,
  Coffee,
} from "lucide-react";
import { BookItem } from "@/data/books";

export interface PassionItem {
  id: string;
  icon: string;
  group: "arts" | "outdoors" | "kinship" | "mindfulness" | string;
  title: {
    en: string;
    bn: string;
  };
  category: {
    en: string;
    bn: string;
  };
  desc: {
    en: string;
    bn: string;
  };
}

interface PassionsSectionProps {
  passions: PassionItem[];
  books?: BookItem[];
  locale?: string;
  isBn?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  BookOpen,
  Compass,
  Camera,
  Bike,
  Sprout,
  Heart,
  Users,
  Coffee,
  Sparkles,
};

export function PassionsSection({
  passions,
  books = [],
  locale = "en",
  isBn = false,
}: PassionsSectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);
  const loc = isBn ? "bn" : "en";

  const closeBookshelf = useCallback(() => {
    setIsBookshelfOpen(false);
  }, []);

  useEffect(() => {
    if (!isBookshelfOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookshelf();
    };
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isBookshelfOpen, closeBookshelf]);

  const filterTabs = useMemo(
    () => [
      { id: "all", label: isBn ? `সবগুলো (${passions.length})` : `All Pursuits (${passions.length})` },
      { id: "mindfulness", label: isBn ? "মনন ও নিস্তব্ধতা" : "Stillness & Zen" },
      { id: "arts", label: isBn ? "সাহিত্য ও শিল্প" : "Arts & Literature" },
      { id: "outdoors", label: isBn ? "প্রকৃতি ও গতি" : "Nature & Motion" },
      { id: "kinship", label: isBn ? "পরিবার ও বন্ধন" : "Family & Kinship" },
    ],
    [isBn, passions.length]
  );

  const filteredPassions = useMemo(() => {
    if (selectedGroup === "all") return passions;
    return passions.filter((p) => p.group === selectedGroup);
  }, [passions, selectedGroup]);

  return (
    <>
      <div className="space-y-4 pt-1">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pb-1">
          {filterTabs.map((tab) => {
            const isActive = selectedGroup === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedGroup(tab.id)}
                className={`px-3 py-1 text-[11.5px] rounded-full transition-all duration-200 cursor-pointer font-medium ${
                  isActive
                    ? "bg-gold/15 text-gold border border-gold/40 shadow-xs font-semibold"
                    : "bg-surface/70 text-muted hover:text-text border border-border/70 hover:border-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid of Passions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPassions.map((passion) => {
            const IconComponent = iconMap[passion.icon] || Sparkles;
            const isReading = passion.id === "reading";
            const isDoNothing = passion.id === "do-nothing";

            return (
              <div
                key={passion.id}
                className={`group p-3.5 sm:p-4 rounded-xl border transition-all duration-200 shadow-soft/30 hover:shadow-soft space-y-2 flex flex-col justify-between ${
                  isDoNothing
                    ? "bg-gold/5 hover:bg-gold/10 border-gold/40 hover:border-gold/60"
                    : "bg-surface/40 hover:bg-surface border-border/70 hover:border-gold/40"
                }`}
              >
                <div className="space-y-2">
                  {/* Header row: Icon & Category pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border/80 group-hover:border-gold/40 flex items-center justify-center text-gold transition-colors shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-muted/70 bg-surface px-2 py-0.5 rounded-full border border-border/60">
                      {passion.category[loc]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-medium text-[15.5px] text-text group-hover:text-accent transition-colors pt-0.5">
                    {passion.title[loc]}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-muted leading-relaxed">
                    {passion.desc[loc]}
                  </p>
                </div>

                {/* Special Highlight for Do Nothing Passion */}
                {isDoNothing && (
                  <div className="pt-2 border-t border-border/60 mt-1 flex items-center justify-between flex-wrap gap-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gold font-medium">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isBn ? "মোস্ট ফ্যাভোরিট প্যাশন এভার" : "Most Favorite Passion Ever"}</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-muted/60 italic">Dolce Far Niente</span>
                  </div>
                )}

                {/* Interactive Bookshelf Pill for Reading Passion */}
                {isReading && books.length > 0 && (
                  <div className="pt-2 border-t border-border/60 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsBookshelfOpen(true)}
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-gold hover:text-gold-subtle transition-colors cursor-pointer group/btn"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-gold/80" />
                      <span className="underline underline-offset-2">
                        {isBn
                          ? "আমার পছন্দের ৪টি ক্লাসিক গ্রন্থ দেখুন ↗"
                          : "View 4 Curated Books ↗"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookshelf Modal */}
      {isBookshelfOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? "প্রিয় গ্রন্থতালিকা" : "Curated Bookshelf"}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={closeBookshelf}
        >
          <div
            className="relative max-w-xl w-full bg-surface border border-border/90 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[85vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {isBn ? "চিন্তাশীল পাঠতালিকা" : "Intellectual Foundations"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-text">
                  {isBn ? "বিএম রিফাতের নির্বাচিত ৪টি গ্রন্থ" : "BM Rifat's Curated Bookshelf"}
                </h2>
                <p className="text-[13px] text-muted leading-relaxed">
                  {isBn
                    ? "সিস্টেম থিংকিং, প্রযুক্তির টেকসই উদ্ভাবন এবং ধ্রুপদী ভাবনার নির্যাস।"
                    : "Foundational thinking in technology, leverage, systems resilience, and literature."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeBookshelf}
                className="p-1.5 rounded-full bg-surface-subtle hover:bg-border/60 text-muted hover:text-text border border-border/60 transition-colors cursor-pointer shrink-0"
                aria-label={isBn ? "বন্ধ করুন" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Book Cards */}
            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="p-4 rounded-xl bg-surface-subtle/50 border border-border/70 space-y-2.5 hover:border-gold/40 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-serif font-semibold text-[16px] text-text">
                        {book.title}
                      </h3>
                      <p className="text-[12.5px] font-mono text-muted/90">
                        {book.author} {book.year ? `· ${book.year}` : ""}
                      </p>
                    </div>

                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                      {book.category[loc]}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-text/90 leading-relaxed">
                    {book.takeaway[loc]}
                  </p>

                  {book.quote && (
                    <div className="pt-1 flex items-start gap-2 text-gold-subtle italic font-serif text-[13px] leading-relaxed border-t border-border/50">
                      <Quote className="w-3 h-3 text-gold shrink-0 mt-1 opacity-70" />
                      <span>&ldquo;{book.quote[loc]}&rdquo;</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer close note */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={closeBookshelf}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-text bg-surface border border-border hover:border-gold/50 transition-colors cursor-pointer"
              >
                {isBn ? "বন্ধ করুন (Esc)" : "Close Shelf (Esc)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
