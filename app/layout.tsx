import "./globals.css";
import type { Metadata } from "next";
import AnimatedBackground from "@/components/AnimatedBackground";


export const metadata: Metadata = {
title: "Color Coin",
description: "Spin the light. Feel the spectrum.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-transparent antialiased">
{/* Background lives once at the root */}
<AnimatedBackground />


{/* Foreground container */}
<div className="relative z-10 min-h-screen">
{children}
</div>
</body>
</html>
);
}