"use client";

import React, { useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import {
  GalleryItem,
  GalleryCategory,
  galleryCategories,
} from "@/data/gallery";
import {
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Sparkles,
  Video,
  Award,
} from "@/components/ui/Icons";

interface GallerySectionProps {
  items: GalleryItem[];
  isBn: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  items,
  isBn,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const loc = isBn ? "bn" : "en";

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Active item in modal
  const selectedItem =
    selectedIndex !== null && filteredItems[selectedIndex]
      ? filteredItems[selectedIndex]
      : null;

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev === filteredItems.length - 1 ? 0 : prev + 1) : null
        );
      }
    },
    [selectedIndex, filteredItems.length]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleKeyDown]);

  const openItem = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === filteredItems.length - 1 ? 0 : selectedIndex + 1
    );
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? filteredItems.length - 1 : selectedIndex - 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label={isBn ? "গ্যালারি ক্যাটাগরি ফিল্টার" : "Gallery category filters"}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {galleryCategories.map((cat) => {
          const count =
            cat.id === "all"
              ? items.length
              : items.filter((it) => it.category === cat.id).length;

          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(null);
              }}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-all min-h-[36px] ${
                isActive
                  ? "bg-text text-bg shadow-soft"
                  : "bg-surface/80 text-muted hover:text-text hover:bg-surface border border-border/80"
              }`}
            >
              <span>{cat.label[loc]}</span>
              <span
                className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-bg/20 text-bg"
                    : "bg-surface-subtle text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openItem(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openItem(idx);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${item.title[loc]} - ${isBn ? "বড় করে দেখুন" : "View media"}`}
            className="group relative rounded-xl overflow-hidden bg-surface border border-border/80 hover:border-gold/60 shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {/* Visual Media Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
              <Image
                src={item.src}
                alt={item.title[loc]}
                fill
                sizes="(max-width: 640px) 100vw, 340px"
                className="object-cover group-hover:scale-[1.03] motion-reduce:transform-none transition-transform duration-500 ease-out"
                priority={idx < 2}
              />

              {/* Gradient scrim for text & badge protection */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
              />

              {/* Top Bar inside image */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-gold border border-gold/30 font-semibold shadow-soft">
                  {item.category}
                </span>

                {item.mediaType === "video" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-rose-500/90 text-white backdrop-blur-md shadow-soft">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Video</span>
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Bottom info inside visual container */}
              <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none space-y-0.5">
                <div className="flex items-center gap-2 text-[11px] text-white/80 font-mono">
                  <span>{item.date}</span>
                  {item.location && (
                    <>
                      <span>·</span>
                      <span className="truncate">{item.location[loc]}</span>
                    </>
                  )}
                </div>
                <h3 className="text-[14.5px] sm:text-[15px] font-medium text-white tracking-tight line-clamp-1 font-serif">
                  {item.title[loc]}
                </h3>
              </div>
            </div>

            {/* Bottom Card Caption & Tags */}
            <div className="p-3 sm:p-3.5 bg-surface space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-[13px] text-muted line-clamp-2 leading-relaxed">
                {item.caption[loc]}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-muted/90 border border-border/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future-proof Note / Hint for BM Rifat */}
      <div className="pt-2 text-center">
        <p className="text-[12px] text-muted/70 font-mono">
          {isBn
            ? "✦ নতুন কোনো অর্জন, স্টার্টআপ বা বক্তৃতার ছবি/ভিডিও সহজেই src/data/gallery.ts ফাইলে যুক্ত করা যায়।"
            : "✦ Seamlessly extensible: add new startup milestones, awards or videos in src/data/gallery.ts"}
        </p>
      </div>

      {/* Accessible Interactive Lightbox Modal */}
      {selectedItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title[loc]}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          {/* Main Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-surface rounded-2xl border border-border/80 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/70 bg-surface/90 backdrop-blur-sm z-10 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-muted font-mono">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
              </div>

              {/* Close Button with 44x44px Accessible Touch Hitbox */}
              <button
                onClick={closeLightbox}
                aria-label={isBn ? "গ্যালারি বন্ধ করুন" : "Close media viewer"}
                className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center text-muted hover:text-text hover:bg-surface-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Stage */}
            <div className="relative bg-black/90 flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[60vh] overflow-hidden shrink-0">
              {selectedItem.mediaType === "video" && selectedItem.videoUrl ? (
                <div className="w-full aspect-video max-h-[60vh]">
                  <iframe
                    src={selectedItem.videoUrl}
                    title={selectedItem.title[loc]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[320px] sm:h-[460px]">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.title[loc]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain p-2"
                    priority
                  />
                </div>
              )}

              {/* Prev / Next Buttons (if more than 1 item) */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={prevItem}
                    aria-label={isBn ? "পূর্ববর্তী ছবি" : "Previous media"}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextItem}
                    aria-label={isBn ? "পরবর্তী ছবি" : "Next media"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Information Drawer / Caption Box */}
            <div className="p-4 sm:p-6 bg-surface overflow-y-auto space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-semibold text-text font-serif tracking-tight">
                  {selectedItem.title[loc]}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{selectedItem.date}</span>
                  </div>

                  {selectedItem.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{selectedItem.location[loc]}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[14.5px] text-text/90 leading-relaxed font-sans">
                {selectedItem.caption[loc]}
              </p>

              {/* Tags & Direct Link */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/60">
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-surface-subtle text-muted border border-border/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {selectedItem.videoUrl && (
                  <a
                    href={selectedItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline font-mono inline-flex items-center gap-1"
                  >
                    <span>{isBn ? "ইউটিউবে দেখুন" : "Watch External"}</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
