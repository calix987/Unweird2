export type ImgReport = {
  name: string;
  sizeKB: number;
  type: string;
  warnings: string[];
};

export async function analyzeImage(file: File): Promise<ImgReport> {
  const warnings: string[] = [];
  const sizeKB = Math.round(file.size / 1024);
  if (!/^image\//.test(file.type)) warnings.push("Not an image file.");
  if (sizeKB > 5000) warnings.push("Large file (>5MB) — compress for faster uploads.");
  if (!/png|jpeg|webp|gif/.test(file.type)) warnings.push("Unusual format — prefer PNG/JPEG/WebP.");
  return { name: file.name, sizeKB, type: file.type, warnings };
}
