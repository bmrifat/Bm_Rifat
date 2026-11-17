import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 font-sans p-6">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-4xl font-extrabold text-slate-800">404</h1>
          <p className="text-sm text-slate-600">
            Page not found. The requested URL does not exist.
          </p>
          <Link
            href="/en"
            className="inline-block px-5 py-2 rounded-full bg-sky-600 text-white text-xs font-bold"
          >
            Return to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
