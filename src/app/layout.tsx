import "./globals.css";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import { PageTransition } from "@/components/PageTransition";
import { Nav } from "@/components/Nav";
import { GridBackground } from "@/components/GridBackground";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Ashritha — Builder & Robotics Engineer",
  description:
    "I build intelligent systems at the intersection of robotics, biology, computer vision, and ML.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-[#0D0D0D] text-[#E0DDD5]">
        <div className="noise-overlay" />

        {/* Animated grid background */}
        <GridBackground />

        <Nav />

        <main>
          <PageTransition>{children}</PageTransition>
        </main>

        <footer className="border-t border-[#262626]/50 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-[#4A4A4A]">
            <span>London, UK</span>
            <span className="font-[family-name:var(--font-mono)]">2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
