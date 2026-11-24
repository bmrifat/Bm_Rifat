"use client";

import React from "react";
import { Cpu, ShieldCheck, Award, Activity } from "@/components/ui/Icons";

interface ExecutiveProofStatsProps {
  isBn?: boolean;
}

export const ExecutiveProofStats: React.FC<ExecutiveProofStatsProps> = ({ isBn = false }) => {
  const stats = [
    {
      metric: "2",
      label: isBn ? "সার্বভৌম স্বাস্থ্য প্ল্যাটফর্ম" : "Sovereign Health Platforms",
      detail: isBn ? "SasthoSathi AI & DocClinic" : "SasthoSathi AI & DocClinic",
      icon: Cpu,
    },
    {
      metric: "170M+",
      label: isBn ? "বাঙালি নাগরিক লক্ষ্যমাত্রা" : "Bengali Population Mission",
      detail: isBn ? "মাতৃভাষায় ক্লিনিক্যাল ইনটেলিজেন্স" : "Mother-tongue clinical access",
      icon: Activity,
    },
    {
      metric: "Ex-Secretary",
      label: isBn ? "ডিআইইউ স্পিকার্স ক্লাব" : "DIU CSE Speakers Club",
      detail: isBn ? "সাবেক সাংগঠনিক নেতৃত্ব ও টিম" : "Executive organizational leadership",
      icon: Award,
    },
    {
      metric: "0",
      label: isBn ? "থার্ড-পার্টি ট্র্যাকার" : "Third-Party Trackers",
      detail: isBn ? "পূর্ণাঙ্গ প্রাইভেসি ও সার্বভৌম আর্কিটেকচার" : "100% private, sovereign telemetry",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
      {stats.map((s, idx) => {
        const IconComponent = s.icon;
        return (
          <div
            key={idx}
            className="p-3 sm:p-3.5 rounded-xl bg-surface/50 border border-border/70 shadow-soft hover:bg-surface hover:border-gold/40 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="font-serif font-bold text-base sm:text-lg text-text tracking-tight group-hover:text-accent transition-colors">
                {s.metric}
              </span>
              <IconComponent className="w-3.5 h-3.5 text-muted/60 group-hover:text-accent transition-colors" aria-hidden="true" />
            </div>
            <div className="text-[11.5px] font-medium text-text leading-tight mb-0.5">
              {s.label}
            </div>
            <div className="text-[10px] text-muted leading-tight line-clamp-1 font-mono">
              {s.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
};
