import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-10 md:grid-cols-2 items-center">
      <div className="space-y-6">
        <span className="badge">Evidence-first</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Make AI read like <span className="text-brand-600">you</span>.
        </h1>
        <p className="text-lg text-slate-600">
          Confidence band, heatmap, and stability—paired with humanizing rewrites.
          No API key required for the demo.
        </p>
        <div className="flex gap-3">
          <Link href="/write" className="btn-primary">Try the editor</Link>
          <Link href="/images" className="btn-ghost">Image checks</Link>
        </div>
      </div>
      <div className="card p-6">
        <div className="h-60 bg-gradient-to-br from-brand-100 to-slate-50 rounded-xl grid place-items-center text-slate-500">
          Demo UI
        </div>
      </div>
    </section>
  );
}
