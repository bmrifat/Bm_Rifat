import React from "react";
import clsx from "clsx";

export type StatusType = "live" | "building" | "planned" | "archived";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className }) => {
  const defaultLabels: Record<StatusType, string> = {
    live: "Live",
    building: "In Development",
    planned: "Planned",
    archived: "Archived",
  };

  const text = label || defaultLabels[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border",
        {
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20":
            status === "live",
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20":
            status === "building",
          "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20":
            status === "planned",
          "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20":
            status === "archived",
        },
        className
      )}
    >
      <span
        className={clsx("w-1.5 h-1.5 rounded-full", {
          "bg-emerald-500 animate-pulse": status === "live",
          "bg-amber-500": status === "building",
          "bg-sky-500": status === "planned",
          "bg-slate-400": status === "archived",
        })}
        aria-hidden="true"
      />
      {text}
    </span>
  );
};
