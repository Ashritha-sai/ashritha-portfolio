"use client";

import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.15}
        duration={4}
        repeatDelay={1}
        width={80}
        height={80}
        hoverFill="#444444"
        hoverRadius={2}
        className={cn(
          "h-full w-full",
          "fill-[#888]/20 stroke-[#888]/20",
          "[mask-image:radial-gradient(1000px_circle_at_50%_400px,white,transparent)]",
        )}
      />
    </div>
  );
}
