"use client";
import { useEffect, useRef, useState } from "react";

const PALETTE = [
  { name: "red", hex: "#f87171" }, { name: "orange", hex: "#fb923c" }, { name: "yellow", hex: "#facc15" },
  { name: "green", hex: "#4ade80" }, { name: "blue", hex: "#60a5fa" }, { name: "purple", hex: "#c084fc" },
];
function hexToRgb(hex: string) { const h = hex.replace("#", ""); const n = parseInt(h, 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; }
function dist(a: any, b: any) { const dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b; return Math.sqrt(dr*dr+dg*dg+db*db); }
function nearest(rgb: any) { return PALETTE.reduce((best, c) => { const d = dist(rgb, hexToRgb(c.hex)); return d < best.d ? { c, d } : best; }, { c: PALETTE[0], d: Infinity }).c; }

export default function ARHuntPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [target, setTarget] = useState(() => PALETTE[Math.floor(Math.random() * PALETTE.length)]);
  const [found, setFound] = useState(false);
  const [finds, setFinds] = useState(0);

  useEffect(() => { if (!streaming) return; let raf = 0; const loop = () => { detect(); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf); }, [streaming, target]);

  async function startCam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      if (!videoRef.current) return; videoRef.current.srcObject = stream as any; await videoRef.current.play(); setStreaming(true);
    } catch { alert("Camera permission needed to play AR Hunt."); }
  }
  function stopCam() { const v = videoRef.current; if (v?.srcObject) { (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop()); v.srcObject = null; } setStreaming(false); }
  function newTarget() { setTarget(PALETTE[Math.floor(Math.random() * PALETTE.length)]); setFound(false); }

  function detect() {
    const v = videoRef.current, c = canvasRef.current; if (!v || !c) return; const w = c.width, h = c.height; const ctx = c.getContext("2d")!; ctx.drawImage(v, 0, 0, w, h);
    const samples: { r: number; g: number; b: number }[] = []; const cx = Math.floor(w/2), cy = Math.floor(h/2);
    for (let dx = -20; dx <= 20; dx += 10) { const d = ctx.getImageData(cx+dx, cy, 1, 1).data; samples.push({ r: d[0], g: d[1], b: d[2] }); }
    for (let dy = -20; dy <= 20; dy += 10) { const d = ctx.getImageData(cx, cy+dy, 1, 1).data; samples.push({ r: d[0], g: d[1], b: d[2] }); }
    const avg = samples.reduce((s, v) => ({ r: s.r+v.r, g: s.g+v.g, b: s.b+v.b }), { r:0, g:0, b:0 });
    avg.r = Math.round(avg.r / samples.length); avg.g = Math.round(avg.g / samples.length); avg.b = Math.round(avg.b / samples.length);
    const nearestColor = nearest(avg); const match = nearestColor.name === target.name; setFound(match); if (match) setFinds((f) => f);
  }

  return (
    <main className="min-h-screen p-6">
<section className="mx-auto max-w-3xl rounded-2xl bg-white/85 backdrop-blur p-6 shadow-xl">
   
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-slate-900">📷 AR Color Hunt</h1>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-800 shadow-lg ring-1 ring-black/5">
            <span className="text-xl">🏆</span> Finds: <span className="text-xl">{finds}</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Find: <span className="capitalize">{target.name}</span></div>
            {found && (<div className="rounded-xl bg-emerald-100 px-3 py-1 text-emerald-700">🎉 Found!</div>)}
          </div>
          <div className="relative overflow-hidden rounded-2xl border shadow">
            <video ref={videoRef} className="h-72 w-full object-cover" playsInline muted />
            <canvas ref={canvasRef} width={640} height={400} className="hidden" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="h-28 w-28 rounded-2xl border-4 border-white/90 shadow-[0_0_0_6px_rgba(0,0,0,0.25)]" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!streaming ? (
              <button onClick={startCam} className="rounded-2xl bg-blue-600 px-5 py-3 text-white shadow hover:brightness-110">📷 Start Camera</button>
            ) : (
              <button onClick={stopCam} className="rounded-2xl bg-slate-700 px-5 py-3 text-white shadow hover:brightness-110">⏹️ Stop</button>
            )}
            <button onClick={() => { if(found) setFinds((f)=>f+1); newTarget(); }} className="rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow hover:brightness-110">🎯 New Target</button>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">Tip: Hold a colored object (toy, book, shirt) inside the square.</div>
        </div>
      </div>
   
    </section>
</main>
  );
}