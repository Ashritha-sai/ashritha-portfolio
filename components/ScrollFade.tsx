"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
};

export function ScrollFade({ children, className = "", threshold = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(30);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Fade in when entering viewport
            setOpacity(1);
            setTranslateY(0);
          } else {
            // Fade out when leaving (optional - comment out for one-time animation)
            const rect = entry.boundingClientRect;
            if (rect.top > 0) {
              // Below viewport - reset for re-entry
              setOpacity(0);
              setTranslateY(30);
            }
          }
        });
      },
      { threshold, rootMargin: "-50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}
