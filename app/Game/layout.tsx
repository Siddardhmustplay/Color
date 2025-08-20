import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="text-black font-sans">
        <nav className="w-full px-6 py-4 text-center text-xl font-bold shadow-md space-x-6">
          <Link href="/Game/emoji-frequency" className="hover:underline">Color Frequency</Link>
          <Link href="/Game/emoji-duplicator" className="hover:underline">Color Duplicator</Link>
          <Link href="/Game/scroll-catcher" className="hover:underline">Color Catcher</Link>
          <Link href="/Game/Color-memory" className="hover:underline">Color Matcher</Link>
          <Link href="/Game/Color-rush" className="hover:underline">Color Rush</Link>
          <Link href="/Game/Color-command" className="hover:underline">Color Command</Link>
          <Link href="/Game/fading-cleaner" className="hover:underline">Color Cleaner</Link>
          <Link href="/Game/color-count" className="hover:underline">Color Count</Link>
          <Link href="/Game/color-arithmetic" className="hover:underline">Color Arithmetic</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
