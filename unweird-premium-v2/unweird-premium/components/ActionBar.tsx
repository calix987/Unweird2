"use client";

import { useState } from "react";
import { humanizeText, HumanizeOptions } from "@/lib/humanize";

type Props = { value: string; onChange(v: string): void; };

export default function ActionBar({ value, onChange }: Props) {
  const [opts, setOpts] = useState<HumanizeOptions>({
    clicheCleanup: true,
    jargonBuster: true,
    shortenLong: true,
    warmerTone: true,
    preserveQuotes: true
  });

  function toggle(key: keyof HumanizeOptions) {
    setOpts(o => ({ ...o, [key]: !o[key] }));
  }

  return (
    <div className="card p-4 space-y-4">
      <div className="flex flex-wrap gap-3">
        {["clicheCleanup","jargonBuster","shortenLong","warmerTone","preserveQuotes"].map((k) => (
          <label key={k} className="inline-flex items-center gap-2">
            <input type="checkbox" checked={(opts as any)[k]} onChange={() => toggle(k as keyof HumanizeOptions)} />
            <span className="text-sm">{label(k)}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="btn-primary" onClick={() => onChange(humanizeText(value, opts))}>Humanize</button>
        <span className="text-sm text-slate-500">Edits avoid quotes/code and keep your voice, while trimming clichés and jargon.</span>
      </div>
    </div>
  );
}
function label(k: string) {
  const map: Record<string,string> = {
    clicheCleanup: "Cliché cleanup",
    jargonBuster: "Jargon buster",
    shortenLong: "Shorten long sentences",
    warmerTone: "Warmer tone",
    preserveQuotes: "Preserve quotes/code"
  };
  return map[k] || k;
}
