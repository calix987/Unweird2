
"use client";
import { useState } from "react";
import { checkImageName } from "@/lib/imageHeuristics";

export default function ImagesPage() {
  const [fileName, setFileName] = useState<string>("");
  const [message, setMessage] = useState<string>("Drop or choose an image");

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const res = checkImageName(f.name);
    setMessage(res.message);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const res = checkImageName(f.name);
    setMessage(res.message);
  }

  return (
    <section className="card p-8">
      <div className="text-sm text-white/70 mb-3">Drag & drop an image or choose a file</div>
      <div
        onDrop={onDrop}
        onDragOver={(e)=>e.preventDefault()}
        className="h-40 rounded-xl border border-dashed border-white/20 grid place-items-center"
      >
        {fileName ? <div className="text-white/80">{fileName}</div> : <div className="text-white/50">Drop image here</div>}
      </div>
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={onFile} />
      </div>
      <div className="mt-4 text-sm text-white/80">{message}</div>
    </section>
  );
}
