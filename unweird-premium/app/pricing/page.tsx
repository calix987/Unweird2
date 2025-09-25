export default function PricingPage() {
  return (
    <section className="grid md:grid-cols-3 gap-6">
      {[
        {name: "Free", price: "$0", desc: "2 runs/day, 1k words/run, image page preview."},
        {name: "Pro", price: "$19", desc: "400k words/mo, Explain‑Your‑Edit, Cadence Control."},
        {name: "Studio", price: "$29", desc: "Voice DNA, WP plugin, branded reports."},
      ].map(t => (
        <div key={t.name} className="card p-6">
          <div className="text-xl font-semibold">{t.name}</div>
          <div className="text-4xl font-bold mt-2">{t.price}<span className="text-base text-white/60">/mo</span></div>
          <p className="text-white/70 mt-3">{t.desc}</p>
          <button className="mt-6 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2">Choose {t.name}</button>
        </div>
      ))}
    </section>
  );
}
