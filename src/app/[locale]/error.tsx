"use client";

import React, { useEffect } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

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
      <SectionContainer spaced={false}>
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-display font-bold text-2xl mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text">
            Something went wrong
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            An unexpected error occurred while rendering this page.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
