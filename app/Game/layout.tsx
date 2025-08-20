import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="text-white font-sans">
        <nav className="w-full px-6 py-4 text-center text-xl font-bold text-[#FF6C00] shadow-md border-b border-[#7D4AFF] space-x-6">
          <Link href="/emoji-frequency" className="hover:underline">🧠 Color Frequency</Link>
          <Link href="/emoji-duplicator" className="hover:underline">🌀 Color Duplicator</Link>
          <Link href="/scroll-catcher" className="hover:underline">🎯 Color Catcher</Link>
          <Link href="/Color-memory" className="hover:underline">🎯 Color Catcher</Link>
          <Link href="/Color-rush" className="hover:underline">🎯 Color Rush</Link>
          <Link href="/Color-command" className="hover:underline">🎯 Color command</Link>
          <Link href="/fading-cleaner" className="hover:underline">Fading cleaner</Link>
          <Link href="/color-count" className="hover:underline">Color-Count</Link>
          <Link href="/color-arithmetic" className="hover:underline">Color Arithmetic</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
