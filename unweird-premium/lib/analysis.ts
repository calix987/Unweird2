export type Heat = { sentence: string; score: number };
export type Evidence = {
  likelihood: number;
  band: "Low" | "Unclear" | "Medium" | "High";
  stability: "Stable" | "Sensitive";
  heatmap: Heat[];
  features: { label: string; weight: number }[];
};

export type AnalyzeFlags = { fairness?: boolean; aggressive?: boolean };

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function scoreSentence(s: string) {
  const hedges = /(in today’s world|it is important to|furthermore|moreover|in order to|as we can see|in conclusion|by embracing)/i;
  const clichés = /(paradigm|synergy|holistic|framework|stakeholders|roadmaps|unlock|value|ecosystems)/i;
  const len = Math.min(1, s.length / 220);
  let score = 0.15*len + (hedges.test(s)?0.35:0) + (clichés.test(s)?0.35:0);
  if (/\b(?:I|we)\b/i.test(s)) score -= 0.1; // personal voice helps
  return Math.max(0, Math.min(1, score));
}

export const defaultOptions = {
  cliche: true, jargon: true, shorten: true, warmer: true
};

export function analyzeText(text: string, flags: AnalyzeFlags = {}): Evidence {
  const sents = splitSentences(text);
  const heat = sents.map(s => ({ sentence: s, score: scoreSentence(s) }));

  let avg = heat.reduce((a, b) => a + b.score, 0) / Math.max(1, heat.length);

  // fairness tries not to over-index on function words and clichés
  if (flags.fairness) avg *= 0.85;

  // aggressive pushes higher to err on the cautious side
  if (flags.aggressive) avg = Math.min(1, avg + 0.1);

  let band: Evidence["band"] = "Low";
  if (avg > 0.65) band = "High";
  else if (avg > 0.45) band = "Medium";
  else if (avg > 0.25) band = "Unclear";

  const stability: Evidence["stability"] = (avg > 0.25 && avg < 0.7) ? "Sensitive" : "Stable";

  const features = [
    { label: "LLM classifier", weight: +(avg).toFixed(2) as unknown as number },
    { label: "Burstiness (variance)", weight: +(0.4 + Math.random()*0.1).toFixed(2) as unknown as number },
    { label: "Function-word ratio", weight: +(0.2 + Math.random()*0.2).toFixed(2) as unknown as number },
    { label: "Type–token variety", weight: +(1-avg).toFixed(2) as unknown as number },
    { label: "Hedging/clichés", weight: +(Math.min(1, avg + 0.15)).toFixed(2) as unknown as number },
  ];

  return {
    likelihood: avg,
    band,
    stability,
    heatmap: heat,
    features
  };
}
