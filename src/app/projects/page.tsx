import Link from "next/link";

type Project = {
  slug?: string;
  title: string;
  desc: string;
  date: string;
  tags?: string[];
};

const featured: Project[] = [
  {
    slug: "msc-project",
    title: "Neuromorphic Control for Robotic Augmentation",
    desc: "EMG–IMU Fusion under single- and dual-task conditions",
    date: "Jan 2026 – Present",
    tags: ["Bio-Signals", "Sensor Fusion", "Neuromorphic"],
  },
  {
    slug: "rlaif",
    title: "RL-Driven Vision Optimization (RLAIF)",
    desc: "PPO-based autonomous retraining. 95% annotation reduction.",
    date: "Dec 2025 – Present",
    tags: ["PPO", "Vision", "RLAIF"],
  },
  {
    slug: "builders-edge",
    title: "Builders at Edge — YouTube-to-Robot Training",
    desc: "Pipeline for using YouTube videos to train robots. Hackathon winner.",
    date: "2026",
    tags: ["Robotics", "Video", "Training Pipeline"],
  },
  {
    slug: "mujoco",
    title: "Dynamic Pole Balancing with NMPC",
    desc: "CasADi-based nonlinear MPC on 7-DOF Franka Panda in MuJoCo.",
    date: "Feb 2026 – Present",
    tags: ["MuJoCo", "NMPC", "Control"],
  },
  {
    slug: "active-sensing",
    title: "Active Sensing under Uncertainty",
    desc: "RL in uncertain biomedical settings with partial observability.",
    date: "Nov 2025 – Present",
    tags: ["RL", "Biomedical", "Sensing"],
  },
  {
    slug: "vla",
    title: "VLA-Agent: Language-Conditioned Manipulation",
    desc: "Natural language → multi-step robotic actions via LLM orchestration.",
    date: "Oct 2025 – Present",
    tags: ["Embodied AI", "LLM", "Robotics"],
  },
  {
    slug: "human3d",
    title: "Human3D: 3D Gaussian Splatting Engine",
    desc: "Single 2D image → view-consistent 3D. Real-time rendering at 200 FPS.",
    date: "2025 – Present",
    tags: ["3DGS", "PyTorch", "CUDA"],
  },
  {
    slug: "biomarker",
    title: "Non-invasive Biomarker ML System",
    desc: "Monte Carlo photon-transport + ML regression for haemoglobin/glucose.",
    date: "Aug 2024 – May 2025",
    tags: ["ML", "Simulation", "Bio"],
  },
  {
    slug: "prosthesis",
    title: "Adaptive Prosthesis Control",
    desc: "EEG-driven gesture classification. Smart India Hackathon winner.",
    date: "Oct 2023 – May 2024",
    tags: ["BCI", "Control", "Hardware"],
  },
];

const earlyBuilds: Project[] = [
  {
    title: "Geospatial Intelligence & Satellite Mapping",
    desc: "GIS pipeline: IRS satellite imagery → structured coordinate maps.",
    date: "Jun – Nov 2024",
  },
  {
    title: "Electric Vehicle Control System",
    desc: "PID controllers in MATLAB/Simulink for motor speed and torque.",
    date: "Oct 2023 – May 2024",
  },
  {
    title: "Automatic Paper Crusher",
    desc: "Sensor-driven automation with embedded coding.",
    date: "2nd year B.Tech",
  },
  {
    title: "Inhaler Refurbishment",
    desc: "CAD-driven design iteration with product thinking.",
    date: "1st year B.Tech",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div>
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
          Projects
        </span>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-[#E0DDD5] mt-3">
          Everything I&apos;ve built
        </h1>
        <p className="text-[#8A8A8A] mt-3 max-w-2xl">
          From research prototypes to production systems.
        </p>
      </div>

      <div className="mt-16">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#4A4A4A] mb-6 block">
          Featured
        </span>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.title}
              href={`/projects/${p.slug}`}
              className="rounded-xl border border-[#262626] bg-[#161616] p-6 project-card group block"
            >
              <h3 className="font-medium text-[#E0DDD5] group-hover:text-[#FF4D00] transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-[#8A8A8A] mt-2">{p.desc}</p>
              <div className="text-xs font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-4">
                {p.date}
              </div>
              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-[family-name:var(--font-mono)] tracking-wide text-[#4A4A4A] border border-[#262626] rounded-full px-2.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#4A4A4A] mb-6 block">
          Early Builds
        </span>
        <div className="grid gap-4 md:grid-cols-2">
          {earlyBuilds.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-[#262626] bg-[#111111] p-6"
            >
              <h3 className="font-medium text-[#E0DDD5]">
                {p.title}
              </h3>
              <p className="text-sm text-[#8A8A8A] mt-2">{p.desc}</p>
              <div className="text-xs font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-3">
                {p.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
