import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Unweird — Make AI read like you.",
  description: "Evidence-first detection with humanizing rewrites. Privacy on by default."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-white">▭</span>
              <span>Unweird</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/write" className="hover:text-slate-900 text-slate-600">Write</Link>
              <Link href="/images" className="hover:text-slate-900 text-slate-600">Images</Link>
              <Link href="/pricing" className="hover:text-slate-900 text-slate-600">Pricing</Link>
              <Link href="/privacy" className="hover:text-slate-900 text-slate-600">Privacy</Link>
              <a href="#" className="btn-ghost">Sign in</a>
              <a href="#" className="btn-primary">Get started</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t mt-16">
          <div className="container py-10 text-sm text-slate-500">
            © {new Date().getFullYear()} Unweird — Make AI read like you.
          </div>
        </footer>
      </body>
    </html>
  );
}
