import React from "react";
import { TimelineItem } from "@/lib/validators";
import { useLocale } from "next-intl";
import { Calendar, Briefcase, GraduationCap, Award, Cpu } from "lucide-react";
import clsx from "clsx";

interface TimelineVisualizerProps {
  items: TimelineItem[];
  className?: string;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({
  items,
  className,
}) => {
  const locale = useLocale() as "en" | "bn";

  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "venture":
        return <Cpu className="w-4 h-4 text-primary" />;
      case "leadership":
        return <Award className="w-4 h-4 text-amber-500" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-sky-500" />;
      default:
        return <Briefcase className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className={clsx("relative pl-6 sm:pl-8 border-l border-border/80 space-y-10 my-6", className)}>
      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            {getIcon(item.type)}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors">
              {item.title[locale]}
            </h4>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-muted">
              <Calendar className="w-3 h-3" />
              {item.period}
            </span>
          </div>

          <div className="text-sm font-semibold text-primary/90 mb-2">
            {item.org[locale]}
          </div>

          <p className="text-sm text-muted leading-relaxed">
            {item.description[locale]}
          </p>

          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-elevated text-muted border border-border/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
