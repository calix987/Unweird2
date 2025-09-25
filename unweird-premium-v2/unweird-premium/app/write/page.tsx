"use client";
import { useState } from "react";
import EvidencePanel from "@/components/EvidencePanel";
import ActionBar from "@/components/ActionBar";
import { analyze, type Evidence } from "@/lib/analysis";

export default function WritePage() {
  const [text, setText] = useState<string>("");
  const [evidence, setEvidence] = useState<Evidence | null>(null);

  function detect() {
    setEvidence(analyze(text));
    setTimeout(() => document.getElementById("evidence")?.scrollIntoView({ behavior: "smooth" }), 50);
  }
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" defaultChecked/><span className="text-sm">Fairness Mode</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox"/><span className="text-sm">Aggressive Mode</span>
          </label>
        </div>
        <div className="card p-0 overflow-hidden">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text..." className="w-full h-[380px] p-4 resize-none text-[15px]" />
        </div>
        <ActionBar value={text} onChange={setText} />
        <div className="flex gap-3">
          <button className="btn-primary" onClick={detect}>Detect</button>
          <span className="text-sm text-slate-500">Indicators + rewrites run in your browser in this demo.</span>
        </div>
      </section>
      <section id="evidence"><EvidencePanel data={evidence} /></section>
    </div>
  );
}
