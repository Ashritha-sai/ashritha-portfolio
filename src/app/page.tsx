"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SpecialText } from "../../components/ui/special-text";

/* ─── DATA ─── */
const projects = [
  { num: "01", title: "Neuromorphic Control for Robotic Augmentation", desc: "EMG–IMU fusion for real-time robotic augmentation under dual-task conditions.", tags: ["Bio-Signals", "Sensor Fusion", "Neuromorphic"], href: "/projects/msc-project" },
  { num: "02", title: "RL-Driven Vision Optimization", desc: "PPO-based autonomous retraining. 95% reduction in human annotation.", tags: ["PPO", "Computer Vision", "RLAIF"], href: "/projects/rlaif" },
  { num: "03", title: "Language-Conditioned Robotic Manipulation", desc: "Natural language → multi-step physical robotic actions via LLM.", tags: ["Embodied AI", "LLM", "PyBullet"], href: "/projects/vla" },
  { num: "04", title: "3D Gaussian Splatting Engine", desc: "Single-image to 3D. 10K+ Gaussians in under 20 seconds.", tags: ["3DGS", "PyTorch", "CUDA"], href: "/projects/human3d" },
];

const experience = [
  { year: "2025–26", role: "MSc Human & Biological Robotics", org: "Imperial College London", desc: "Neuromorphic control, EMG-IMU sensor fusion, robotic augmentation." },
  { year: "2025", role: "Research Intern — Physics-informed ML", org: "IIT Jodhpur", desc: "Kalman filtering, trajectory tracking, spatiotemporal features." },
  { year: "2024–25", role: "Research Assistant", org: "IIT Kanpur", desc: "OpenSim biomechanics, inverse kinematics, human-in-the-loop ML." },
  { year: "2023–24", role: "SRFP Research Fellow", org: "IASc–INSA–NASI", desc: "Biological time-series, experimental design, scientific analysis." },
];

const techRow1 = ["Python", "PyTorch", "NumPy", "CUDA", "C++", "MuJoCo", "OpenCV", "TensorFlow", "scikit-learn", "SciPy"];
const techRow2 = ["MATLAB", "Simulink", "CasADi", "PyBullet", "OpenSim", "YOLOv8", "SAM", "MiDaS", "Pandas", "IPOPT"];
const techRow3 = ["ROS", "Docker", "Git", "Linux", "Embedded C", "Signal Processing", "OpenAI API", "Pytest", "Jupyter", "LaTeX"];

/* ═══════════════ PAGE ═══════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useSpring(useTransform(heroP, [0, 1], [0, -60]), { stiffness: 80, damping: 20 });

  return (
    <div>
      {/* ════════ HERO ════════ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            className="flex flex-col items-center text-center md:items-start md:text-left"
            style={{ y: heroTextY }}
          >
            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs tracking-wide text-[#4A4A4A]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
              Building at Imperial College London
            </motion.div>

            {/* Name — big, with SpecialText scramble */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <SpecialText
                speed={25}
                delay={0.6}
                className="font-[family-name:var(--font-display)] text-6xl leading-[0.95] tracking-tight text-[#E0DDD5] md:text-7xl lg:text-8xl"
              >
                Ashritha
              </SpecialText>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-[#8A8A8A] md:text-xl"
            >
              I build intelligent systems that{" "}
              <span className="font-[family-name:var(--font-display)] italic text-[#E0DDD5]">move</span>,{" "}
              <span className="font-[family-name:var(--font-display)] italic text-[#E0DDD5]">see</span>, and{" "}
              <span className="font-[family-name:var(--font-display)] italic text-[#E0DDD5]">learn</span>.
            </motion.p>

            {/* Role descriptor with scramble */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.6 }}
              className="mt-4"
            >
              <SpecialText
                speed={18}
                delay={2.8}
                className="font-[family-name:var(--font-mono)] text-sm tracking-wide text-[#FF4D00]"
              >
                Robotics / ML / Computer Vision
              </SpecialText>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.7 }}
            >
              <div className="accent-line mx-auto mt-8 w-16 md:mx-0" />
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href="mailto:ashrithaafmc@gmail.com" className="rounded-lg border border-[#262626] bg-[#161616] px-5 py-2.5 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">Email me</a>
                <a href="https://www.linkedin.com/in/ashritha-sai-mani-chundru" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#262626] bg-[#161616] px-5 py-2.5 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">LinkedIn</a>
                <a href="https://github.com/ashritha-sai" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#262626] bg-[#161616] px-5 py-2.5 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">GitHub</a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 4 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A4A4A" strokeWidth="1.5"><path d="M5 8l5 5 5-5" /></svg>
        </motion.div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:gap-20 items-start">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FF4D00]">About Me</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-[#E0DDD5] md:text-4xl lg:text-5xl leading-tight">
                I don&apos;t just research
                <span className="font-[family-name:var(--font-display)] italic"> — I ship.</span>
              </h2>
            </motion.div>

            <motion.div
              className="flex-1 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-lg leading-relaxed text-[#8A8A8A]">
                Founding engineer mindset. I build end-to-end systems from research
                prototype to production — robotics, vision, ML pipelines, data.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl text-[#E0DDD5]">12+</div>
                  <div className="mt-1 text-sm text-[#4A4A4A]">Projects shipped</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl text-[#E0DDD5]">3</div>
                  <div className="mt-1 text-sm text-[#4A4A4A]">Research labs</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl text-[#E0DDD5]">2×</div>
                  <div className="mt-1 text-sm text-[#4A4A4A]">Hackathon winner</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ WHAT I DO ════════ */}
      <section className="py-24 md:py-32 border-t border-[#262626]/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FF4D00]">What I Do</motion.p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { title: "Robotics & Control", text: "EMG-IMU fusion, MuJoCo simulation, NMPC, real-time servo control, neuromorphic processing." },
              { title: "Computer Vision & ML", text: "3D Gaussian Splatting, PPO-based retraining, object detection, RL-driven vision pipelines." },
              { title: "Systems & Data", text: "End-to-end ML pipelines, Monte Carlo simulation, signal processing, OpenSim biomechanics." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-xl border border-[#262626] bg-[#161616] p-7"
              >
                <div className="text-sm font-medium text-[#E0DDD5]">{item.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#8A8A8A]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TECH STACK — Animated Marquee ════════ */}
      <section className="py-24 md:py-32 border-t border-[#262626]/30 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-medium tracking-tight md:text-4xl"
          >
            <span className="text-[#E0DDD5]">My </span>
            <span className="text-[#FF4D00]">Techstack</span>
          </motion.h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4 overflow-hidden">
          <div className="marquee-left-slow flex w-max gap-4">
            {[...techRow1, ...techRow1].map((t, i) => (
              <span key={`a-${i}`} className="inline-flex items-center rounded-full border border-[#262626] bg-[#161616] px-6 py-3 text-sm font-medium text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00] shrink-0">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative mb-4 overflow-hidden">
          <div className="marquee-right-mid flex w-max gap-4">
            {[...techRow2, ...techRow2].map((t, i) => (
              <span key={`b-${i}`} className="inline-flex items-center rounded-full border border-[#262626] bg-[#111111] px-6 py-3 text-sm text-[#8A8A8A] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00] shrink-0">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Row 3 — scrolls left, faster */}
        <div className="relative overflow-hidden">
          <div className="marquee-left-fast flex w-max gap-4">
            {[...techRow3, ...techRow3].map((t, i) => (
              <span key={`c-${i}`} className="inline-flex items-center rounded-full border border-[#1E1E1E] px-6 py-3 text-sm text-[#4A4A4A] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00] shrink-0">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EXPERIENCE ════════ */}
      <section className="py-32 md:py-40 border-t border-[#262626]/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FF4D00]">My Career &</p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-[#E0DDD5]">My Career & </span><span className="text-[#FF4D00]">experience</span>
            </h2>
          </motion.div>

          <div className="mt-14 space-y-0">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.org}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative flex flex-col gap-3 border-l-2 border-[#262626] py-8 pl-8 sm:flex-row sm:gap-10"
              >
                <div className="absolute -left-[7px] top-10 h-3 w-3 rounded-full border-2 border-[#FF4D00] bg-[#0D0D0D]" />
                <div className="w-24 shrink-0 font-[family-name:var(--font-mono)] text-sm font-bold text-[#FF4D00]">{exp.year}</div>
                <div className="flex-1">
                  <div className="font-medium text-[#E0DDD5]">{exp.role}</div>
                  <div className="text-sm text-[#8A8A8A] mt-0.5">{exp.org}</div>
                  <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MY WORK ════════ */}
      <section className="py-32 md:py-40 border-t border-[#262626]/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#E0DDD5]">My</p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-[#E0DDD5]">My </span><span className="text-[#FF4D00]">Work</span>
            </h2>
          </motion.div>

          <div className="mt-14 space-y-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={p.href} className="project-card group flex flex-col gap-6 rounded-xl border border-[#262626] bg-[#161616] p-8 md:flex-row md:items-center">
                  <div className="font-[family-name:var(--font-mono)] text-3xl font-bold text-[#FF4D00] opacity-30 md:w-20 md:text-4xl">{p.num}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-[#E0DDD5] transition-colors group-hover:text-[#FF4D00]">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-[#262626] px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wide text-[#4A4A4A]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[#4A4A4A] transition-all group-hover:translate-x-2 group-hover:text-[#FF4D00] text-xl">→</div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.4 }}>
            <Link href="/projects" className="mt-10 inline-block text-sm text-[#4A4A4A] transition-colors hover:text-[#FF4D00]">View all projects →</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" className="py-32 md:py-40 border-t border-[#262626]/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FF4D00]">Contact</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[#E0DDD5] md:text-5xl">Let&apos;s build something.</h2>
            <p className="mt-4 text-lg text-[#8A8A8A]">Open to founding engineer roles, early-stage engineering, and research engineering.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:ashrithaafmc@gmail.com" className="rounded-lg border border-[#262626] bg-[#161616] px-6 py-3 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">ashrithaafmc@gmail.com</a>
              <a href="https://www.linkedin.com/in/ashritha-sai-mani-chundru" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#262626] bg-[#161616] px-6 py-3 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">LinkedIn ↗</a>
              <a href="https://github.com/ashritha-sai" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#262626] bg-[#161616] px-6 py-3 text-sm text-[#E0DDD5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]">GitHub ↗</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
