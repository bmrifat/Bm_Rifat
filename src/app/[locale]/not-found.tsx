import React from "react";
import { Link } from "@/i18n/routing";
import { Home } from "@/components/ui/Icons";

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <div className="max-w-md mx-auto space-y-6 px-4">
        <div className="w-14 h-14 rounded-2xl bg-surface-subtle border border-border text-text flex items-center justify-center font-serif font-medium text-lg mx-auto">
          404
        </div>
        <h1 className="text-2xl font-serif font-medium text-text">
          Page Not Found / পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          The page you requested does not exist or has been relocated.
          <br />
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা খুঁজে পাওয়া যায়নি।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-surface hover:bg-surface-subtle text-text text-xs font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home / মূল পাতায় ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
