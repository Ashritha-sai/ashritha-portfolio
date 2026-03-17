"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─── */
interface Pose {
  head: [number, number];
  neck: [number, number];
  chest: [number, number];
  lShoulder: [number, number];
  rShoulder: [number, number];
  lElbow: [number, number];
  rElbow: [number, number];
  lWrist: [number, number];
  rWrist: [number, number];
  hipCenter: [number, number];
  lHip: [number, number];
  rHip: [number, number];
  lKnee: [number, number];
  rKnee: [number, number];
  lAnkle: [number, number];
  rAnkle: [number, number];
}

type JointKey = keyof Pose;

/* ─── Skeleton connections ─── */
const BONES: [JointKey, JointKey][] = [
  // Spine
  ["head", "neck"],
  ["neck", "chest"],
  ["chest", "hipCenter"],
  // Shoulders
  ["chest", "lShoulder"],
  ["chest", "rShoulder"],
  // Left arm
  ["lShoulder", "lElbow"],
  ["lElbow", "lWrist"],
  // Right arm
  ["rShoulder", "rElbow"],
  ["rElbow", "rWrist"],
  // Hips
  ["hipCenter", "lHip"],
  ["hipCenter", "rHip"],
  // Left leg
  ["lHip", "lKnee"],
  ["lKnee", "lAnkle"],
  // Right leg
  ["rHip", "rKnee"],
  ["rKnee", "rAnkle"],
];

/* ─── Center of SVG viewbox: 150, 100. Proportions per spec. ─── */
const CX = 150;
const CY = 100;

function p(dx: number, dy: number): [number, number] {
  return [CX + dx, CY + dy];
}

/* ─── Poses ─── */
const IDLE: Pose = {
  head:      p(0, -85),
  neck:      p(0, -70),
  chest:     p(0, -50),
  lShoulder: p(-25, -65),
  rShoulder: p(25, -65),
  lElbow:    p(-30, -40),
  rElbow:    p(30, -40),
  lWrist:    p(-32, -15),
  rWrist:    p(32, -15),
  hipCenter: p(0, -15),
  lHip:      p(-15, -15),
  rHip:      p(15, -15),
  lKnee:     p(-18, 25),
  rKnee:     p(18, 25),
  lAnkle:    p(-20, 60),
  rAnkle:    p(20, 60),
};

const IDLE2: Pose = {
  head:      p(0, -83),
  neck:      p(0, -68),
  chest:     p(0, -48),
  lShoulder: p(-25, -63),
  rShoulder: p(25, -63),
  lElbow:    p(-31, -38),
  rElbow:    p(31, -38),
  lWrist:    p(-33, -13),
  rWrist:    p(33, -13),
  hipCenter: p(0, -13),
  lHip:      p(-15, -13),
  rHip:      p(15, -13),
  lKnee:     p(-18, 26),
  rKnee:     p(18, 26),
  lAnkle:    p(-20, 61),
  rAnkle:    p(20, 61),
};

const WALK1: Pose = {
  head:      p(0, -84),
  neck:      p(0, -69),
  chest:     p(0, -49),
  lShoulder: p(-25, -64),
  rShoulder: p(25, -64),
  // Arms swing opposite to legs
  lElbow:    p(-22, -42),
  rElbow:    p(36, -36),
  lWrist:    p(-18, -22),
  rWrist:    p(40, -10),
  hipCenter: p(0, -14),
  lHip:      p(-15, -14),
  rHip:      p(15, -14),
  // Left leg forward, right back
  lKnee:     p(-10, 22),
  rKnee:     p(24, 20),
  lAnkle:    p(-6, 58),
  rAnkle:    p(28, 58),
};

const WALK2: Pose = {
  head:      p(0, -84),
  neck:      p(0, -69),
  chest:     p(0, -49),
  lShoulder: p(-25, -64),
  rShoulder: p(25, -64),
  // Arms swing opposite
  lElbow:    p(-36, -36),
  rElbow:    p(22, -42),
  lWrist:    p(-40, -10),
  rWrist:    p(18, -22),
  hipCenter: p(0, -14),
  lHip:      p(-15, -14),
  rHip:      p(15, -14),
  // Right leg forward, left back
  lKnee:     p(-24, 20),
  rKnee:     p(10, 22),
  lAnkle:    p(-28, 58),
  rAnkle:    p(6, 58),
};

const KICK: Pose = {
  head:      p(-2, -83),
  neck:      p(-2, -68),
  chest:     p(-2, -48),
  lShoulder: p(-27, -63),
  rShoulder: p(23, -63),
  lElbow:    p(-35, -38),
  rElbow:    p(35, -45),
  lWrist:    p(-38, -14),
  rWrist:    p(42, -28),
  hipCenter: p(-2, -14),
  lHip:      p(-17, -14),
  rHip:      p(13, -14),
  // Left leg planted, right leg kicks forward
  lKnee:     p(-20, 24),
  rKnee:     p(35, 10),
  lAnkle:    p(-22, 59),
  rAnkle:    p(60, 8),
};

const PUNCH: Pose = {
  head:      p(2, -84),
  neck:      p(2, -69),
  chest:     p(2, -49),
  lShoulder: p(-23, -64),
  rShoulder: p(27, -64),
  // Left arm guard, right arm punch
  lElbow:    p(-30, -48),
  rElbow:    p(50, -60),
  lWrist:    p(-25, -30),
  rWrist:    p(70, -62),
  hipCenter: p(2, -14),
  lHip:      p(-13, -14),
  rHip:      p(17, -14),
  lKnee:     p(-16, 24),
  rKnee:     p(20, 22),
  lAnkle:    p(-18, 59),
  rAnkle:    p(22, 58),
};

/* ─── Animation sequence ─── */
interface AnimPhase { from: Pose; to: Pose; duration: number; }

const SEQUENCE: AnimPhase[] = [
  // Idle breathing
  { from: IDLE,  to: IDLE2, duration: 1200 },
  { from: IDLE2, to: IDLE,  duration: 1200 },
  { from: IDLE,  to: IDLE2, duration: 1200 },
  // Walk
  { from: IDLE2, to: WALK1, duration: 350 },
  { from: WALK1, to: WALK2, duration: 450 },
  { from: WALK2, to: WALK1, duration: 450 },
  { from: WALK1, to: WALK2, duration: 450 },
  { from: WALK2, to: IDLE,  duration: 350 },
  // Kick
  { from: IDLE,  to: KICK,  duration: 300 },
  { from: KICK,  to: KICK,  duration: 350 },
  { from: KICK,  to: IDLE,  duration: 450 },
  // Idle
  { from: IDLE,  to: IDLE2, duration: 1000 },
  { from: IDLE2, to: IDLE,  duration: 1000 },
  // Punch
  { from: IDLE,  to: PUNCH, duration: 200 },
  { from: PUNCH, to: PUNCH, duration: 250 },
  { from: PUNCH, to: IDLE,  duration: 450 },
  // Rest
  { from: IDLE,  to: IDLE2, duration: 1200 },
  { from: IDLE2, to: IDLE,  duration: 1200 },
];

const TOTAL_DURATION = SEQUENCE.reduce((s, p) => s + p.duration, 0);

/* ─── Helpers ─── */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpPose(from: Pose, to: Pose, t: number): Pose {
  const e = easeInOutCubic(t);
  const result: Partial<Pose> = {};
  for (const key of Object.keys(from) as JointKey[]) {
    result[key] = [
      lerp(from[key][0], to[key][0], e),
      lerp(from[key][1], to[key][1], e),
    ];
  }
  return result as Pose;
}

function getCurrentPose(time: number): Pose {
  const loopTime = time % TOTAL_DURATION;
  let elapsed = 0;
  for (const phase of SEQUENCE) {
    if (loopTime < elapsed + phase.duration) {
      const t = (loopTime - elapsed) / phase.duration;
      return lerpPose(phase.from, phase.to, t);
    }
    elapsed += phase.duration;
  }
  return IDLE;
}

/* ─── Trail + Particles ─── */
interface TrailPoint { x: number; y: number; age: number; }
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; life: number; maxLife: number;
}

/* ─── Component ─── */
export function RobotWireframe() {
  const animRef = useRef(0);
  const startRef = useRef(0);
  const trailRef = useRef<TrailPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [, forceUpdate] = useState(0);

  const spawnParticles = useCallback((pose: Pose) => {
    const tips: JointKey[] = ["lWrist", "rWrist", "lAnkle", "rAnkle"];
    const particles = particlesRef.current;
    for (const key of tips) {
      if (Math.random() > 0.35) continue;
      const [x, y] = pose[key];
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.35 + 0.15,
        life: 0,
        maxLife: 700 + Math.random() * 1000,
      });
    }
    if (particles.length > 50) particlesRef.current = particles.slice(-50);
  }, []);

  const updateParticles = useCallback((dt: number) => {
    particlesRef.current = particlesRef.current
      .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life + dt }))
      .filter((p) => p.life < p.maxLife);
  }, []);

  useEffect(() => {
    let running = true;
    let lastTime = 0;
    const loop = (ts: number) => {
      if (!running) return;
      if (!startRef.current) { startRef.current = ts; lastTime = ts; }
      const elapsed = ts - startRef.current;
      const dt = ts - lastTime;
      lastTime = ts;
      const pose = getCurrentPose(elapsed);

      // Trails from wrists
      for (const key of ["rWrist", "rAnkle"] as JointKey[]) {
        trailRef.current.push({ x: pose[key][0], y: pose[key][1], age: 0 });
      }
      trailRef.current = trailRef.current
        .map((p) => ({ ...p, age: p.age + dt }))
        .filter((p) => p.age < 400);

      spawnParticles(pose);
      updateParticles(dt);
      animRef.current = elapsed;
      forceUpdate((n) => n + 1);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return () => { running = false; };
  }, [spawnParticles, updateParticles]);

  const pose = getCurrentPose(animRef.current);
  const joints = Object.keys(pose) as JointKey[];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="50 0 200 200" className="w-full h-full" style={{ maxWidth: 420, maxHeight: 520 }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="headGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.03" />
            <stop offset="70%" stopColor="#FF4D00" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vitruvian circles */}
        <circle cx={CX} cy={CY - 12} r="78" fill="url(#circleGrad)" stroke="#FF4D00" strokeOpacity="0.07" strokeWidth="0.4" />
        <circle cx={CX} cy={CY - 12} r="58" fill="none" stroke="#FF4D00" strokeOpacity="0.04" strokeWidth="0.3" strokeDasharray="2 5" />

        {/* Particles */}
        {particlesRef.current.map((pt, i) => {
          const prog = pt.life / pt.maxLife;
          return (
            <circle key={`p-${i}`} cx={pt.x} cy={pt.y}
              r={pt.size * (1 - prog * 0.5)} fill="#FF4D00" opacity={pt.opacity * (1 - prog)} />
          );
        })}

        {/* Trails */}
        {trailRef.current.map((t, i) => (
          <circle key={`t-${i}`} cx={t.x} cy={t.y} r={0.8}
            fill="#FF4D00" opacity={Math.max(0, 0.25 * (1 - t.age / 400))} filter="url(#trailGlow)" />
        ))}

        {/* Bones */}
        {BONES.map(([a, b], i) => (
          <line key={`b-${i}`}
            x1={pose[a][0]} y1={pose[a][1]}
            x2={pose[b][0]} y2={pose[b][1]}
            stroke="#E0DDD5" strokeOpacity="0.3" strokeWidth="0.8" strokeLinecap="round" />
        ))}

        {/* Joints */}
        {joints.map((key) => {
          const [x, y] = pose[key];
          const isHead = key === "head";
          const isMajor = ["neck", "chest", "hipCenter", "lShoulder", "rShoulder", "lHip", "rHip"].includes(key);
          const r = isHead ? 5 : isMajor ? 2.2 : 1.8;

          return (
            <g key={key}>
              <circle cx={x} cy={y} r={r + 1.5}
                fill="#FF4D00" opacity={isHead ? 0.12 : 0.06}
                filter={isHead ? "url(#headGlow)" : "url(#glow)"} />
              <circle cx={x} cy={y} r={r} fill="#E0DDD5" opacity={isHead ? 1 : 0.85} />
              <circle cx={x} cy={y} r={r * 0.35} fill="#FFFFFF" opacity={0.7} />
            </g>
          );
        })}

        {/* Head ring */}
        <circle cx={pose.head[0]} cy={pose.head[1]} r={7.5}
          fill="none" stroke="#FF4D00" strokeOpacity="0.18" strokeWidth="0.4" />

        {/* Ground line */}
        <line x1={CX - 40} y1={CY + 65} x2={CX + 40} y2={CY + 65}
          stroke="#E0DDD5" strokeOpacity="0.05" strokeWidth="0.3" />
        {[-30, -15, 0, 15, 30].map((dx, i) => (
          <circle key={`g-${i}`} cx={CX + dx} cy={CY + 65} r={0.4} fill="#E0DDD5" opacity={0.12} />
        ))}
      </svg>
    </div>
  );
}
