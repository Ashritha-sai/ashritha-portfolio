"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const TECHS = [
  "Python", "PyTorch", "NumPy", "SciPy", "scikit-learn",
  "CUDA", "C++", "MuJoCo", "CasADi", "MATLAB",
  "OpenCV", "YOLOv8", "SAM", "MiDaS", "TensorFlow",
  "ROS", "PyBullet", "OpenSim", "Simulink", "Git",
  "Linux", "Docker", "IPOPT", "Pandas",
];

type Ball = {
  name: string;
  r: number;
  px: number; py: number; pz: number;
  vx: number; vy: number; vz: number;
};

/* Shared mouse state — updated every frame */
const mouse = { x: 999, y: 999 };

function makeBalls(): Ball[] {
  return TECHS.map((name, i) => {
    const angle = (i / TECHS.length) * Math.PI * 2;
    const spread = 2 + Math.random() * 3;
    return {
      name,
      r: 0.25 + Math.random() * 0.4,
      px: Math.cos(angle) * spread + (Math.random() - 0.5),
      py: Math.sin(angle) * spread * 0.6 + (Math.random() - 0.5),
      pz: (Math.random() - 0.5) * 2,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      vz: 0,
    };
  });
}

/* ── Single 3D sphere ── */
function Sphere3D({ ball }: { ball: Ball }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(ball.px, ball.py, ball.pz);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[ball.r, 64, 64]} />
      <meshStandardMaterial
        color="#FFFFFF"
        metalness={0.1}
        roughness={0.15}
        emissive="#404040"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Physics engine — runs every frame ── */
function PhysicsEngine({ balls }: { balls: Ball[] }) {
  const { pointer, size } = useThree();

  useFrame(() => {
    const aspect = size.width / size.height;
    mouse.x = pointer.x * aspect * 5;
    mouse.y = pointer.y * 5;

    for (const b of balls) {
      /* Cursor pushes spheres HARD */
      const dx = b.px - mouse.x;
      const dy = b.py - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4 && dist > 0.01) {
        const strength = ((4 - dist) / 4) * 0.08;
        b.vx += (dx / dist) * strength;
        b.vy += (dy / dist) * strength;
      }

      /* Gentle pull toward center so they don't escape */
      b.vx -= b.px * 0.0005;
      b.vy -= b.py * 0.0005;

      /* Integrate */
      b.px += b.vx;
      b.py += b.vy;
      b.pz += b.vz;

      /* Damping */
      b.vx *= 0.97;
      b.vy *= 0.97;
      b.vz *= 0.96;

      /* Walls */
      const wx = 6, wy = 3.5, wz = 1.5;
      if (b.px > wx)  { b.px = wx;  b.vx *= -0.5; }
      if (b.px < -wx) { b.px = -wx; b.vx *= -0.5; }
      if (b.py > wy)  { b.py = wy;  b.vy *= -0.5; }
      if (b.py < -wy) { b.py = -wy; b.vy *= -0.5; }
      if (b.pz > wz)  { b.pz = wz;  b.vz *= -0.4; }
      if (b.pz < -wz) { b.pz = -wz; b.vz *= -0.4; }
    }

    /* Sphere–sphere collision */
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], b = balls[j];
        const dx = a.px - b.px, dy = a.py - b.py, dz = a.pz - b.pz;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const gap = a.r + b.r;

        if (d < gap && d > 0.001) {
          const nx = dx / d, ny = dy / d, nz = dz / d;
          const overlap = (gap - d) * 0.5;
          a.px += nx * overlap; a.py += ny * overlap; a.pz += nz * overlap;
          b.px -= nx * overlap; b.py -= ny * overlap; b.pz -= nz * overlap;

          const relV = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
          if (relV > 0) {
            a.vx -= nx * relV * 0.5; a.vy -= ny * relV * 0.5;
            b.vx += nx * relV * 0.5; b.vy += ny * relV * 0.5;
          }
        }
      }
    }
  });

  return null;
}

/* ── Scene ── */
function Scene() {
  const balls = useMemo(() => makeBalls(), []);

  return (
    <>
      <color attach="background" args={["#0D0D0D"]} />

      {/* Strong lighting to make white spheres pop */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 8]} intensity={3} />
      <directionalLight position={[-8, -5, 5]} intensity={1.5} color="#D0D8FF" />
      <directionalLight position={[0, -8, 3]} intensity={0.8} color="#FFE8D0" />
      <pointLight position={[0, 0, 10]} intensity={2} />

      <PhysicsEngine balls={balls} />

      {balls.map((b) => (
        <Sphere3D key={b.name} ball={b} />
      ))}
    </>
  );
}

/* ── Export (SSR-safe) ── */
export function TechSpheres() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  if (!show) return <div className="h-[550px]" />;

  return (
    <div className="h-[500px] w-full md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
