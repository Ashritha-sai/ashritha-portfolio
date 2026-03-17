"use client";

import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.05}
        duration={4}
        repeatDelay={1}
        width={80}
        height={80}
        className={cn(
          "h-full w-full",
          "fill-[#888]/10 stroke-[#888]/10",
          "[mask-image:radial-gradient(800px_circle_at_50%_300px,white,transparent)]",
        )}
      />
    </div>
  );
}
