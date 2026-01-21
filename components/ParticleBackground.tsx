"use client";

import React, { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * - Renders an interactive particle system that follows the mouse cursor
 * - Particles gently drift and connect with nearby particles
 * - Designed for light theme with soft blue-gray tones
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const PARTICLE_COUNT = 90;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INFLUENCE_DISTANCE = 200;
    const MOUSE_ATTRACTION_STRENGTH = 0.02;

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

      // Reinitialize particles when resizing
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement as Element);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (const particle of particles) {
        // Mouse attraction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < MOUSE_INFLUENCE_DISTANCE && distToMouse > 0) {
          const force = (MOUSE_INFLUENCE_DISTANCE - distToMouse) / MOUSE_INFLUENCE_DISTANCE;
          particle.vx += (dx / distToMouse) * force * MOUSE_ATTRACTION_STRENGTH;
          particle.vy += (dy / distToMouse) * force * MOUSE_ATTRACTION_STRENGTH;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Add slight random drift
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        // Boundary wrapping
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.6)"; // indigo-500
        ctx.fill();
      }

      // Draw connections between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`; // indigo-400
            ctx.stroke();
          }
        }
      }

      // Draw connections to mouse cursor
      if (mouse.x > 0 && mouse.y > 0) {
        for (const particle of particles) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE_DISTANCE) {
            const opacity = (1 - dist / MOUSE_INFLUENCE_DISTANCE) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`; // indigo-500
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
