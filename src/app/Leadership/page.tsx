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

/**
 * TechnicalTextureBackground
 * Subtle abstract technical texture: faint grid + noise + soft glow blobs + contour-ish lines.
 * - Always behind interactive elements
 * - Never captures pointer events
 * - Designed to be "felt", not noticed
 */
function TechnicalTextureBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {/* Base faint grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(100,116,139,0.25)" strokeWidth="0.3" />
          </pattern>

          {/* Noise */}
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
              result="turb"
            />
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.08 0"
            />
          </filter>

          {/* Soft blur for contours */}
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="0.55" />
          </filter>

          {/* Accent gradients - softer for light theme */}
          <radialGradient id="g1" cx="35%" cy="25%" r="55%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
            <stop offset="55%" stopColor="rgba(56,189,248,0.05)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
          <radialGradient id="g2" cx="70%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(217,70,239,0.12)" />
            <stop offset="55%" stopColor="rgba(217,70,239,0.04)" />
            <stop offset="100%" stopColor="rgba(217,70,239,0)" />
          </radialGradient>
          <radialGradient id="g3" cx="45%" cy="80%" r="65%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.10)" />
            <stop offset="55%" stopColor="rgba(16,185,129,0.03)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
        </defs>

        {/* grid */}
        <rect width="100" height="100" fill="url(#grid)" />

        {/* glow blobs */}
        <rect width="100" height="100" fill="url(#g1)" />
        <rect width="100" height="100" fill="url(#g2)" />
        <rect width="100" height="100" fill="url(#g3)" />

        {/* contour-ish lines (soft) */}
        <g filter="url(#softBlur)" opacity="0.4">
          <path
            d="M-10,25 C10,10 25,40 45,28 C60,19 72,8 110,20"
            fill="none"
            stroke="rgba(100,116,139,0.15)"
            strokeWidth="0.7"
          />
          <path
            d="M-10,55 C18,62 28,42 48,54 C63,63 76,78 110,70"
            fill="none"
            stroke="rgba(100,116,139,0.12)"
            strokeWidth="0.7"
          />
          <path
            d="M-10,85 C22,76 34,92 56,82 C74,74 86,60 110,78"
            fill="none"
            stroke="rgba(100,116,139,0.10)"
            strokeWidth="0.7"
          />
        </g>

        {/* noise overlay */}
        <rect width="100" height="100" filter="url(#noise)" opacity="0.3" />
      </svg>

      {/* Very subtle vignette for edges - light version */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,245,249,0)_0%,rgba(241,245,249,0.4)_70%,rgba(241,245,249,0.6)_100%)]" />
    </div>
  );
}

function color(category: Category) {
  // Brighter, cleaner accents for light theme.
  switch (category) {
    case "Now":
      return "border-emerald-500 bg-emerald-200 shadow-[0_0_0_12px_rgba(16,185,129,0.15)]";
    case "Imperial":
      return "border-cyan-500 bg-cyan-200 shadow-[0_0_0_12px_rgba(34,211,238,0.15)]";
    case "National":
      return "border-fuchsia-500 bg-fuchsia-200 shadow-[0_0_0_12px_rgba(217,70,239,0.15)]";
    case "Volunteering":
      return "border-amber-500 bg-amber-200 shadow-[0_0_0_12px_rgba(251,191,36,0.15)]";
    case "Service":
      return "border-violet-500 bg-violet-200 shadow-[0_0_0_12px_rgba(167,139,250,0.15)]";
    case "Student":
      return "border-slate-400 bg-slate-200 shadow-[0_0_0_12px_rgba(100,116,139,0.10)]";
    default:
      return "border-slate-400 bg-slate-200";
  }
}

function badge(category: Category) {
  switch (category) {
    case "Now":
      return "border-emerald-400 bg-emerald-100 text-emerald-700";
    case "Imperial":
      return "border-cyan-400 bg-cyan-100 text-cyan-700";
    case "National":
      return "border-fuchsia-400 bg-fuchsia-100 text-fuchsia-700";
    case "Volunteering":
      return "border-amber-400 bg-amber-100 text-amber-700";
    case "Service":
      return "border-violet-400 bg-violet-100 text-violet-700";
    case "Student":
      return "border-slate-300 bg-slate-100 text-slate-700";
    default:
      return "border-slate-300 bg-slate-100 text-slate-700";
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
        highlights: ["50+ teams (6 students + 2 professors per team).", "~30 volunteers managed."],
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
        details: ["Handled student coordination and communication across stakeholders.", "Kept feedback loops short and execution predictable."],
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
        details: ["Volunteered with children’s learning and mentorship support.", "Built patience and clarity in communication."],
        tags: ["education", "impact"],
      },
    ],
    []
  );

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
        <p className="max-w-3xl text-slate-600">
          Click a node. Current roles are highlighted.
        </p>
      </header>

      {/* IMPORTANT: overflow-visible so popover never gets clipped */}
      <section className="relative rounded-2xl border border-slate-200 bg-white/80 p-6 overflow-visible">
        {/* NEW: technical texture background */}
        <TechnicalTextureBackground />

        <div className="relative z-10 h-[680px] w-full overflow-visible">
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
                  stroke="rgba(100,116,139,0.3)"
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
                  "ring-1 ring-slate-300",
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
              className="absolute z-30 w-[min(520px,calc(100%-24px))] rounded-2xl border border-slate-200 bg-white/95 p-5 backdrop-blur shadow-lg"
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

                  <div className="mt-2 text-base font-semibold text-slate-800">
                    {active.title} — {active.org}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{active.period}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700 transition hover:bg-white"
                >
                  ✕
                </button>
              </div>

              {active.highlights?.length ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="text-xs font-semibold text-slate-700">Highlights</div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    {active.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-xs font-semibold text-slate-700">Details</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {active.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Subtle “current cluster” label */}
          <div className="pointer-events-none absolute left-[14%] top-[10%] text-xs text-slate-600/80">
            Current
          </div>
        </div>
      </section>
    </div>
  );
}
