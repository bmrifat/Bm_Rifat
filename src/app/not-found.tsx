import React from "react";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d0c0a] text-[#f7f4ed] flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md text-center space-y-4">
          <div className="text-lg font-mono font-bold text-[#dfb15b]">404</div>
          <h1 className="text-2xl font-serif font-semibold">Page Not Found / পৃষ্ঠাটি পাওয়া যায়নি</h1>
          <p className="text-sm opacity-70 leading-relaxed">
            The requested page does not exist or has been relocated.
            <br />
            অনুরোধকৃত পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-5 py-2 rounded-full border border-white/20 text-xs font-medium hover:border-[#dfb15b] transition-colors"
            >
              Return Home / মূল পাতায় ফিরে যান
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
