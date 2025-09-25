export type HumanizeOptions = {
  clicheCleanup?: boolean;
  jargonBuster?: boolean;
  shortenLong?: boolean;
  warmerTone?: boolean;
  preserveQuotes?: boolean;
};

export function humanizeText(input: string, opts: HumanizeOptions): string {
  const preserved: string[] = [];
  const placeholder = (i: number) => `[[PRESERVE_${i}]]`;

  let text = input.replace(/(```[\s\S]*?```|"[^"]*"|\'[^\']*\')/g, (m) => {
    preserved.push(m);
    return placeholder(preserved.length - 1);
  });

  if (opts.clicheCleanup) {
    text = replaceMany(text, {
      "at the end of the day": "ultimately",
      "think outside the box": "be creative",
      "low-hanging fruit": "easy win",
      "moving the needle": "making a difference",
      "paradigm shift": "big change"
    });
  }
  if (opts.jargonBuster) {
    text = replaceMany(text, {
      "synergy": "working well together",
      "holistic": "complete",
      "ecosystem": "environment",
      "leverage": "use",
      "operationalize": "put into practice"
    });
  }
  if (opts.shortenLong) {
    text = text.split(/(?<=[\.\!\?])\s+/).map(s => {
      const words = s.trim().split(/\s+/);
      if (words.length > 24) {
        const mid = Math.round(words.length / 2);
        return words.slice(0, mid).join(" ") + ". " + words.slice(mid).join(" ");
      }
      return s;
    }).join(" ");
  }
  if (opts.warmerTone) {
    text = text.replace(/\b(it seems|furthermore|moreover|therefore)\b/gi, (m) => {
      const map: Record<string,string> = {
        "it seems": "I think",
        "furthermore": "and",
        "moreover": "also",
        "therefore": "so"
      };
      return map[m.toLowerCase()] || m;
    });
  }

  text = text.replace(/\[\[PRESERVE_(\d+)\]\]/g, (_, i) => preserved[Number(i)]);
  return text;
}

function replaceMany(input: string, dict: Record<string, string>): string {
  let out = input;
  for (const [k, v] of Object.entries(dict)) {
    out = out.replace(new RegExp(k, "gi"), v);
  }
  return out;
}
