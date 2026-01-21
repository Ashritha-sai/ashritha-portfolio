"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/Leadership", label: "Leadership" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-slate-800 hover:text-indigo-600 transition-colors">
          Ashritha Sai Mani Chundru
        </Link>
        <div className="flex gap-6 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[17px] left-0 h-0.5 w-full bg-indigo-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
