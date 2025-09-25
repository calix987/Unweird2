"use client";
import { useCallback, useState } from "react";
import { analyzeImage, type ImgReport } from "@/lib/imageHeuristics";

export default function ImagesPage() {
  const [report, setReport] = useState<ImgReport | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (file: File) => {
    setPreview(URL.createObjectURL(file));
    const rep = await analyzeImage(file);
    setReport(rep);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="space-y-4">
        <div className="card-muted p-6 border-dashed" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) onDrop(f);
        }}>
          <div className="text-center space-y-3">
            <div className="text-slate-600">Drag & drop an image or choose a file</div>
            <input type="file" accept="image/*" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onDrop(f);
            }} />
          </div>
        </div>
        {preview && (<div className="card p-4"><img src={preview} alt="preview" className="rounded-lg max-h-72 object-contain mx-auto"/></div>)}
      </section>
      <section className="card p-6">
        <h3 className="font-semibold mb-2">Image checks</h3>
        {!report ? (
          <p className="text-sm text-slate-600">Upload an image to see quick client‑side checks.</p>
        ) : (
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Name:</span> {report.name}</div>
            <div><span className="font-medium">Type:</span> {report.type}</div>
            <div><span className="font-medium">Size:</span> {report.sizeKB} KB</div>
            {report.warnings.length > 0 ? (
              <ul className="list-disc pl-5 text-orange-700">
                {report.warnings.map((w,i) => <li key={i}>{w}</li>)}
              </ul>
            ) : <div className="text-green-700">Looks good!</div>}
          </div>
        )}
      </section>
    </div>
  );
}
