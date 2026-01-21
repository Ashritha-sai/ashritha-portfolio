"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`relative transition-colors ${
        isActive
          ? "text-indigo-600 font-medium"
          : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-indigo-500 rounded-full" />
      )}
    </Link>
  );
}
