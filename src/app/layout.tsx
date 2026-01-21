import "./globals.css";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Nav } from "@/components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-800">
        <ParticleBackground />
        <SiteBackground />
        <Nav />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <PageTransition>{children}</PageTransition>
        </main>

        <footer className="border-t border-slate-200 py-10">
          <div className="mx-auto max-w-5xl px-6 text-sm text-slate-500">
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
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_10%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(700px_circle_at_80%_30%,rgba(16,185,129,0.06),transparent_55%),radial-gradient(900px_circle_at_50%_80%,rgba(236,72,153,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-100/70 to-slate-100" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
