import React from "react";
import { Link } from "@/i18n/routing";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <SectionContainer spaced={false}>
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-display font-extrabold text-2xl mx-auto">
            404
          </div>
          <h1 className="text-3xl font-display font-bold text-text">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-fg text-xs font-bold hover:opacity-90 transition-all shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home / মূল পাতায় ফিরে যান</span>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
