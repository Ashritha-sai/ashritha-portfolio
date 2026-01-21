"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItem = {
  id: string;
  title: string;
  period: string;
  category: string;
  color: string;
};

type Props = {
  items: TimelineItem[];
  onItemClick: (id: string) => void;
};

export function AnimatedTimeline({ items, onItemClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];

    // Observe each timeline item
    const itemElements = container.querySelectorAll("[data-timeline-item]");
    itemElements.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = el.getAttribute("data-timeline-item");
            if (!id) return;

            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          });
        },
        { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // Animate line height based on scroll
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the container is above the viewport center
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight / 2 - containerTop) / containerHeight)
      );
      setLineHeight(scrollProgress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative pl-8">
      {/* Animated line */}
      <div className="absolute left-[11px] top-0 h-full w-0.5 bg-slate-200">
        <div
          className="w-full bg-gradient-to-b from-indigo-500 to-emerald-500 transition-all duration-100"
          style={{ height: `${lineHeight}%` }}
        />
      </div>

      {/* Timeline items */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isVisible = visibleItems.has(item.id);
          return (
            <button
              key={item.id}
              data-timeline-item={item.id}
              type="button"
              onClick={() => onItemClick(item.id)}
              className="group relative grid w-full grid-cols-[24px_1fr] gap-4 rounded-xl border border-transparent p-3 text-left transition-all duration-500 hover:border-slate-200 hover:bg-slate-100"
              style={{
                opacity: isVisible ? 1 : 0.3,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Dot */}
              <div className="relative">
                <div
                  className={`absolute left-[2px] top-[6px] h-4 w-4 rounded-full border-2 transition-all duration-300 ${item.color} ${
                    isVisible ? "scale-100" : "scale-50"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500">{item.period}</div>
                  <span className="text-xs text-slate-400">·</span>
                  <div className="text-xs text-slate-500">{item.category}</div>
                </div>
                <div className="text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
                  Click for details →
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
