import Link from "next/link";

type Project = {
  slug?: string; // if present, card links to a page
  title: string;
  desc: string;
  stack?: string;
  date: string;
  tags?: string[];
};

const featured: Project[] = [
  {
    slug: "anvya",
    title: "ANVYA",
    desc: "Natural-language driven scientific visualisation system with explicit control over representations.",
    date: "Mar 2025 – Present",
    tags: ["LLM systems", "product pipeline", "visualisation"],
  },
  {
    slug: "human3d",
    title: "Human3D",
    desc: "Context-aware 3D reconstruction pipeline integrating depth, keypoints, segmentation, and constraints.",
    date: "Oct 2025 – Present",
    tags: ["perception", "pipeline", "constraints"],
  },
  {
    slug: "biomarker",
    title: "Non-invasive biomarker ML system (Thesis)",
    desc: "Signal-to-prediction pipeline under noisy, low-data constraints using synthetic dataset generation.",
    date: "Aug 2024 – May 2025",
    tags: ["synthetic data", "ML", "biomed"],
  },
  {
    slug: "prosthesis",
    title: "Adaptive prosthesis control (Hackathon winner)",
    desc: "Real-time EEG-to-gesture classification and stabilised servo control under noise constraints.",
    date: "Oct 2023 – May 2024",
    tags: ["real-time", "signals", "hardware"],
  },
];

const earlyBuilds: Project[] = [
  {
    title: "Automatic paper crusher for sustainable waste disposal",
    desc: "Built from scratch as a team project: sensor-driven automation, embedded coding, and mechanical analysis for safe, repeatable crushing.",
    stack: "Sensors · Embedded coding · Mechanical design/analysis",
    date: "2nd year (B.Tech)",
    tags: ["hardware", "sustainability", "systems"],
  },
  {
    title: "Inhaler refurbishment for a startup concept (Fusion 360 + product thinking)",
    desc: "Refurbished an inhaler design as a venture-style exploration. Learned hands-on presentation, data analysis, biotech product context, and CAD-driven design iteration.",
    stack: "Fusion 360 · Design iteration · Presentation · Data analysis",
    date: "1st year (B.Tech)",
    tags: ["CAD", "biotech", "design"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-3xl text-neutral-300">
          My work spans ML systems, perception pipelines, and real-time control. I also keep early
          builds here because they shaped how I think: ship, test, iterate, repeat.
        </p>
      </header>

      <SectionHeader
        title="Featured"
        subtitle="The projects that best represent how I build today."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      <SectionHeader
        title="Early builds"
        subtitle="Foundation years: hands-on engineering, design, and learning how to make things real."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {earlyBuilds.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-neutral-400">{subtitle}</p>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const CardInner = (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-neutral-300">{p.desc}</p>

          <div className="mt-3 space-y-1 text-sm text-neutral-400">
            <div>{p.date}</div>
            {p.stack ? <div>{p.stack}</div> : null}
          </div>

          {p.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <span className="text-neutral-400">
          {p.slug ? "→" : ""}
        </span>
      </div>

      {p.slug ? (
        <p className="mt-5 text-sm text-neutral-400">Open →</p>
      ) : null}
    </div>
  );

  if (!p.slug) return <div>{CardInner}</div>;

  return (
    <Link href={`/projects/${p.slug}`} className="block">
      {CardInner}
    </Link>
  );
}

