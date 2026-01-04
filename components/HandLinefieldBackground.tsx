"use client";

import React, { useEffect, useMemo, useRef } from "react";

/**
 * HandLinefieldBackground
 * - Canvas-only “3D” robotic hand built from 3D guide points projected to screen space.
 * - Forms (draw), holds, disperses (dissolve) just like ArmLinefieldBackground.
 * - Designed to be subtle: low opacity, vignette + readability mask, no pointer events.
 *
 * Why this approach:
 * - Keeps the same calm wallpaper feel (no Three.js overhead).
 * - Adds depth via a lightweight perspective projection.
 * - Easy to tweak: hand shape is just a set of 3D polylines.
 */

type Props = {
  opacity?: number; // 0..1
  density?: number; // particle multiplier
  speed?: number; // time multiplier
  accent?: "cyan" | "teal" | "violet" | "white";
};

type Pt3 = { x: number; y: number; z: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Build a stylized “robotic hand” as a set of 3D polylines:
 * - Palm outline (soft rectangle-ish)
 * - Five finger chains
 * - Slight mechanical vibe: straighter segments + mild symmetry
 * Normalized-ish coordinates centered around (0,0,0), roughly in [-0.5..0.5] space.
 */
function handPolylines3D(): Pt3[][] {
  // Palm (a rounded-rect-ish polyline)
  const palm: Pt3[] = [
    { x: -0.28, y: 0.14, z: 0.02 },
    { x: 0.28, y: 0.14, z: 0.02 },
    { x: 0.32, y: -0.10, z: -0.02 },
    { x: 0.18, y: -0.30, z: -0.05 },
    { x: -0.18, y: -0.30, z: -0.05 },
    { x: -0.32, y: -0.10, z: -0.02 },
    { x: -0.28, y: 0.14, z: 0.02 },
  ];

  // Finger base x positions across the palm top edge
  const fingerBases = [
    { bx: -0.22, by: 0.14, splay: -0.12 }, // pinky
    { bx: -0.11, by: 0.14, splay: -0.06 }, // ring
    { bx: 0.0, by: 0.14, splay: 0.0 }, // middle
    { bx: 0.11, by: 0.14, splay: 0.06 }, // index
  ];

  // Four fingers, 4 joints each
  const fingers = fingerBases.map(({ bx, by, splay }, i) => {
    // Slight length differences
    const L1 = 0.18 + i * 0.01;
    const L2 = 0.16 + i * 0.008;
    const L3 = 0.13 + i * 0.006;

    // Mild depth curve for a “3D stack”
    const z0 = 0.03 - i * 0.01;

    return [
      { x: bx, y: by, z: z0 },
      { x: bx + splay * 0.25, y: by + L1, z: z0 + 0.02 },
      { x: bx + splay * 0.45, y: by + L1 + L2, z: z0 + 0.05 },
      { x: bx + splay * 0.6, y: by + L1 + L2 + L3, z: z0 + 0.08 },
    ];
  });

  // Thumb (angled, lower base on the side)
  const thumb: Pt3[] = [
    { x: 0.28, y: 0.05, z: 0.01 },
    { x: 0.40, y: 0.00, z: 0.05 },
    { x: 0.46, y: -0.10, z: 0.10 },
    { x: 0.42, y: -0.20, z: 0.12 },
  ];

  // Wrist / forearm hint (tiny, so it reads as “robotic” not “floating hand”)
  const wrist: Pt3[] = [
    { x: -0.10, y: -0.30, z: -0.05 },
    { x: 0.10, y: -0.30, z: -0.05 },
    { x: 0.14, y: -0.44, z: -0.08 },
    { x: -0.14, y: -0.44, z: -0.08 },
    { x: -0.10, y: -0.30, z: -0.05 },
  ];

  return [palm, ...fingers, thumb, wrist];
}

function resamplePolyline3D(points: Pt3[], n: number): Pt3[] {
  const segs: { a: Pt3; b: Pt3; len: number }[] = [];
  let total = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    segs.push({ a, b, len });
    total += len;
  }
  if (total === 0) return points.slice();

  const out: Pt3[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * total;
    let acc = 0;
    for (const s of segs) {
      if (acc + s.len >= t) {
        const u = (t - acc) / s.len;
        out.push({
          x: lerp(s.a.x, s.b.x, u),
          y: lerp(s.a.y, s.b.y, u),
          z: lerp(s.a.z, s.b.z, u),
        });
        break;
      }
      acc += s.len;
    }
  }
  return out;
}

function project3D(
  p: Pt3,
  cx: number,
  cy: number,
  scale: number,
  depth: number
) {
  // Simple perspective projection.
  const z = depth / (depth + p.z * 900); // p.z is small; amplify for visible depth
  return {
    x: cx + p.x * scale * z,
    y: cy + p.y * scale * z,
    z,
  };
}

function pickStroke(accent: Props["accent"]) {
  switch (accent) {
    case "cyan":
      return { line: "rgba(34,211,238,1)", glow: "rgba(34,211,238,0.12)" };
    case "teal":
      return { line: "rgba(45,212,191,1)", glow: "rgba(45,212,191,0.12)" };
    case "violet":
      return { line: "rgba(167,139,250,1)", glow: "rgba(167,139,250,0.12)" };
    default:
      return { line: "rgba(255,255,255,1)", glow: "rgba(255,255,255,0.10)" };
  }
}

export function HandLinefieldBackground({
  opacity = 0.6,
  density = 1,
  speed = 1,
  accent = "cyan",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const guide = useMemo(() => {
    const polylines = handPolylines3D();
    // Resample each polyline, then concatenate for a single guide list
    const parts = polylines.map((pl) => resamplePolyline3D(pl, 110));
    return parts.flat();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement as Element);

    // Particles that sample guide points + drift
    const baseCount = Math.floor(220 * density);
    const particles = new Array(baseCount).fill(0).map((_, i) => ({
      id: i,
      gi: Math.floor(Math.random() * guide.length),
      phase: Math.random() * 10,
      drift: (Math.random() * 2 - 1) * 0.9,
      jitter: (Math.random() * 2 - 1) * 0.6,
      depthBias: (Math.random() * 2 - 1) * 0.25, // per-particle z drift
    }));

    // Timeline: draw → hold → dissolve → gap
    const T_DRAW = 2.6;
    const T_HOLD = 1.4;
    const T_DISSOLVE = 2.4;
    const T_GAP = 0.6;
    const T_TOTAL = T_DRAW + T_HOLD + T_DISSOLVE + T_GAP;

    const { line: ACCENT, glow: GLOW } = pickStroke(accent);

    let t0 = performance.now();

    const render = () => {
      const now = performance.now();
      const t = ((now - t0) / 1000) * speed;
      const u = t % T_TOTAL;

      const isDrawing = u < T_DRAW;
      const isHolding = u >= T_DRAW && u < T_DRAW + T_HOLD;
      const isDissolving = u >= T_DRAW + T_HOLD && u < T_DRAW + T_HOLD + T_DISSOLVE;

      const drawProg = clamp(u / T_DRAW, 0, 1);
      const dissolveProg = isDissolving ? (u - (T_DRAW + T_HOLD)) / T_DISSOLVE : 0;

      const vis =
        isDrawing ? drawProg :
        isHolding ? 1 :
        isDissolving ? (1 - dissolveProg) :
        0;

      ctx.clearRect(0, 0, w, h);

      // Subtle vignette (readability)
      const vignette = ctx.createRadialGradient(
        w * 0.55,
        h * 0.38,
        0,
        w * 0.55,
        h * 0.38,
        Math.max(w, h) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Place hand slightly to the right like “tech wallpaper”
      const scale = Math.min(w, h) * 0.95;
      const cx = w * 0.62;
      const cy = h * 0.52;

      // Reveal guide progressively during draw
      const revealCount = Math.floor(guide.length * (isDrawing ? drawProg : 1));
      const maxIndex = isDrawing ? Math.max(12, revealCount) : guide.length;

      // Optional faint guide stroke for coherence
      if (vis > 0) {
        ctx.globalAlpha = 0.18 * opacity * vis;
        ctx.lineWidth = 1;

        // Draw as short connected segments rather than one giant line
        // to keep “hand” suggestion without shouting.
        for (let i = 0; i < maxIndex - 1; i += 2) {
          const p0 = guide[i];
          const p1 = guide[i + 1];

          const P0 = project3D(p0, cx, cy, scale, 720);
          const P1 = project3D(p1, cx, cy, scale, 720);

          ctx.beginPath();
          ctx.moveTo(P0.x, P0.y);
          ctx.lineTo(P1.x, P1.y);
          ctx.strokeStyle = "rgba(255,255,255,1)";
          ctx.stroke();
        }
      }

      const timeJitter = (now / 1000) * 0.75;

      // Particles: orbit around guide, gain z-spread during dissolve
      for (const p of particles) {
        const driftAway = isDissolving ? dissolveProg : 0;

        const span = maxIndex;
        const baseGi = Math.floor((p.gi + timeJitter * 20 + p.drift * 10) % span);

        const g = guide[baseGi];

        // During dissolve, push points backward in depth and spread slightly
        const extraZ = driftAway * (0.55 + p.depthBias) * 0.45;
        const g3: Pt3 = { x: g.x, y: g.y, z: g.z + extraZ };

        const GP = project3D(g3, cx, cy, scale, 720);

        // Jitter radius:
        // - small while forming
        // - slightly larger while dissolving (but not explosive)
        const j = 5 + driftAway * 22;

        const px =
          GP.x +
          Math.sin((p.phase + timeJitter) * 3.1) * j +
          p.jitter * 1.8;

        const py =
          GP.y +
          Math.cos((p.phase + timeJitter) * 2.7) * j +
          p.jitter * 1.8;

        // Glow dot (accent tint, very subtle)
        ctx.globalAlpha = 0.12 * opacity * vis;
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = GLOW;
        ctx.fill();

        // Main dot
        ctx.globalAlpha = 0.52 * opacity * vis;
        ctx.beginPath();
        ctx.arc(px, py, 1.35, 0, Math.PI * 2);
        // Mix: slightly accent the hand while keeping mostly white
        ctx.fillStyle = ACCENT;
        ctx.fill();

        // Micro-line to next projected guide point
        const next = guide[Math.min(span - 1, baseGi + 1)];
        const next3: Pt3 = { x: next.x, y: next.y, z: next.z + extraZ };
        const NP = project3D(next3, cx, cy, scale, 720);

        ctx.globalAlpha = 0.20 * opacity * vis;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(lerp(px, NP.x, 0.22), lerp(py, NP.y, 0.22));
        // Micro-lines stay more white so they don’t “neon outline” the hand
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [guide, opacity, density, speed, accent]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* readability mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/25" />
    </div>
  );
}
