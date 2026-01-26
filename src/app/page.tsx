"use client";

import Link from "next/link";
import { ScrollFade } from "@/components/ScrollFade";
import { TypedText } from "@/components/TypedText";
import { useRipple, RippleContainer } from "@/components/RippleEffect";
import { ArmLinefieldBackground } from "../../components/ArmLinefieldBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Robotic arm background */}
      <ArmLinefieldBackground />

      {/* Foreground content */}
      <div className="relative z-10 space-y-16">
        <ScrollFade>
          <header className="space-y-6 pt-6">
            <p className="text-sm font-medium tracking-wide text-indigo-600">
              Robotics + Biology + Computer Vision + ML/AI + Data
            </p>
            <h1 className="text-5xl font-semibold tracking-tight">
              <TypedText
                text="Building intelligent systems where biology meets machine learning"
                speed={30}
                delay={300}
              />
            </h1>

            <p className="max-w-2xl text-lg text-slate-600">
              I design end-to-end systems at the intersection of robotics, biological sensing, computer vision, ML, and data pipelines.
              MSc Human & Biological Robotics, Imperial College London (2025–26).
            </p>

            {/* Building now */}
            <div className="mt-8 animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-6">
              <div className="text-sm font-semibold text-slate-700">
                Building now
              </div>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                <li>
                  <span className="text-slate-800">
                    MSc project (Imperial College London):
                  </span>{" "}
                  neuromorphic EMG–IMU control for robotic augmentation under
                  single- and dual-task conditions.
                </li>

                <li>
                  <span className="text-slate-800">RL-Driven Vision Optimization:</span>{" "}
                  PPO-based closed-loop system for autonomous vision model retraining,
                  reducing human annotation by 95%.
                </li>

                <li>
                  <span className="text-slate-800">Human3D:</span>{" "}
                  constraint-driven 3D reconstruction (manuscript under
                  submission to CVWW 2026; extended version in preparation for
                  CRV 2026).
                </li>

                <li>
                  <span className="text-slate-800">Active Sensing under Uncertainty:</span>{" "}
                  Reinforcement Learning in Uncertain Biomedical Settings.
                </li>
              </ul>
            </div>

            {/* Highlights + Principles */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-6" style={{ animationDelay: "0.5s" }}>
                <div className="text-sm font-semibold text-slate-700">
                  Highlights
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>RLAIF pipeline: 95% reduction in annotation needs</li>
                  <li>Smart India Hackathon winner (hardware edition)</li>
                  <li>GIS satellite mapping & geospatial data pipelines</li>
                  <li>Monte Carlo synthetic data + ML regression thesis</li>
                </ul>
              </div>

              <div className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-6" style={{ animationDelay: "1s" }}>
                <div className="text-sm font-semibold text-slate-700">
                  Principles
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Reliability over demos</li>
                  <li>Explicit assumptions</li>
                  <li>End-to-end ownership</li>
                </ul>
              </div>
            </div>
          </header>
        </ScrollFade>

        {/* Skills - Tiered */}
        <ScrollFade>
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Technical Toolkit</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-5">
                <div className="text-sm font-semibold text-emerald-700">Primary Tools</div>
                <p className="mt-1 text-xs text-slate-500">Production-level experience</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  <li>Python (NumPy, PyTorch, scikit-learn)</li>
                  <li>EMG / EEG signal processing</li>
                  <li>ML pipelines & regression</li>
                  <li>OpenSim biomechanics</li>
                </ul>
              </div>

              <div className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-5" style={{ animationDelay: "0.3s" }}>
                <div className="text-sm font-semibold text-indigo-700">Working Knowledge</div>
                <p className="mt-1 text-xs text-slate-500">Project-level experience</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  <li>Reinforcement learning (PPO, RLAIF)</li>
                  <li>Computer vision (YOLO, SAM, 3D recon)</li>
                  <li>Real-time control systems (PID, Simulink)</li>
                  <li>Data pipelines & GIS mapping</li>
                </ul>
              </div>

              <div className="animate-breathe rounded-2xl border border-slate-200 bg-white/80 p-5" style={{ animationDelay: "0.6s" }}>
                <div className="text-sm font-semibold text-slate-600">Exposure</div>
                <p className="mt-1 text-xs text-slate-500">Familiar, building depth</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  <li>MLOps & model retraining infra</li>
                  <li>Neuromorphic sensing</li>
                  <li>ROS / robotic middleware</li>
                  <li>Hardware prototyping</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* Featured work */}
        <ScrollFade>
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Featured work</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Two projects that best represent how I build: systems,
                  constraints, iteration.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900 hover:decoration-slate-400"
              >
                View all projects
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                title="RL-Driven Vision Optimization"
                subtitle="PPO-based autonomous retraining with 95% annotation reduction"
                href="/projects/rlaif"
              />
              <FeatureCard
                title="Human3D"
                subtitle="Context-aware 3D reconstruction pipeline"
                href="/projects/human3d"
              />
            </div>
          </section>
        </ScrollFade>

        {/* How I build */}
        <ScrollFade>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How I build</h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Start from constraints and failure modes, not the model.</li>
              <li>Build the smallest end-to-end system first, then iterate.</li>
              <li>Make assumptions explicit and easy to change.</li>
              <li>Prefer tools and designs that reduce operational drag.</li>
            </ul>
          </section>
        </ScrollFade>
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
  const { ripples, addRipple } = useRipple();

  return (
    <Link
      href={href}
      onClick={addRipple}
      className="group relative animate-breathe overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 transition hover:border-slate-300 hover:bg-white"
    >
      <RippleContainer ripples={ripples} />
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-slate-600">{subtitle}</p>
        </div>
        <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700">
          →
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-slate-100/0 via-slate-200 to-slate-100/0" />
      <p className="mt-4 text-sm text-slate-500">
        Read the build notes, architecture decisions, and outcomes.
      </p>
    </Link>
  );
}
