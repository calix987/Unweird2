export default function PricingPage() {
  const plans = [
    {name: "Free", price: "$0", blurb: "2 runs/day, 1k words/run, image page preview."},
    {name: "Pro", price: "$19/mo", blurb: "400k words/mo, Explain-Your-Edit, Cadence Control."},
    {name: "Studio", price: "$29/mo", blurb: "Voice DNA, WP plugin, branded reports."},
  ];
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {plans.map(p => (
        <div key={p.name} className="card p-6 flex flex-col gap-4">
          <div className="text-sm text-slate-600">{p.name}</div>
          <div className="text-3xl font-bold">{p.price}</div>
          <div className="text-sm text-slate-600">{p.blurb}</div>
          <button className="btn-primary mt-auto">Continue</button>
          <div className="text-xs text-slate-500">No data retention by default.</div>
        </div>
      ))}
    </section>
  );
}
