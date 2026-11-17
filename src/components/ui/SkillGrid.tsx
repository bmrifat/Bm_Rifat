import React from "react";
import { SkillCategory } from "@/lib/validators";
import { useLocale } from "next-intl";
import clsx from "clsx";

interface SkillGridProps {
  categories: SkillCategory[];
  className?: string;
}

export const SkillGrid: React.FC<SkillGridProps> = ({ categories, className }) => {
  const locale = useLocale() as "en" | "bn";

  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="rounded-card border border-border bg-surface p-6 hover:border-primary/40 transition-colors shadow-sm"
        >
          <h4 className="font-display font-bold text-base text-text mb-4 pb-2 border-b border-border/70 flex items-center justify-between">
            <span>{cat.title[locale]}</span>
            <span className="text-xs font-mono text-muted">0{idx + 1}</span>
          </h4>
          <ul className="space-y-2">
            {cat.skills.map((skill, sIdx) => (
              <li
                key={sIdx}
                className="text-xs sm:text-sm text-muted flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
