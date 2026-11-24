"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowUpRight,
  FileText,
  Cpu,
  Mail,
  ShieldCheck,
  ImageIcon,
  X,
  Phone,
} from "@/components/ui/Icons";

interface CommandPaletteProps {
  isBn?: boolean;
  locale?: string;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Ventures" | "Writing" | "Actions";
  href?: string;
  action?: () => void;
  icon: React.FC<{ className?: string }>;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isBn = false,
  locale = "en",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Close palette
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // All command items
  const items: CommandItem[] = [
    {
      id: "sasthosathi",
      title: "SasthoSathi AI",
      subtitle: isBn ? "বাংলা হেলথ এআই ও ফলব্যাক ক্যাসকেড" : "Sovereign patient triage & clinical AI",
      category: "Ventures",
      href: `/${locale}/ventures/sasthosathi`,
      icon: Cpu,
    },
    {
      id: "docclinic",
      title: "DocClinic OS",
      subtitle: isBn ? "মাল্টি-টেন্যান্ট চেম্বার ম্যানেজমেন্ট আর্কিটেকচার" : "Multi-tenant doctor chamber system",
      category: "Ventures",
      href: `/${locale}/ventures/docclinic`,
      icon: Cpu,
    },
    {
      id: "writing",
      title: isBn ? "সবগুলো রচনা ও আর্কিটেকচার বিশ্লেষণ" : "All Architectural Essays",
      subtitle: isBn ? "৬টি ইন-ডেপথ সিস্টেম ডিজাইন প্রবন্ধ" : "6 in-depth technical case studies",
      category: "Writing",
      href: `/${locale}/writing`,
      icon: FileText,
    },
    {
      id: "essay-cascade",
      title: isBn ? "মাল্টি-মডেল এআই ফলব্যাক ক্যাসকেড" : "Multi-Model AI Fallback Cascades",
      subtitle: isBn ? "সার্কিট ব্রেকার ও ক্লিনিক্যাল সেফটি" : "Circuit breakers and latency bounds",
      category: "Writing",
      href: `/${locale}/writing/engineering-multi-model-fallback-cascades-health-ai`,
      icon: FileText,
    },
    {
      id: "essay-tenant",
      title: isBn ? "মাল্টি-টেন্যান্ট ডেটা আইসোলেশন" : "Multi-Tenant Doctor Chamber Isolation",
      subtitle: isBn ? "নেক্সটজেএস ও সিকিউর ডেটাবেস আর্কিটেকচার" : "Database schemas & zero cross-contamination",
      category: "Writing",
      href: `/${locale}/writing/tenant-isolation-strategies-nextjs-mysql`,
      icon: FileText,
    },
    {
      id: "gallery",
      title: isBn ? "ভিজ্যুয়াল ক্রনিকল ও অর্জন গ্যালারি" : "Visual Chronicle & Achievements Gallery",
      subtitle: isBn ? "স্টার্টআপ পিচ, মেমেন্টো ও ফিল্ড ট্রায়াল" : "Key moments, speaking, and chamber trials",
      category: "Navigation",
      href: `/${locale}/#gallery`,
      icon: ImageIcon,
    },
    {
      id: "contact",
      title: isBn ? "যোগাযোগ ও সরাসরি বার্তা" : "Contact & Direct Inquiries",
      subtitle: isBn ? "ইমেইল ও মেসেজ ফরম" : "Get in touch for deep tech advisory",
      category: "Navigation",
      href: `/${locale}/contact`,
      icon: Mail,
    },
    {
      id: "admin",
      title: isBn ? "এক্সিকিউটিভ অ্যানালিটিক্স ড্যাশবোর্ড" : "Executive Telemetry Dashboard",
      subtitle: isBn ? "প্রাইভেট ভিজিটর কাউন্টার ও ট্র্যাকিং" : "Sovereign privacy-first metrics",
      category: "Navigation",
      href: `/${locale}/admin`,
      icon: ShieldCheck,
    },
    {
      id: "copy-email",
      title: isBn ? "ইমেইল কপি করুন" : "Copy Direct Email Address",
      subtitle: "bmrifat93@gmail.com",
      category: "Actions",
      action: () => {
        navigator.clipboard?.writeText("bmrifat93@gmail.com");
        close();
      },
      icon: Mail,
    },
    {
      id: "whatsapp",
      title: isBn ? "হোয়াটসঅ্যাপে মেসেজ পাঠান" : "Open WhatsApp Direct Chat",
      subtitle: "+8801540041246",
      category: "Actions",
      action: () => {
        window.open("https://wa.me/8801540041246", "_blank");
        close();
      },
      icon: Phone,
    },
  ];

  // Filter items
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
      close();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      {/* Trigger Button inside Header/Navbar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={isBn ? "কমান্ড প্যালেট খুলুন (Cmd+K)" : "Open command palette (Cmd+K)"}
        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-subtle/80 hover:bg-surface border border-border/80 text-muted hover:text-text transition-all text-[11.5px] font-mono group"
      >
        <Search className="w-3.5 h-3.5 text-muted/70 group-hover:text-accent transition-colors" aria-hidden="true" />
        <span className="hidden sm:inline">{isBn ? "অনুসন্ধান" : "Search"}</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-surface border border-border/70 text-[10px] text-muted/80">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? "কমান্ড প্যালেট" : "Command Palette"}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={close}
        >
          <div
            className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 bg-surface">
              <Search className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={isBn ? "ভেঞ্চার, প্রবন্ধ বা কমান্ড খুঁজুন..." : "Search ventures, case studies, or actions..."}
                className="w-full bg-transparent text-text placeholder:text-muted/60 focus:outline-none text-sm font-sans"
              />
              <button
                type="button"
                onClick={close}
                aria-label={isBn ? "বন্ধ করুন" : "Close"}
                className="p-1 rounded text-muted hover:text-text"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted font-mono">
                  {isBn ? "কোনো ফলাফল পাওয়া যায়নি।" : "No matching commands found."}
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-left transition-colors ${
                        isSelected
                          ? "bg-gold/10 text-text border border-gold/30"
                          : "text-muted hover:text-text hover:bg-surface-subtle"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg border ${
                            isSelected
                              ? "bg-gold/20 border-gold/40 text-gold"
                              : "bg-surface border-border text-muted"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-text truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-muted truncate font-mono">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted/60 shrink-0">
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer keyboard hints */}
            <div className="px-4 py-2 border-t border-border/60 bg-surface-subtle flex items-center justify-between text-[11px] font-mono text-muted/70">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
