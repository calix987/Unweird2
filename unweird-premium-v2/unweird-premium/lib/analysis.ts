export type SentenceScore = { text: string; score: number };
export type Evidence = {
  likelihood: number;
  band: string;
  stability: 'Stable' | 'Sensitive';
  sentences: SentenceScore[];
  features: Record<string, number>;
};

export function analyze(text: string): Evidence {
  const sentences = splitSentences(text).filter(Boolean);
  const scores: SentenceScore[] = sentences.map(s => ({
    text: s,
    score: scoreSentence(s)
  }));

  const avg = scores.reduce((a, b) => a + b.score, 0) / Math.max(1, scores.length);
  const variance = scores.reduce((a, b) => a + Math.pow(b.score - avg, 2), 0) / Math.max(1, scores.length);
  const functionWordRatio = functionWordRate(text);
  const clicheWeight = clicheCount(text) > 0 ? 1 : 0;
  const hedging = hedgeCount(text) / Math.max(1, sentences.length);

  let likelihood = clamp(0.3 * avg + 0.2 * functionWordRatio + 0.2 * (1 - variance) + 0.3 * (hedging), 0, 1);
  const band = likelihood > 0.75 ? "Likely" : likelihood > 0.55 ? "Unclear" : "Unlikely";
  const stability = variance > 0.07 ? "Sensitive" : "Stable";

  return {
    likelihood,
    band,
    stability,
    sentences: scores,
    features: {
      "LLM classifier": avg,
      "Burstiness (variance)": variance,
      "Function-word ratio": functionWordRatio,
      "Type–token variety": typeTokenVariety(text),
      "Hedging/clichés": hedging + clicheWeight
    }
  };
}

function splitSentences(t: string): string[] {
  return t.replace(/\n+/g, " ").split(/(?<=[\.\!\?])\s+/).map(s => s.trim());
}

function scoreSentence(s: string): number {
  const len = s.split(/\s+/).length;
  const commas = (s.match(/,/g) || []).length;
  const patterns = [/it is important to note/i, /furthermore/i, /moreover/i, /holistic/i, /ecosystem/i];
  const patternHits = patterns.reduce((n, p) => n + (p.test(s) ? 1 : 0), 0);
  const base = (len > 18 ? 0.7 : 0.4) + (commas > 1 ? 0.1 : 0) + patternHits * 0.05;
  return clamp(base, 0, 1);
}
function functionWordRate(t: string): number {
  const words = t.toLowerCase().match(/[a-z']+/g) || [];
  const functionWords = new Set(["the","and","of","to","in","a","is","that","for","on","with","as","by","from","it","an"]);
  const fw = words.filter(w => functionWords.has(w)).length;
  return clamp(fw / Math.max(1, words.length), 0, 1);
}
function typeTokenVariety(t: string): number {
  const words = (t.toLowerCase().match(/[a-z']+/g) || []);
  const unique = new Set(words);
  return clamp(unique.size / Math.max(1, words.length), 0, 1);
}
function hedgeCount(t: string): number {
  const hedges = /(it seems|it appears|arguably|perhaps|likely|possible|in order to|should|could)/gi;
  return (t.match(hedges) || []).length;
}
function clicheCount(t: string): number {
  const cliches = /(at the end of the day|think outside the box|low-hanging fruit|moving the needle|paradigm shift)/gi;
  return (t.match(cliches) || []).length;
}
function clamp(n: number, min: number, max: number) { return Math.min(Math.max(n, min), max); }
