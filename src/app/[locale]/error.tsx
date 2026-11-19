"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "@/components/ui/Icons";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="py-24 text-center">
      <div className="max-w-md mx-auto space-y-6 px-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-serif font-medium text-text">
          Something went wrong
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          An unexpected error occurred while rendering this page.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-surface hover:bg-surface-subtle text-text text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
