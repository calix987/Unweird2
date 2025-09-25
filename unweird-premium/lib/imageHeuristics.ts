export function checkImageName(name: string) {
  const lower = name.toLowerCase();
  const flags = [
    lower.includes("ai") && !lower.includes("aida") ? "‘ai’ appears in filename" : null,
    /_final\d?\./.test(lower) ? "multiple finals in name" : null,
    /midjourney|stable|dalle|generative/.test(lower) ? "generator tag detected" : null,
  ].filter(Boolean) as string[];

  return {
    ok: flags.length === 0,
    message: flags.length ? "Possible tell: " + flags.join(", ") : "Looks ok — run deeper analysis when available."
  };
}
