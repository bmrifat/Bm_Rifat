"use client";

import React, { useState } from "react";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  FileText,
  Volume2,
  Users,
  Database,
  Lock,
  Printer,
} from "lucide-react";

interface VentureArchitecturePreviewProps {
  slug: string;
  isBn?: boolean;
}

export function VentureArchitecturePreview({
  slug,
  isBn = false,
}: VentureArchitecturePreviewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (slug === "sasthosathi") {
    const pipelines = [
      {
        title: isBn ? "১. প্রেসক্রিপশন ও ল্যাব রিপোর্ট এআই অ্যানালাইসিস" : "1. Prescription & Lab Report AI Pipeline",
        badge: "Multimodal AI Cascade",
        steps: [
          {
            icon: FileText,
            label: isBn ? "ইনপুট স্ক্যান" : "Patient Upload",
            detail: isBn ? "ছবি / পিডিএফ প্রেসক্রিপশন" : "Prescription Image / Lab PDF",
          },
          {
            icon: Cpu,
            label: isBn ? "জেমিনাই ভিশন ওসিআর" : "Gemini Vision OCR",
            detail: isBn ? "হাতের লেখা ডাক্তার প্রেসক্রিপশন এক্সট্রাকশন" : "Handwritten Medical OCR",
          },
          {
            icon: ShieldCheck,
            label: isBn ? "ক্লিনিক্যাল গার্ডরেইল" : "Clinical Guardrail",
            detail: isBn ? "সেফটি ফিল্টার ও ফলব্যাক ক্যাস্কেড" : "Zero-Hallucination Filter",
          },
          {
            icon: Volume2,
            label: isBn ? "বাংলা অডিও সিন্থেসিস" : "Bengali Edge TTS",
            detail: isBn ? "রোগীর মাতৃভাষায় অডিও সারসংক্ষেপ" : "Voice Readout for Patients",
          },
        ],
      },
      {
        title: isBn ? "২. জরুরি স্বাস্থ্য সহায়তা ও ডিরেক্টরি নেটওয়ার্ক" : "2. Emergency Triage & Hospital Cascade",
        badge: "Real-time Geolocation",
        steps: [
          {
            icon: Activity,
            label: isBn ? "লক্ষণ যাচাই" : "Symptom Triage",
            detail: isBn ? "জরুরি অ্যাম্বুলেন্স প্রয়োজন কিনা মূল্যায়ন" : "Red-flag Clinical Severity",
          },
          {
            icon: Zap,
            label: isBn ? "জরুরি অ্যালার্ট" : "Emergency Hub",
            detail: isBn ? "নিকটস্থ হাসপাতাল ও ব্লাড ব্যাংক ডিরেক্টরি" : "Hospital & Blood Bank Network",
          },
          {
            icon: Lock,
            label: isBn ? "এনক্রিপ্টেড রেকর্ড" : "Patient Privacy",
            detail: isBn ? "সম্পূর্ণ সুরক্ষিত স্থানীয় হিস্ট্রি" : "Zero PII Leakage",
          },
        ],
      },
    ];

    const current = pipelines[activeTab] || pipelines[0];

    return (
      <div className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-surface via-surface-subtle/40 to-surface">
        {/* Toggle Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse" />
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-muted font-semibold">
              {isBn ? "লাইভ আর্কিটেকচার ফ্লোচার্ট" : "Live Architectural Flowchart"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-subtle p-1 rounded-lg border border-border/70">
            {pipelines.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-surface text-gold font-semibold shadow-xs border border-border/80"
                    : "text-muted hover:text-text"
                }`}
              >
                Pipeline {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline Info */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif font-medium text-[15.5px] text-text">
            {current.title}
          </h4>
          <span className="font-mono text-[10.5px] text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
            {current.badge}
          </span>
        </div>

        {/* Pipeline Diagram Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {current.steps.map((st, sIdx) => {
            const Icon = st.icon;
            return (
              <div
                key={sIdx}
                className="relative p-3.5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-2 group hover:border-gold/50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-muted/60 uppercase tracking-widest block">
                    Step 0{sIdx + 1}
                  </span>
                  <div className="font-medium text-[13.5px] text-text">
                    {st.label}
                  </div>
                  <p className="text-[12px] text-muted leading-tight">
                    {st.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // DocClinic Pipeline
  const docPipelines = [
    {
      title: isBn ? "১. মাল্টি-টেন্যান্ট চেম্বার আইসোলেশন ও কনকারেন্সি লক" : "1. Multi-Tenant Queue Lock Architecture",
      badge: "Zero Overbooking Guarantee",
      steps: [
        {
          icon: Users,
          label: isBn ? "রোগীর বুকিং কল" : "Booking Request",
          detail: isBn ? "সিরিয়াল কনকারেন্ট ট্রাফিক" : "Concurrent Slot Selection",
        },
        {
          icon: Lock,
          label: isBn ? "রো-লেভেল লক" : "Atomic Queue Lock",
          detail: isBn ? "কনকারেন্সি-সেফ ট্রানজ্যাকশন" : "MySQL SELECT FOR UPDATE",
        },
        {
          icon: ShieldCheck,
          label: isBn ? "টেন্যান্ট গার্ড" : "Tenant Isolation",
          detail: isBn ? "চেম্বার অনুযায়ী সম্পূর্ণ আলাদা ডেটা" : "Enforced Chamber Context",
        },
        {
          icon: Database,
          label: isBn ? "রিয়েলটাইম সিঙ্ক" : "State Broadcast",
          detail: isBn ? "ডাক্তার ও রিসেপশন স্ক্রিনে ইনস্ট্যান্ট আপডেট" : "Live Queue State",
        },
      ],
    },
    {
      title: isBn ? "২. স্মার্ট প্রেসক্রিপশন ডেস্ক ও ড্রাগ ডাটাবেস" : "2. Smart Prescription Desk Engine",
      badge: "Clinical Productivity",
      steps: [
        {
          icon: Cpu,
          label: isBn ? "ওসিআর রিপোর্ট" : "Prior Lab OCR",
          detail: isBn ? "আগের প্রেসক্রিপশন ও রিপোর্টের স্বয়ংক্রিয় সারাংশ" : "Gemini Lab Synthesis",
        },
        {
          icon: Activity,
          label: isBn ? "ঔষধ সার্চ" : "BD Drug Database",
          detail: isBn ? "ব্র্যান্ড ও জেনেরিক সার্চিং" : "Rapid Autocomplete & Dosages",
        },
        {
          icon: Printer,
          label: isBn ? "এক ক্লিকে প্রিন্ট" : "1-Click PDF Rx",
          detail: isBn ? "বাংলায় নির্দেশিকা সহ আধুনিক ফরম্যাট" : "Instant Formatted Print",
        },
      ],
    },
  ];

  const currentDoc = docPipelines[activeTab] || docPipelines[0];

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-surface via-surface-subtle/40 to-surface">
      {/* Toggle Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-building animate-pulse" />
          <span className="font-mono text-[11.5px] uppercase tracking-wider text-muted font-semibold">
            {isBn ? "লাইভ আর্কিটেকচার ফ্লোচার্ট" : "SaaS Engineering Engine"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-subtle p-1 rounded-lg border border-border/70">
          {docPipelines.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-surface text-gold font-semibold shadow-xs border border-border/80"
                  : "text-muted hover:text-text"
              }`}
            >
              Engine {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Info */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-serif font-medium text-[15.5px] text-text">
          {currentDoc.title}
        </h4>
        <span className="font-mono text-[10.5px] text-building bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
          {currentDoc.badge}
        </span>
      </div>

      {/* Pipeline Diagram Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {currentDoc.steps.map((st, sIdx) => {
          const Icon = st.icon;
          return (
            <div
              key={sIdx}
              className="relative p-3.5 rounded-xl bg-surface border border-border/80 shadow-soft space-y-2 group hover:border-accent/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-muted/60 uppercase tracking-widest block">
                  Step 0{sIdx + 1}
                </span>
                <div className="font-medium text-[13.5px] text-text">
                  {st.label}
                </div>
                <p className="text-[12px] text-muted leading-tight">
                  {st.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
