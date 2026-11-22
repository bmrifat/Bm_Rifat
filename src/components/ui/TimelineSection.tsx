"use client";

import React, { useState } from "react";
import { TimelineItem } from "@/lib/validators";

interface TimelineSectionProps {
  items: TimelineItem[];
  isBn?: boolean;
}

const typeLabels: Record<string, { en: string; bn: string }> = {
  venture: { en: "Sovereign Venture", bn: "অবকাঠামো উদ্যোগ" },
  leadership: { en: "Leadership & Club", bn: "নেতৃত্ব ও ক্লাব" },
  work: { en: "Client & Growth", bn: "গ্রোথ ও ক্লায়েন্ট" },
  education: { en: "Academia (CSE)", bn: "সিএসই শিক্ষা" },
};

export function TimelineSection({ items, isBn = false }: TimelineSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const loc = isBn ? "bn" : "en";

  const displayedItems = showAll ? items : items.slice(0, 4);

  return (
    <div className="space-y-4 pt-1">
      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-7 border-l-2 border-border/80 dark:border-border/60 ml-2 sm:ml-2.5 space-y-6 sm:space-y-7 pt-1">
        {displayedItems.map((item, idx) => {
          const typeLabel = typeLabels[item.type]?.[loc] || item.type;

          return (
            <div key={idx} className="relative group space-y-2">
              {/* Dot Beacon on the Track */}
              <span
                className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-3 h-3 rounded-full bg-gold border-2 border-bg ring-4 ring-gold/15 group-hover:scale-125 transition-transform duration-200"
                aria-hidden="true"
              />

              {/* Meta row: Period & Type Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/30">
                  {item.period}
                </span>

                <span className="text-[10px] font-mono uppercase tracking-wider text-muted/70 bg-surface px-2 py-0.5 rounded border border-border/70">
                  {typeLabel}
                </span>
              </div>

              {/* Title & Organization */}
              <div className="space-y-0.5">
                <h3 className="font-serif font-medium text-[16px] sm:text-[17px] text-text group-hover:text-accent transition-colors">
                  {item.title[loc]}
                </h3>
                <p className="text-[13.5px] font-medium text-muted/90">
                  {item.org[loc]}
                </p>
              </div>

              {/* Description */}
              <p className="text-[14px] text-muted leading-relaxed">
                {item.description[loc]}
              </p>

              {/* Skills / Focus Pills */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono text-muted/80 bg-surface/80 border border-border/70 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expand / Collapse Button if more than 4 items */}
      {items.length > 4 && (
        <div className="pt-2 pl-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-text bg-surface border border-border hover:border-gold/50 hover:text-gold shadow-soft transition-all cursor-pointer"
          >
            <span>
              {showAll
                ? isBn
                  ? "সংক্ষিপ্ত করুন ↑"
                  : "Show fewer milestones ↑"
                : isBn
                ? `পূর্ববর্তী আরও ${items.length - 4}টি মাইলফলক দেখুন ↓`
                : `View ${items.length - 4} earlier milestones ↓`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
