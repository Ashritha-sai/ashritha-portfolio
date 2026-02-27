"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollFade } from "@/components/ScrollFade";
import { useRipple, RippleContainer } from "@/components/RippleEffect";

type Milestone = {
  id: string;
  title: string;
  period: string;
  category: "Fellowship" | "Award" | "Hackathon" | "Exam" | "Conference" | "Publication" | "Future";
  summary: string;
  details: string[];
};

export default function ArchivePage() {
  const milestones = useMemo<Milestone[]>(
    () => [
      {
        id: "hack-mit-grand-hack-2026",
        title: "MIT Hacking Medicine Grand Hack — Selected",
        period: "2026",
        category: "Hackathon",
        summary: "Selected to participate in the MIT Hacking Medicine Grand Hack.",
        details: [
          "Selected for the MIT Hacking Medicine Grand Hack.",
        ],
      },
      {
        id: "hack-london-neurotech-2026",
        title: "London Neurotech Hackathon",
        period: "Feb 2026",
        category: "Hackathon",
        summary: "Participated in the London Neurotech Hackathon.",
        details: [
          "Participated in the London Neurotech Hackathon.",
        ],
      },
      {
        id: "pub-active-sensing-2026",
        title: "Active Sensing under Uncertainty",
        period: "Jan 2026",
        category: "Publication",
        summary: "Manuscript submitted.",
        details: [
          "Manuscript submitted for publication.",
        ],
      },
      {
        id: "hack-imperial-data-analytics-2025",
        title: "Imperial College Data Analytics Hackathon",
        period: "Nov 2025",
        category: "Hackathon",
        summary: "Participated in the Imperial College Data Analytics Hackathon.",
        details: [
          "Participated in the Imperial College Data Analytics Hackathon.",
        ],
      },
      {
        id: "conf-surc-2025",
        title: "Scientific Undergraduate Research Conference",
        period: "May 2025",
        category: "Conference",
        summary:
          'Presented: "Machine Learning-Based Non-Invasive Diagnostic Device for Physiological Signal Analysis."',
        details: [
          "Presented the thesis direction and system framing: signal → features → prediction under noise/low-data constraints.",
          "Focused on practical ML modelling and validation decisions.",
          "Strengthened scientific communication: scoping, clarity, and answering critique under time pressure.",
        ],
      },
      {
        id: "conf-biotech-bioinfo-2024",
        title: "International Conference on Advances in Biotechnology & Bioinformatics",
        period: "Nov 2024",
        category: "Conference",
        summary:
          'Presented: "In vitro Analysis of Scaffold Fabrication Techniques for Skin Graft Applications using Chitosan and Poly Vinyl Alcohol."',
        details: [
          "Presented comparative scaffold fabrication results and justification for freeze drying as optimal in this context.",
          "Communicated experimental design choices and outcomes clearly to a broader audience.",
        ],
      },
      {
        id: "srfp-iacs-2024",
        title: "Science Academies Summer Research Fellowship (IASc–INSA–NASI SRFP)",
        period: "May 2024 – Jul 2024",
        category: "Fellowship",
        summary:
          "Completed SRFP project on scaffold fabrication techniques for skin graft applications (Chitosan + PVA).",
        details: [
          "Fabricated scaffolds using three techniques; compared outcomes to identify optimal approach.",
          "Identified freeze drying as the best technique for scaffold production in this study context.",
          "Built competence in scaffold characterisation, analysis, and independent problem-solving under time constraints.",
        ],
      },
      {
        id: "sih-2024",
        title: "Smart India Hackathon 2024",
        period: "2024",
        category: "Hackathon",
        summary: "Participated in the Smart India Hackathon national stage.",
        details: [
          "Participated in the Smart India Hackathon 2024.",
        ],
      },
      {
        id: "srfp-jncasr-2023",
        title: "JNCASR Summer Research Fellowship (SRFP)",
        period: "Jun 2023 – Aug 2023",
        category: "Fellowship",
        summary:
          "Studied the effect of dietary variation (rice varieties) on Drosophila development, microbiome workflows, and fecundity-linked outcomes.",
        details: [
          "Measured development rate (egg → adult) under different rice varieties.",
          "Assisted in standardising fly DNA extraction protocols for microbiome experiments.",
          "Learned wet-lab workflows: PCR and electrophoresis; strengthened experimental execution discipline.",
        ],
      },
      {
        id: "sih-2023",
        title: "Internal Smart INDIA Hackathon – 1st Prize",
        period: "2023",
        category: "Hackathon",
        summary:
          "Won 1st prize for an applied engineering build under constraints (prototype + delivery).",
        details: [
          "Demonstrated end-to-end ownership: problem framing → build → test → present.",
          "Emphasis on shipping under constraints and clear communication.",
          "Related build: adaptive prosthesis control project (see Projects).",
        ],
      },
      {
        id: "gat-2021",
        title: "GAT – GITAM Admission Test (Rank 210 / 1000)",
        period: "2021",
        category: "Exam",
        summary: "Ranked 210 out of 1000; awarded 75% scholarship",
        details: ["Scholarship: 75% tuition support through undergraduate program."],
      },
      {
        id: "science-talent-2015",
        title: "State & National-level Science Talent Search Examinations",
        period: "2015",
        category: "Exam",
        summary: "",
        details: ["Recognised at state/national level in science talent search examinations."],
      },
      {
        id: "math-talent-2014",
        title: "National Mathematics Talent Contest",
        period: "2014",
        category: "Exam",
        summary: "",
        details: ["Participated/recognised in a national-level mathematics contest."],
      },
    ],
    []
  );

  const [active, setActive] = useState<Milestone | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight * 0.6 - rect.top) / rect.height)
      );
      setLineHeight(scrollProgress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-10">
      <ScrollFade>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>
          <p className="max-w-3xl text-slate-600">
            A timeline of milestones: fellowships, awards, research moments, and future work.
            Not an "achievements" page. More like a map of momentum.
          </p>
        </header>
      </ScrollFade>

      <section className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-6">
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-slate-600">
          <Pill label="Publication" color="amber" />
          <Pill label="Conference" color="pink" />
          <Pill label="Fellowship" color="emerald" />
          <Pill label="Hackathon" color="indigo" />
          <Pill label="Exam" color="sky" />
        </div>

        <div ref={containerRef} className="relative pl-8">
          {/* Static background line */}
          <div className="absolute left-[11px] top-0 h-full w-0.5 bg-slate-200" />
          {/* Animated progress line */}
          <div
            className="absolute left-[11px] top-0 w-0.5 bg-gradient-to-b from-indigo-500 via-emerald-500 to-pink-500 transition-all duration-150"
            style={{ height: `${lineHeight}%` }}
          />

          <div className="space-y-2">
            {milestones.map((m, index) => (
              <TimelineItem
                key={m.id}
                m={m}
                onOpen={() => setActive(m)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {active ? (
        <Modal
          onClose={() => setActive(null)}
          title={active.title}
          subtitle={`${active.period} · ${active.category}`}
        >
          {active.summary ? <p className="text-slate-600">{active.summary}</p> : null}
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            {active.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Modal>
      ) : null}
    </div>
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    slate: "border-slate-300 bg-slate-100 text-slate-600",
    pink: "border-pink-300 bg-pink-100 text-pink-700",
    emerald: "border-emerald-300 bg-emerald-100 text-emerald-700",
    indigo: "border-indigo-300 bg-indigo-100 text-indigo-700",
    sky: "border-sky-300 bg-sky-100 text-sky-700",
    amber: "border-amber-300 bg-amber-100 text-amber-700",
  };

  return (
    <span className={`rounded-full border px-3 py-1 ${colors[color] || colors.slate}`}>
      {label}
    </span>
  );
}

function TimelineItem({
  m,
  onOpen,
  index,
}: {
  m: Milestone;
  onOpen: () => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ripples, addRipple } = useRipple();
  const dotClass = categoryDot(m.category);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        addRipple(e);
        onOpen();
      }}
      className="group relative grid w-full grid-cols-[24px_1fr] gap-4 overflow-hidden rounded-xl border border-transparent p-3 text-left transition-all duration-500 hover:border-slate-200 hover:bg-slate-100"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <RippleContainer ripples={ripples} />
      <div className="relative">
        <div
          className={`absolute left-[2px] top-[6px] h-4 w-4 rounded-full border-2 transition-all duration-500 ${dotClass} ${
            isVisible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${index * 80 + 200}ms` }}
        />
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="text-sm font-semibold text-slate-800">{m.title}</div>
          <div className="text-xs text-slate-500">{m.period}</div>
          <span className="text-xs text-slate-400">·</span>
          <div className="text-xs text-slate-500">{m.category}</div>
        </div>

        <div className="text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
          Click for details →
        </div>
      </div>
    </button>
  );
}

function categoryDot(category: Milestone["category"]) {
  switch (category) {
    case "Publication":
      return "border-amber-500 bg-amber-200";
    case "Conference":
      return "border-pink-500 bg-pink-200";
    case "Fellowship":
      return "border-emerald-500 bg-emerald-200";
    case "Hackathon":
      return "border-indigo-500 bg-indigo-200";
    case "Exam":
      return "border-sky-500 bg-sky-200";
    default:
      return "border-slate-400 bg-slate-200";
  }
}

function Modal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl animate-breathe rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDuration: "6s" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
            {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
