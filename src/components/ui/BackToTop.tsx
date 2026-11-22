"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "@/components/ui/Icons";

interface BackToTopProps {
  isBn?: boolean;
}

export function BackToTop({ isBn = false }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-surface/90 hover:bg-surface border border-border/90 hover:border-gold/50 shadow-soft backdrop-blur-md text-muted hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      aria-label={isBn ? "উপরে যান" : "Back to top"}
      title={isBn ? "উপরে যান ↑" : "Back to top ↑"}
    >
      <span className="rotate-90 inline-block">
        <ArrowLeft className="w-4 h-4" />
      </span>
    </button>
  );
}
