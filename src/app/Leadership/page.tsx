"use client";

import { useMemo, useState } from "react";

type Category = "Now" | "National" | "Imperial" | "Service" | "Student" | "Volunteering";

type Node = {
  id: string;
  x: number; // 0..100
  y: number; // 0..100
  category: Category;
  title: string;
  org: string;
  period: string;
  details: string[];
  highlights?: string[];
  tags: string[];
  isCurrent?: boolean;
};

function color(category: Category) {
  switch (category) {
    case "Now":
      return "border-emerald-300/80 bg-emerald-300/20 shadow-[0_0_0_10px_rgba(16,185,129,0.08)]";
    case "Imperial":
      return "border-sky-300/80 bg-sky-300/20 shadow-[0_0_0_10px_rgba(56,189,248,0.06)]";
    case "National":
      return "border-fuchsia-300/80 bg-fuchsia-300/20 shadow-[0_0_0_10px_rgba(217,70,239,0.06)]";
    case "Volunteering":
      return "border-amber-300/80 bg-amber-300/20 shadow-[0_0_0_10px_rgba(251,191,36,0.06)]";
    case "Service":
      return "border-violet-300/80 bg-violet-300/20 shadow-[0_0_0_10px_rgba(167,139,250,0.06)]";
    case "Student":
      return "border-white/40 bg-white/10 shadow-[0_0_0_10px_rgba(255,255,255,0.03)]";
    default:
      return "border-white/40 bg-white/10";
  }
}

function badge(category: Category) {
  switch (category) {
    case "Now":
      return "border-emerald-300/40 bg-emerald-300/10 text-emerald-100";
    case "Imperial":
      return "border-sky-300/40 bg-sky-300/10 text-sky-100";
    case "National":
      return "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100";
    case "Volunteering":
      return "border-amber-300/40 bg-amber-300/10 text-amber-100";
    case "Service":
      return "border-violet-300/40 bg-violet-300/10 text-violet-100";
    case "Student":
      return "border-white/15 bg-white/[0.03] text-neutral-200";
    default:
      return "border-white/15 bg-white/[0.03] text-neutral-200";
  }
}

export default function LeadershipPage() {
  const nodes = useMemo<Node[]>(
    () => [
      // ===== Current cluster (top, catches eye) =====
      {
        id: "impact_smo",
        x: 18,
        y: 18,
        category: "Now",
        title: "Social Media Officer",
        org: "IMPACT@Imperial",
        period: "2025 – Present",
        isCurrent: true,
        details: [
          "Build content strategy and run consistent publishing across channels.",
          "Translate club goals into campaigns that drive engagement and attendance.",
        ],
        tags: ["content", "community", "strategy"],
      },
      {
        id: "impact_co",
        x: 34,
        y: 20,
        category: "Now",
        title: "Community Officer",
        org: "IMPACT@Imperial",
        period: "2025 – Present",
        isCurrent: true,
        details: [
          "Support onboarding, coordination, and event operations.",
          "Strengthen recurring formats and feedback loops for clean execution.",
        ],
        tags: ["ops", "events", "leadership"],
      },
      {
        id: "pint",
        x: 50,
        y: 24,
        category: "Now",
        title: "Tech-Me-Out Domain Organiser",
        org: "Pint of Science 2026",
        period: "2025 – 2026 (in progress)",
        isCurrent: true,
        details: [
          "Supporting speaker + venue coordination for the Tech-Me-Out track.",
          "Helping shape event flow and audience engagement for accessible talks.",
        ],
        tags: ["public-engagement", "events", "ops"],
      },

      // ===== National big milestones =====
      {
        id: "sih",
        x: 68,
        y: 38,
        category: "National",
        title: "Main Organiser",
        org: "Smart India Hackathon (National-level)",
        period: "Dec 2024 – Feb 2025",
        details: [
          "Led end-to-end coordination for a 5-day national hackathon.",
          "Owned participant scheduling, volunteer allocation, and escalation handling.",
          "Coordinated with institutional stakeholders and government officials.",
        ],
        highlights: [
          "50+ teams (6 students + 2 professors per team).",
          "~30 volunteers managed.",
        ],
        tags: ["scale", "ops", "stakeholders"],
      },
      {
        id: "biomed_bharat",
        x: 56,
        y: 52,
        category: "National",
        title: "Main Organiser",
        org: "BIOMED Bharat (National Biomedical Device Hackathon)",
        period: "Dec 2023 – May 2024",
        details: [
          "Organised a national biomedical-device hackathon from planning to delivery.",
          "Owned communication loops and operational planning across timelines.",
        ],
        tags: ["biomed", "events", "execution"],
      },

      // ===== Student/service cluster =====
      {
        id: "library",
        x: 78,
        y: 62,
        category: "Student",
        title: "Committee Member",
        org: "Library Advisory (GITAM University)",
        period: "Aug 2023 – May 2025",
        details: ["Contributed to planning and decisions for library services and resources."],
        tags: ["planning", "governance"],
      },
      {
        id: "classrep",
        x: 62,
        y: 68,
        category: "Student",
        title: "Class Representative",
        org: "GITAM",
        period: "2022 – 2025",
        details: [
          "Handled student coordination and communication across stakeholders.",
          "Kept feedback loops short and execution predictable.",
        ],
        tags: ["coordination", "responsibility"],
      },
      {
        id: "bcg",
        x: 86,
        y: 78,
        category: "Service",
        title: "External Relations Manager",
        org: "BCG (Biotech Club, GITAM)",
        period: "Apr 2022 – Jun 2023",
        details: ["Built collaborations and supported external partnerships for club initiatives."],
        tags: ["partnerships", "communication"],
      },
      {
        id: "homecoming",
        x: 70,
        y: 82,
        category: "Service",
        title: "Manager (Media & Tech)",
        org: "Homecoming",
        period: "Aug 2023 – Dec 2023",
        details: ["Led media + tech execution to support a successful alumni gathering."],
        tags: ["events", "execution"],
      },
      {
        id: "ncc",
        x: 50,
        y: 86,
        category: "Service",
        title: "NCC",
        org: "National Cadet Corps",
        period: "2021 – Present",
        details: ["Completed B Certificate; progressing toward C Certificate."],
        tags: ["discipline", "training"],
      },
      {
        id: "uandi",
        x: 26,
        y: 78,
        category: "Volunteering",
        title: "Volunteer",
        org: "U&I (Teaching / Mentoring)",
        period: "Before London",
        details: [
          "Volunteered with children’s learning and mentorship support.",
          "Built patience and clarity in communication.",
        ],
        tags: ["education", "impact"],
      },
    ],
    []
  );

  // edges just for vibe (you can add/remove)
  const edges = useMemo(
    () => [
      ["impact_smo", "impact_co"],
      ["impact_co", "pint"],
      ["pint", "sih"],
      ["sih", "biomed_bharat"],
      ["biomed_bharat", "classrep"],
      ["classrep", "library"],
      ["library", "bcg"],
      ["classrep", "homecoming"],
      ["homecoming", "ncc"],
      ["ncc", "uandi"],
    ],
    []
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => nodes.find((n) => n.id === activeId) ?? null, [nodes, activeId]);

  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Leadership</h1>
        <p className="max-w-3xl text-neutral-300">
          Click a node. Current roles are highlighted.
        </p>
      </header>

      {/* IMPORTANT: overflow-visible so popover never gets clipped */}
      <section className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 overflow-visible">
        <div className="relative h-[680px] w-full overflow-visible">
          {/* Edges (SVG) */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {edges.map(([a, b]) => {
              const A = byId[a];
              const B = byId[b];
              if (!A || !B) return null;

              return (
                <line
                  key={`${a}-${b}`}
                  x1={`${A.x}%`}
                  y1={`${A.y}%`}
                  x2={`${B.x}%`}
                  y2={`${B.y}%`}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Nodes: circles only */}
          {nodes.map((n) => {
            const isActive = n.id === activeId;
            const size = n.isCurrent ? 18 : 14;

            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setActiveId(n.id)}
                className={[
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                  color(n.category),
                  isActive ? "scale-110" : "hover:scale-110",
                ].join(" ")}
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                aria-label={`${n.title} — ${n.org}`}
                title={`${n.title} — ${n.org}`}
              />
            );
          })}

          {/* Popover anchored near the active node */}
          {active ? (
            <div
              className="absolute z-30 w-[min(520px,calc(100%-24px))] rounded-2xl border border-white/15 bg-neutral-950/70 p-5 backdrop-blur"
              style={{
                left: `min(calc(${active.x}% + 22px), calc(100% - 520px))`,
                top: `calc(${active.y}% - 20px)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${badge(active.category)}`}>
                    {active.category}
                  </span>

                  <div className="mt-2 text-base font-semibold text-neutral-100">
                    {active.title} — {active.org}
                  </div>
                  <div className="mt-1 text-xs text-neutral-400">{active.period}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-neutral-200 transition hover:bg-white/[0.07]"
                >
                  ✕
                </button>
              </div>

              {active.highlights?.length ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-neutral-200">Highlights</div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                    {active.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-semibold text-neutral-200">Details</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                  {active.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Subtle “current cluster” label */}
          <div className="pointer-events-none absolute left-[14%] top-[10%] text-xs text-neutral-400">
            Current
          </div>
        </div>
      </section>
    </div>
  );
}
