"use client";

import { useEffect, useState } from "react";

type Ripple = {
  x: number;
  y: number;
  id: number;
};

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return { ripples, addRipple };
}

export function RippleContainer({ ripples }: { ripples: Ripple[] }) {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-slate-400/30"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
    </span>
  );
}
