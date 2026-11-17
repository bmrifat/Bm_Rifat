import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-surface rounded-card border border-border p-6 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]",
        {
          "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg": hoverable,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
