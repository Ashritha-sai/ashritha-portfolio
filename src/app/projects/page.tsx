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
    slug: "MSc Project",
    title: "Neuromorphic Control for Robotic Augmentation",
    desc: "EMG–IMU Fusion",
    date: "Jan 2026 – Present",
    tags: ["Bio-Signal Processing", "Sensor Fusion", "Continuous Control", "Human-Robot Interaction", "Neuromorphic Principles",],
  },
  {
    slug: "rlaif",
    title: "RL-Driven Vision Optimization (RLAIF)",
    desc: "Automated feedback pipeline using PPO to fine-tune vision models, reducing human annotation needs by 95% with closed-loop autonomous improvement.",
    date: "Dec 2025 – Present",
    tags: ["reinforcement learning", "PPO", "computer vision", "RLAIF", "MLOps"],
  },
  {
    slug: "Active Sensing",
    title: "Active Sensing under Uncertainty",
    desc: "Reinforcement Learning & Biomedical Simulation",
    date: "Nov 2025 – Present",
    tags: ["reinforcement learning", "active sensing", "monte carlo simulation", "biomedical modelling", "partial observability",],
  },
  {
    slug: "human3d",
    title: "Human3D",
    desc: "Context-aware 3D reconstruction pipeline integrating depth, keypoints, segmentation, and constraints.",
    date: "Oct 2025 – Present",
    tags: ["perception", "pipeline", "constraints"],
  },
  {
    slug: "anvya",
    title: "ANVYA",
    desc: "Natural-language driven scientific visualisation system with explicit control over representations.",
    date: "Mar 2025 – Jan 2026",
    tags: ["LLM systems", "product pipeline", "visualisation"],
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
    title: "Geospatial Intelligence & Satellite Mapping",
    desc: "Built a full GIS mapping pipeline to convert unstructured IRS satellite imagery into structured coordinate maps. Ingested and cleaned raw multispectral data, correcting for atmospheric noise and sensor artifacts.",
    stack: "GIS · Remote Sensing · Multispectral Data · Coordinate Systems · Data Pipelines",
    date: "June 2024 – Nov 2024",
    tags: ["data", "geospatial", "pipelines"],
  },
  {
    title: "Electric Vehicle Control System Design",
    desc: "Designed and tuned PID controllers in MATLAB/Simulink to manage motor speed and torque under varying load conditions. Modelled electric propulsion physics, simulating battery discharge curves and motor response to optimize energy efficiency.",
    stack: "MATLAB · Simulink · PID Control · Physics Simulation · Control Systems",
    date: "Oct 2023 – May 2024",
    tags: ["control", "simulation", "systems"],
  },
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
        <p className="max-w-3xl text-slate-600">
          My work spans robotics, biology-aware ML, computer vision, and data-driven systems. I also keep early
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
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const CardInner = (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 transition hover:border-slate-300 hover:bg-white">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-slate-600">{p.desc}</p>

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            <div>{p.date}</div>
            {p.stack ? <div>{p.stack}</div> : null}
          </div>

          {p.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <span className="text-slate-400">
          {p.slug ? "→" : ""}
        </span>
      </div>

      {p.slug ? (
        <p className="mt-5 text-sm text-slate-500">Open →</p>
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

