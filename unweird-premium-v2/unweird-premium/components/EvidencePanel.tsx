"use client";
import type { Evidence } from "@/lib/analysis";

export default function EvidencePanel({ data }: { data: Evidence | null }) {
  if (!data) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Evidence view</h3>
        <p className="text-sm text-slate-600">Run <span className="font-medium">Detect</span> to see likelihood, confidence band, sentence heatmap, and feature attributions.</p>
      </div>
    );
  }
  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Evidence</h3>
        <span className="badge">Stability: {data.stability}</span>
      </div>
      <div className="space-y-2">
        <div className="text-sm">Likelihood</div>
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-brand-600" style={{ width: `${Math.round(data.likelihood * 100)}%` }}/>
        </div>
        <div className="text-sm text-slate-600">Confidence band: <span className="font-medium">{data.band}</span></div>
      </div>
      <div className="space-y-2">
        <div className="font-medium">Sentence heatmap</div>
        <div className="space-y-1">
          {data.sentences.map((s, i) => (
            <div key={i} className="rounded-md px-2 py-1 text-sm" style={{ backgroundColor: `rgba(42,142,255,${0.15 + s.score * 0.5})` }}>
              {s.text}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="font-medium">Feature attributions</div>
        <ul className="text-sm text-slate-700 space-y-1">
          {Object.entries(data.features).map(([k, v]) => (
            <li key={k} className="flex items-center gap-2">
              <span className="w-56 shrink-0">{k}</span>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-slate-800" style={{ width: `${Math.min(100, Math.round(v * 100))}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">Indicators, not verdicts. Use with other evidence.</p>
      </div>
    </div>
  );
}
