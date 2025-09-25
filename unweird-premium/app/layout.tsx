import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unweird — Make AI read like you",
  description: "Evidence-first AI detector + rewrites with cadence controls",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-white/10 sticky top-0 z-20 backdrop-blur bg-black/40">
          <nav className="container-xxl h-14 flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight">Unweird</Link>
            <div className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/write">Write</Link>
              <Link href="/images">Images</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </nav>
        </header>
        <main className="container-xxl py-10">{children}</main>
        <footer className="container-xxl py-12 text-sm text-white/60">
          © 2025 Unweird — Make AI read like you.
        </footer>
      </body>
    </html>
  );
}
