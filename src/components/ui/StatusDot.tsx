import React from "react";
import clsx from "clsx";

interface StatusDotProps {
  status: "live" | "building" | "planned";
  text: string;
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, text, className }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-[12px] text-muted tracking-tight shrink-0",
        className
      )}
    >
      <span
        className={clsx("w-1.5 h-1.5 rounded-full shrink-0", {
          "bg-live": status === "live",
          "bg-building": status === "building",
          "bg-accent": status === "planned",
        })}
        aria-hidden="true"
      />
      <span>{text}</span>
    </span>
  );
};
