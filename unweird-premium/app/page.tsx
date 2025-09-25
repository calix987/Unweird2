import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="card p-8">
        <h1 className="text-3xl font-semibold leading-tight">Make AI read like <em>you</em>.</h1>
        <p className="mt-3 text-white/70">
          Evidence‑first detection (confidence band + heatmap + stability)
          and humanizing rewrites with cadence controls.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/write" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">Try the writer</Link>
          <Link href="/images" className="px-4 py-2 rounded-lg border border-white/20">Image checks</Link>
        </div>
      </div>
      <div className="card p-8 overflow-hidden">
        <div className="text-white/70 mb-3">What you get</div>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• Confidence band + sentence heatmap + feature attributions</li>
          <li>• Fairness Mode to reduce bias against non‑native style</li>
          <li>• Rewrites: cliché cleanup, jargon buster, shorten, warmer tone</li>
          <li>• Privacy by default — no storage, all local in this demo</li>
        </ul>
      </div>
    </section>
  );
}
