"use client";

import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Check, Copy } from "@/components/ui/Icons";

interface QuickContactBarProps {
  email: string;
  phone: string;
  displayPhone: string;
  github: string;
  linkedin: string;
  isBn?: boolean;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({
  email,
  phone,
  displayPhone,
  github,
  linkedin,
  isBn = false,
}) => {
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2200);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
      {/* Email with direct copy trigger */}
      <div className="inline-flex items-center rounded-full bg-surface border border-border/80 text-text shadow-soft group transition-all hover:border-gold/60">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 pl-3 py-1.5 pr-2 hover:text-accent transition-colors"
          title={isBn ? "সরাসরি ইমেইল করুন" : "Send direct email"}
        >
          <Mail className="w-3.5 h-3.5 text-muted/70 group-hover:text-accent transition-colors" aria-hidden="true" />
          <span className="font-mono text-[12.5px]">{email}</span>
        </a>
        <button
          type="button"
          onClick={() => copyToClipboard(email, "email")}
          aria-label={copiedType === "email" ? (isBn ? "ইমেইল কপি হয়েছে" : "Email copied") : (isBn ? "ইমেইল কপি করুন" : "Copy email")}
          className="pr-2.5 pl-1 py-1.5 text-muted hover:text-text transition-colors border-l border-border/60"
        >
          {copiedType === "email" ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-medium">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? "কপি" : "Copied"}</span>
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted/60 hover:text-text" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Phone with direct copy trigger */}
      <div className="inline-flex items-center rounded-full bg-surface border border-border/80 text-text shadow-soft group transition-all hover:border-gold/60">
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-1.5 pl-3 py-1.5 pr-2 hover:text-accent transition-colors"
          title={isBn ? "সরাসরি কল করুন" : "Call direct"}
        >
          <Phone className="w-3.5 h-3.5 text-muted/70 group-hover:text-accent transition-colors" aria-hidden="true" />
          <span className="font-mono text-[12.5px]">{displayPhone}</span>
        </a>
        <button
          type="button"
          onClick={() => copyToClipboard(phone, "phone")}
          aria-label={copiedType === "phone" ? (isBn ? "ফোন নম্বর কপি হয়েছে" : "Phone copied") : (isBn ? "ফোন নম্বর কপি করুন" : "Copy phone")}
          className="pr-2.5 pl-1 py-1.5 text-muted hover:text-text transition-colors border-l border-border/60"
        >
          {copiedType === "phone" ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-medium">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? "কপি" : "Copied"}</span>
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted/60 hover:text-text" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* GitHub */}
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-muted hover:text-text hover:border-text/30 shadow-soft transition-all"
        aria-label="BM Rifat GitHub Profile"
      >
        <Github className="w-3.5 h-3.5" aria-hidden="true" />
        <span>GitHub</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-muted hover:text-text hover:border-text/30 shadow-soft transition-all"
        aria-label="BM Rifat LinkedIn Profile"
      >
        <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
        <span>LinkedIn</span>
      </a>
    </div>
  );
};
