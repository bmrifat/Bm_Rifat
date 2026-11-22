"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";

export interface PassionItem {
  id: string;
  icon: string;
  group: "arts" | "outdoors" | "kinship" | string;
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
};

export function PassionsSection({
  passions,
  locale = "en",
  isBn = false,
}: PassionsSectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const loc = isBn ? "bn" : "en";

  const filterTabs = useMemo(
    () => [
      { id: "all", label: isBn ? "সবগুলো (৮)" : "All Pursuits (8)" },
      { id: "arts", label: isBn ? "সাহিত্য ও শিল্প" : "Arts & Literature" },
      { id: "outdoors", label: isBn ? "প্রকৃতি ও গতি" : "Nature & Motion" },
      { id: "kinship", label: isBn ? "পরিবার ও বন্ধন" : "Family & Kinship" },
    ],
    [isBn]
  );

  const filteredPassions = useMemo(() => {
    if (selectedGroup === "all") return passions;
    return passions.filter((p) => p.group === selectedGroup);
  }, [passions, selectedGroup]);

  return (
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

          return (
            <div
              key={passion.id}
              className="group p-3.5 sm:p-4 rounded-xl bg-surface/40 hover:bg-surface border border-border/70 hover:border-gold/40 transition-all duration-200 shadow-soft/30 hover:shadow-soft space-y-2 flex flex-col justify-between"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
