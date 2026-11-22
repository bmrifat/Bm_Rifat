"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PortraitLightboxProps {
  src?: string;
  alt?: string;
  name?: string;
  isBn?: boolean;
}

const MaximizeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CloseIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function PortraitLightbox({
  src = "/rifat.jpg",
  alt = "BM Rifat",
  name = "BM Rifat",
  isBn = false,
}: PortraitLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen to Escape key and disable body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Compact Default Avatar Button */}
      <div className="relative group inline-block">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative block rounded-2xl bg-gradient-to-br from-surface via-surface-subtle to-surface border border-gold/40 hover:border-gold p-1 shadow-soft transition-all duration-300 group-hover:scale-[1.03] cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
          aria-label={isBn ? "পূর্ণাঙ্গ ছবি দেখতে ক্লিক করুন" : "Click to view full photo"}
          title={isBn ? "পূর্ণাঙ্গ ছবি দেখতে ক্লিক করুন" : "Click to view full photo"}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative">
            <Image
              src={src}
              alt={alt}
              width={96}
              height={96}
              priority
              unoptimized
              className="w-full h-full object-cover object-[center_25%] select-none transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm shadow-sm">
                <MaximizeIcon className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Small corner expand indicator */}
          <span
            className="absolute -bottom-1 -right-1 bg-surface border border-gold/40 text-muted group-hover:text-gold rounded-full p-1 shadow-sm transition-colors"
            aria-hidden="true"
          >
            <MaximizeIcon className="w-2.5 h-2.5" />
          </span>
        </button>
      </div>

      {/* Lightbox / Modal for Full Size Picture */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? `${name}-এর পূর্ণাঙ্গ ছবি` : `Full portrait of ${name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200"
          onClick={handleClose}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-neutral-950 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/25 backdrop-blur-md transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
              aria-label={isBn ? "বন্ধ করুন" : "Close"}
              title={isBn ? "বন্ধ করুন (Esc)" : "Close (Esc)"}
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            {/* Full Portrait Container */}
            <div className="relative w-full overflow-hidden select-none flex items-center justify-center bg-black/40">
              <Image
                src={src}
                alt={alt}
                width={682}
                height={1024}
                priority
                unoptimized
                className="w-full h-auto max-h-[80vh] object-contain sm:object-cover mx-auto"
              />

              {/* Bottom Glassmorphic Editorial Seal */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-5 flex items-end justify-between text-white select-none">
                <div className="space-y-0.5">
                  <p className="font-serif italic text-sm sm:text-base tracking-wide text-amber-200/95 font-medium">
                    &ldquo;Dream Big, Build Bigger&rdquo;
                  </p>
                  <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/80">
                    Tech · Innovation · Impact
                  </p>
                </div>
                <span className="text-[11px] font-mono text-white/85 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
