"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className={`transition-opacity duration-400 ${show ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}



