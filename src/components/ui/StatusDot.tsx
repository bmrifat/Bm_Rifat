import React from "react";
import clsx from "clsx";

interface StatusDotProps {
  status: "live" | "building" | "planned";
  text: string;
  className?: string;
  asPill?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  text,
  className,
  asPill = true,
}) => {
  if (asPill) {
    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium tracking-tight border shrink-0 transition-all",
          {
            "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25":
              status === "live",
            "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25":
              status === "building",
            "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25":
              status === "planned",
          },
          className
        )}
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {status === "live" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={clsx("relative inline-flex rounded-full h-1.5 w-1.5", {
              "bg-live": status === "live",
              "bg-building": status === "building",
              "bg-accent": status === "planned",
            })}
          />
        </span>
        <span>{text}</span>
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-[12px] text-muted tracking-tight shrink-0",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status === "live" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={clsx("relative inline-flex rounded-full h-1.5 w-1.5", {
            "bg-live": status === "live",
            "bg-building": status === "building",
            "bg-accent": status === "planned",
          })}
        />
      </span>
      <span>{text}</span>
    </span>
  );
};
