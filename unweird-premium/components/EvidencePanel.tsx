"use client";

import type { Evidence } from "@/lib/analysis";

export default function EvidencePanel({ evidence }: { evidence: Evidence | null }) {
  if (!evidence) {
    return (
      <div className="card p-6">
        <div className="text-sm text-white/60">Evidence view</div>
        <div className="text-white/70 mt-1">Run Detect to see likelihood, confidence band, sentence heatmap, and feature attributions.</div>
      </div>
    );
  }
  return (
    <div className="card p-6 space-y-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <div><span className="text-sm text-white/60">Likelihood:</span> <b>{(evidence.likelihood*100).toFixed(0)}%</b></div>
        <div><span className="text-sm text-white/60">Confidence band:</span> <b>{evidence.band}</b></div>
        <div><span className="text-sm text-white/60">Stability:</span> <b>{evidence.stability}</b></div>
      </div>
      <div>
        <div className="text-sm text-white/60 mb-1">Sentence heatmap</div>
        <div className="space-y-2">
          {evidence.heatmap.map((s, i) => (
            <div key={i} className="rounded-lg p-2 text-sm" style={{
              background: `linear-gradient(90deg, rgba(79,70,229,0.25) ${Math.round(s.score*100)}%, transparent 0)`
            }}>
              {s.sentence}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-white/60 mb-1">Feature attributions</div>
        <ul className="text-sm text-white/80 list-disc pl-6">
          {evidence.features.map((f, i) => (
            <li key={i}>{f.label} — weight {f.weight.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
