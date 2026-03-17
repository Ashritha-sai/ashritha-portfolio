"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#262626]/50 bg-[#0D0D0D]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl text-[#E0DDD5] transition-colors hover:text-[#FF4D00]"
        >
          A.
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link
            href="/projects"
            className={`transition-colors ${
              pathname.startsWith("/projects")
                ? "text-[#FF4D00]"
                : "text-[#8A8A8A] hover:text-[#E0DDD5]"
            }`}
          >
            Work
          </Link>
          <a
            href="/#contact"
            className="text-[#8A8A8A] transition-colors hover:text-[#E0DDD5]"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
