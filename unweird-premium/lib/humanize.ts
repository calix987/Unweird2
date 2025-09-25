export type HumanizeOptions = {
  cliche: boolean;
  jargon: boolean;
  shorten: boolean;
  warmer: boolean;
};
export const defaultOptions: HumanizeOptions = { cliche: true, jargon: true, shorten: true, warmer: true };

const clicheMap: Record<string,string> = {
  "in today’s world": "now",
  "it is important to note that": "note that",
  "in order to": "to",
  "holistic": "complete",
  "unlock": "enable",
  "ecosystems": "systems",
  "furthermore": "also",
  "moreover": "also"
};

const jargonMap: Record<string,string> = {
  "stakeholders": "people",
  "leverage": "use",
  "roadmaps": "plans",
  "scalable": "can grow",
  "value": "benefit"
};

function replacePhrases(input: string, pairs: Record<string,string>) {
  let s = input;
  for (const [k,v] of Object.entries(pairs)) {
    const re = new RegExp("\\b" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "ig");
    s = s.replace(re, v);
  }
  return s;
}

function shortenLong(input: string) {
  return input.split(/(?<=[.!?])\s+/).map(sentence => {
    if (sentence.length < 180) return sentence;
    // break around commas
    const parts = sentence.split(/,\s+/);
    if (parts.length > 1) return parts.slice(0,2).join(", ") + ".";
    return sentence.slice(0,160) + "…";
  }).join(" ");
}

function warmify(input: string) {
  return input
    .replace(/\bshould\b/gi, "could")
    .replace(/\bmust\b/gi, "might")
    .replace(/\bwe will\b/gi, "let’s");
}

export function humanize(text: string, opts: HumanizeOptions = defaultOptions) {
  let out = text;
  if (opts.cliche) out = replacePhrases(out, clicheMap);
  if (opts.jargon) out = replacePhrases(out, jargonMap);
  if (opts.shorten) out = shortenLong(out);
  if (opts.warmer) out = warmify(out);
  return out.trim();
}
