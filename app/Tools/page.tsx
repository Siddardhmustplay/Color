"use client";
import Link from "next/link";


export default function ToolsHomePage() {
const tools = [
{ name: "🎯 Match Game", slug: "match", gradient: "from-pink-400 to-rose-500" },
{ name: "🔥 Sort Game", slug: "sort", gradient: "from-orange-400 to-amber-500" },
{ name: "🎨 Paint Game", slug: "paint", gradient: "from-cyan-400 to-blue-500" },
{ name: "💡 Light Puzzle", slug: "light", gradient: "from-indigo-400 to-violet-500" },
{ name: "📷 AR Color Hunt", slug: "ar-hunt", gradient: "from-emerald-400 to-teal-500" },
{ name: "📅 Color Habit Tracker", slug: "color-habit-tracker", gradient: "from-fuchsia-400 to-pink-500" },
];


return (
<main className="min-h-screen p-8">
<div className="mx-auto max-w-5xl space-y-8">
<h1 className="text-center text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
Color Playground
</h1>


<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
{tools.map((t) => (
<Link
key={t.slug}
href={`/Tools/${t.slug}`}
className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300 rounded-3xl"
aria-label={t.name}
>
<div className={`rounded-3xl p-1 shadow-[0_12px_30px_rgba(0,0,0,0.24)] bg-gradient-to-br ${t.gradient}`}>
<div className="rounded-3xl bg-white/85 p-6 text-center backdrop-blur transition-transform group-hover:-translate-y-0.5">
<div className="text-lg font-semibold text-slate-900">{t.name}</div>
</div>
</div>
</Link>
))}
</div>
</div>
</main>
);
}