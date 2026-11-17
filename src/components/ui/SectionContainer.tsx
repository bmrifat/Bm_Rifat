import React from "react";
import clsx from "clsx";

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  spaced?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className,
  children,
  as: Component = "section",
  spaced = true,
}) => {
  return (
    <Component
      id={id}
      className={clsx(
        "w-full px-6 max-w-container mx-auto",
        {
          "py-16 md:py-24": spaced,
        },
        className
      )}
    >
      {children}
    </Component>
  );
};
