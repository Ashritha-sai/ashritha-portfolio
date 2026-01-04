import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { ArmLinefieldBackground } from "@/components/ArmLinefieldBackground";



export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <ArmLinefieldBackground opacity={0.55} density={1} speed={1} />



      {/* Foreground content */}
      <div className="relative z-10 space-y-16">
        <FadeIn>
          <header className="space-y-6 pt-6">
            <h1 className="text-5xl font-semibold tracking-tight">
              Builder of end-to-end AI systems
            </h1>

            <p className="max-w-2xl text-lg text-neutral-300">
              I build systems that turn ambiguous ideas into working software:
              full-stack mindset, ML systems, and product-driven engineering.
              Currently at Imperial College London (MSc Human & Biological
              Robotics, 2025–26).
            </p>

            {/* Building now */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold text-neutral-200">
                Building now
              </div>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
                <li>
                  <span className="text-neutral-100">
                    MSc project (Imperial College London):
                  </span>{" "}
                  neuromorphic EMG–IMU control for robotic augmentation under
                  single- and dual-task conditions.
                </li>

                <li>
                  <span className="text-neutral-100">Human3D:</span>{" "}
                  constraint-driven 3D reconstruction (manuscript under
                  submission to CVWW 2026; extended version in preparation for
                  CRV 2026).
                </li>

                <li>
                  <span className="text-neutral-100">ANVYA:</span>{" "}
                  representation rules for reliable, repeatable scientific
                  renders.
                </li>
              </ul>
            </div>

            {/* Highlights + Principles */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-sm font-semibold text-neutral-200">
                  Highlights
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
                  <li>Smart India Hackathon winner (hardware edition)</li>
                  <li>Built OpenSim IK/dynamics pipeline for biomech features</li>
                  <li>Monte Carlo synthetic dataset generation + ML regression thesis</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-sm font-semibold text-neutral-200">
                  Principles
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
                  <li>Reliability over demos</li>
                  <li>Explicit assumptions</li>
                  <li>End-to-end ownership</li>
                </ul>
              </div>
            </div>
          </header>
        </FadeIn>

        {/* Featured work */}
        <FadeIn>
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Featured work</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Two projects that best represent how I build: systems,
                  constraints, iteration.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-sm text-neutral-300 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/40"
              >
                View all projects
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                title="ANVYA"
                subtitle="Natural-language driven scientific visualisation"
                href="/projects/anvya"
              />
              <FeatureCard
                title="Human3D"
                subtitle="Context-aware 3D reconstruction pipeline"
                href="/projects/human3d"
              />
            </div>
          </section>
        </FadeIn>

        {/* How I build */}
        <FadeIn>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How I build</h2>
            <ul className="list-disc space-y-2 pl-5 text-neutral-300">
              <li>Start from constraints and failure modes, not the model.</li>
              <li>Build the smallest end-to-end system first, then iterate.</li>
              <li>Make assumptions explicit and easy to change.</li>
              <li>Prefer tools and designs that reduce operational drag.</li>
            </ul>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-neutral-300">{subtitle}</p>
        </div>
        <span className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-200">
          →
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
      <p className="mt-4 text-sm text-neutral-400">
        Read the build notes, architecture decisions, and outcomes.
      </p>
    </Link>
  );
}
