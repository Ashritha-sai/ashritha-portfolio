"use client";

import { useMemo, useState } from "react";

type Milestone = {
  id: string;
  title: string;
  period: string;
  category: "Fellowship" | "Award" | "Hackathon" | "Exam" | "Conference" | "Future";
  summary: string;
  details: string[];
};

export default function ArchivePage() {
  const milestones = useMemo<Milestone[]>(
    () => [
      // ===== FUTURE (TOP) =====
      {
        id: "future-human3d-cvww-crv",
        title: "Human3D Publications",
        period: "2026 (planned)",
        category: "Future",
        summary:
          "Manuscript under submission to CVWW 2026; extended version in preparation for CRV 2026.",
        details: [
          "Theme: constraint-driven 3D reconstruction and evaluation under noisy perception pipelines.",
          "Emphasis: reproducibility, failure-mode analysis, and physically plausible outputs.",
          "Artifacts: paper + demo + cleaned pipeline notes (where possible).",
        ],
      },
      

      // ===== CONFERENCES (ACTUAL) =====
      {
        id: "conf-surc-2025",
        title: "Scientific Undergraduate Research Conference",
        period: "May 2025",
        category: "Conference",
        summary:
          "Presented: “Machine Learning-Based Non-Invasive Diagnostic Device for Physiological Signal Analysis.”",
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
          "Presented: “In vitro Analysis of Scaffold Fabrication Techniques for Skin Graft Applications using Chitosan and Poly Vinyl Alcohol.”",
        details: [
          "Presented comparative scaffold fabrication results and justification for freeze drying as optimal in this context.",
          "Communicated experimental design choices and outcomes clearly to a broader audience.",
        ],
      },

      // ===== FELLOWSHIPS / RESEARCH MILESTONES =====
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

      // ===== HACKATHON / BUILD =====
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

      // ===== SCHOLARSHIP / EXAMS / EARLY MILESTONES =====
      {
        id: "gat-2021",
        title: "GAT – GITAM Admission Test (Rank 210 / 1000)",
        period: "2021",
        category: "Exam",
        summary:
          "Ranked 210 out of 1000; awarded 75% scholarship",
        details: [
          "Scholarship: 75% tuition support through undergraduate program.",
        ],
      },
          {
        id: "science-talent-2015",
        title: "State & National-level Science Talent Search Examinations",
        period: "2015",
        category: "Exam",
        summary: "",
        details: [
          "Recognised at state/national level in science talent search examinations.",
        ],
      },

      {
  id: "math-talent-2014",
  title: "National Mathematics Talent Contest",
  period: "2014",
  category: "Exam",
  summary: "",
  details: [
    "Participated/recognised in a national-level mathematics contest.",
  ],
},

    ],
    []
  );

  const [active, setActive] = useState<Milestone | null>(null);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>
        <p className="max-w-3xl text-neutral-300">
          A timeline of milestones: fellowships, awards, research moments, and future work.
          Not an “achievements” page. More like a map of momentum.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-neutral-300">
          <Pill label="Future" />
          <Pill label="Conference" />
          <Pill label="Fellowship" />
          <Pill label="Hackathon" />
          <Pill label="Exam" />
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-0 h-full w-px bg-white/10" />
          <div className="space-y-6">
            {milestones.map((m) => (
              <TimelineItem key={m.id} m={m} onOpen={() => setActive(m)} />
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
          {active.summary ? <p className="text-neutral-300">{active.summary}</p> : null}

          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
            {active.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Modal>
      ) : null}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
      {label}
    </span>
  );
}

function TimelineItem({ m, onOpen }: { m: Milestone; onOpen: () => void }) {
  const dotClass = categoryDot(m.category);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative grid w-full grid-cols-[24px_1fr] gap-4 rounded-xl border border-transparent p-3 text-left transition hover:border-white/10 hover:bg-white/[0.02]"
    >
      <div className="relative">
        <div className={`absolute left-[2px] top-[6px] h-4 w-4 rounded-full border ${dotClass}`} />
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="text-sm font-semibold text-neutral-100">{m.title}</div>
          <div className="text-xs text-neutral-400">{m.period}</div>
          <span className="text-xs text-neutral-400">·</span>
          <div className="text-xs text-neutral-400">{m.category}</div>
        </div>

        <div className="text-xs text-neutral-400 opacity-0 transition group-hover:opacity-100">
          Open →
        </div>
      </div>
    </button>
  );
}


function categoryDot(category: Milestone["category"]) {
  switch (category) {
    case "Future":
      return "border-white/30 bg-white/10";
    case "Conference":
      return "border-pink-400/40 bg-pink-400/15";
    case "Fellowship":
      return "border-emerald-400/40 bg-emerald-400/15";
    case "Hackathon":
      return "border-indigo-400/40 bg-indigo-400/15";
    case "Exam":
      return "border-sky-400/40 bg-sky-400/15";
    default:
      return "border-white/20 bg-white/10";
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{title}</h2>
            {subtitle ? <p className="text-sm text-neutral-400">{subtitle}</p> : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-neutral-200 hover:bg-white/[0.06]"
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
