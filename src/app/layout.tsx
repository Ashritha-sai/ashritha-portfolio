import "./globals.css";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-50">
        <SiteBackground />
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              Ashritha Sai Mani Chundru
            </Link>
            <div className="flex gap-6 text-sm text-neutral-300">
              <Link className="hover:text-white" href="/projects">Projects</Link>
              <Link className="hover:text-white" href="/research">Research</Link>
              <Link className="hover:text-white" href="/Leadership">Leadership</Link>
              <Link className="hover:text-white" href="/archive">Archive</Link>
              <Link className="hover:text-white" href="/contact">Contact</Link>
              
            </div>
          </div>
        </nav>



        <main className="mx-auto max-w-5xl px-6 py-12">
          <PageTransition>{children}</PageTransition>
        </main>


        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto max-w-5xl px-6 text-sm text-neutral-400">
            London, UK · Open to early-stage roles from Jan 2026
          </div>
        </footer>
      </body>
    </html>
  );
}

function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_10%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(700px_circle_at_80%_30%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(900px_circle_at_50%_80%,rgba(236,72,153,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-neutral-950" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
