"use client";

import React, { useEffect, useMemo, useRef } from "react";

/**
 * ArmLinefieldBackground
 * - Renders a subtle animated line field that "draws" a robotic-arm silhouette, then dissolves.
 * - Designed to stay behind content: low opacity, vignette, and mask.
 * - No dependencies. Runs on canvas.
 */

type Props = {
  opacity?: number; // overall effect opacity (0..1)
  density?: number; // particles count multiplier
  speed?: number; // global speed multiplier
};

type Pt = { x: number; y: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * A minimalist robotic arm silhouette built from polyline points (normalized 0..1).
 * This is intentionally abstract so it reads as “robot arm” without screaming stock art.
 * If you want a more accurate arm, we can replace this with points sampled from an SVG path.
 */
function armShapePoints(): Pt[] {
  return [
    { x: 0.22, y: 0.72 }, // base
    { x: 0.30, y: 0.72 },
    { x: 0.34, y: 0.66 },
    { x: 0.38, y: 0.58 }, // lower joint
    { x: 0.46, y: 0.52 },
    { x: 0.54, y: 0.46 }, // elbow
    { x: 0.60, y: 0.40 },
    { x: 0.64, y: 0.34 },
    { x: 0.68, y: 0.30 }, // wrist area
    { x: 0.74, y: 0.28 }, // end-effector
    { x: 0.72, y: 0.24 },
    { x: 0.78, y: 0.26 }, // gripper prong
    { x: 0.74, y: 0.30 }, // back to end-effector
  ];
}

function resamplePolyline(points: Pt[], n: number): Pt[] {
  // Resample along cumulative distance so we get evenly spaced "guide" points.
  const segs: { a: Pt; b: Pt; len: number }[] = [];
  let total = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    segs.push({ a, b, len });
    total += len;
  }

  if (total === 0) return points.slice();

  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * total;
    let acc = 0;
    for (const s of segs) {
      if (acc + s.len >= t) {
        const u = (t - acc) / s.len;
        out.push({ x: lerp(s.a.x, s.b.x, u), y: lerp(s.a.y, s.b.y, u) });
        break;
      }
      acc += s.len;
    }
  }
  return out;
}

export function ArmLinefieldBackground({
  opacity = 0.55,
  density = 1,
  speed = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const guide = useMemo(() => {
    const base = armShapePoints();
    // more points = smoother outline
    return resamplePolyline(base, 220);
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

    // Particles that orbit the guide points.
    const baseCount = Math.floor(180 * density);
    const particles = new Array(baseCount).fill(0).map((_, i) => {
      // each particle tracks a target guide index but can drift
      return {
        id: i,
        gi: Math.floor(Math.random() * guide.length),
        phase: Math.random(),
        drift: (Math.random() * 2 - 1) * 0.9,
        jitter: (Math.random() * 2 - 1) * 0.6,
      };
    });

    // Timeline for loop: draw → hold → dissolve
    // (seconds)
    const T_DRAW = 2.2;
    const T_HOLD = 1.2;
    const T_DISSOLVE = 2.0;
    const T_GAP = 0.5;
    const T_TOTAL = T_DRAW + T_HOLD + T_DISSOLVE + T_GAP;

    let t0 = performance.now();

    const render = () => {
      const now = performance.now();
      const t = ((now - t0) / 1000) * speed;
      const u = t % T_TOTAL;

      // phase controls visibility + behavior
      const drawProg = clamp(u / T_DRAW, 0, 1);
      const isDrawing = u < T_DRAW;
      const isHolding = u >= T_DRAW && u < T_DRAW + T_HOLD;
      const isDissolving = u >= T_DRAW + T_HOLD && u < T_DRAW + T_HOLD + T_DISSOLVE;

      const dissolveProg = isDissolving
        ? (u - (T_DRAW + T_HOLD)) / T_DISSOLVE
        : 0;

      // visibility (0..1)
      const vis =
        isDrawing ? drawProg :
        isHolding ? 1 :
        isDissolving ? (1 - dissolveProg) :
        0;

      // clear
      ctx.clearRect(0, 0, w, h);

      // subtle vignette behind effect (helps readability) - light theme version
      const vignette = ctx.createRadialGradient(w * 0.55, h * 0.40, 0, w * 0.55, h * 0.40, Math.max(w, h) * 0.75);
      vignette.addColorStop(0, `rgba(241,245,249,0)`);
      vignette.addColorStop(1, `rgba(241,245,249,0.4)`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // scale guide into screen space (anchor it to right-ish so it feels “techy wallpaper”)
      const scale = Math.min(w, h) * 1.05;
      const ox = w * 0.58;
      const oy = h * 0.52;

      // how much of the outline is “revealed”
      const revealCount = Math.floor(guide.length * (isDrawing ? drawProg : 1));
      const maxIndex = isDrawing ? Math.max(10, revealCount) : guide.length;

      // draw faint guide stroke (only when visible)
      if (vis > 0) {
        ctx.globalAlpha = 0.45 * opacity * vis;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < maxIndex; i++) {
          const p = guide[i];
          const x = ox + (p.x - 0.5) * scale;
          const y = oy + (p.y - 0.5) * scale;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(71,85,105,1)";
        ctx.stroke();
      }

      // particles + short line connections
      const timeJitter = (now / 1000) * 0.8;

      // connections: draw tiny line segments between nearby particles on the guide
      ctx.globalAlpha = 0.75 * opacity * vis;
      ctx.lineWidth = 1;

      for (const p of particles) {
        // gently progress along guide during draw; drift away during dissolve
        const driftAway = isDissolving ? dissolveProg : 0;

        // pick an index in the revealed portion
        const span = maxIndex;
        const baseGi = Math.floor((p.gi + timeJitter * 18 + p.drift * 12) % span);

        const g = guide[baseGi];
        const gx = ox + (g.x - 0.5) * scale;
        const gy = oy + (g.y - 0.5) * scale;

        // jitter around guide, more during dissolve
        const j = 6 + driftAway * 55;
        const px = gx + Math.sin((p.phase + timeJitter) * 3.1) * j + p.jitter * 2;
        const py = gy + Math.cos((p.phase + timeJitter) * 2.7) * j + p.jitter * 2;

        // draw point
        ctx.globalAlpha = 0.8 * opacity * vis;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(71,85,105,1)";
        ctx.fill();

        // draw micro-line to next guide point (gives “lines forming” feel)
        const next = guide[Math.min(span - 1, baseGi + 1)];
        const nx = ox + (next.x - 0.5) * scale;
        const ny = oy + (next.y - 0.5) * scale;

        ctx.globalAlpha = 0.5 * opacity * vis;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(lerp(px, nx, 0.28), lerp(py, ny, 0.28));
        ctx.strokeStyle = "rgba(71,85,105,1)";
        ctx.stroke();
      }

      // fade out completely in gap (vis=0 already); no need to draw

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [guide, opacity, density, speed]);
return (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <canvas ref={canvasRef} className="absolute inset-0" />
    {/* very light readability mask for light theme */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-100/5 via-slate-100/10 to-slate-100/20" />
  </div>
);
}
