
"use client";

import { useMemo, useState } from "react";
import { analyzeText, type Evidence, defaultOptions } from "@/lib/analysis";
import { humanize } from "@/lib/humanize";
import EvidencePanel from "@/components/EvidencePanel";

export default function WritePage() {
  const [text, setText] = useState<string>("");
  const [fair, setFair] = useState(true);
  const [agg, setAgg] = useState(false);
  const [opts, setOpts] = useState(defaultOptions);
  const evidence: Evidence | null = useMemo(() => {
    if (!text.trim()) return null;
    return analyzeText(text, { fairness: fair, aggressive: agg });
  }, [text, fair, agg]);

  const humanized = useMemo(() => {
    if (!text.trim()) return "";
    return humanize(text, opts);
  }, [text, opts]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="card p-6 space-y-3">
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={fair} onChange={e => setFair(e.target.checked)} />
            <span>Fairness Mode</span>
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agg} onChange={e => setAgg(e.target.checked)} />
            <span>Aggressive Mode</span>
          </label>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text…"
          className="w-full h-[420px] p-4 rounded-xl bg-black/40 border border-white/10 resize-vertical"
        />
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={opts.cliche} onChange={e => setOpts({...opts, cliche: e.target.checked})}/>
            Cliché cleanup
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={opts.jargon} onChange={e => setOpts({...opts, jargon: e.target.checked})}/>
            Jargon buster
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={opts.shorten} onChange={e => setOpts({...opts, shorten: e.target.checked})}/>
            Shorten long sentences
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={opts.warmer} onChange={e => setOpts({...opts, warmer: e.target.checked})}/>
            Warmer tone
          </label>
        </div>
      </section>

      <section className="space-y-6">
        <EvidencePanel evidence={evidence} />
        <div className="card p-6">
          <div className="text-sm text-white/60 mb-2">Humanize (preview)</div>
          <pre className="whitespace-pre-wrap text-sm leading-6">{humanized || "—"}</pre>
        </div>
      </section>
    </div>
  );
}
