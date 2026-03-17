"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function HeroFigure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouse({
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotY = mouse.x * 12;
  const rotX = -mouse.y * 8;
  const lx = 38 + mouse.x * 14;
  const ly = 30 + mouse.y * 12;
  const swing = mouse.x * 8;

  return (
    <motion.div
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: 380, height: 500 }}
      initial={{ opacity: 0, scale: 0.8, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Large ambient glow underneath ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -30,
          width: "110%",
          height: 120,
          background: "radial-gradient(ellipse at 50% 80%, rgba(255,77,0,0.12), rgba(255,77,0,0.04) 40%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Rim light halo behind head ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 20,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,0,0.06) 0%, transparent 60%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* ── 3D rotating container ── */}
      <motion.div
        className="relative h-full w-full"
        style={{
          transform: `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        initial={{ rotateY: -15 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
      >
        {/* ═══ HAIR BACK ═══ */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 240,
            height: 380,
            top: 30,
            borderRadius: "120px 120px 70px 70px",
            background: "linear-gradient(170deg, #1A1A1A 0%, #080808 40%, #030303 100%)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 15px 30px rgba(0,0,0,0.5)",
            transform: "translateZ(-12px)",
          }}
        />

        {/* Hair volume top */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 252,
            height: 160,
            top: 20,
            borderRadius: "130px 130px 50px 50px",
            background: "linear-gradient(160deg, #252525 0%, #0C0C0C 100%)",
            transform: "translateZ(-10px)",
          }}
        />

        {/* ═══ BODY / CLOTHING ═══ */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 310,
            height: 210,
            bottom: 0,
            borderRadius: "35px 35px 25px 25px",
            background: `radial-gradient(ellipse at ${lx}% 25%, #2E2E2E, #1A1A1A 50%, #111)`,
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.6), inset 0 2px 25px rgba(255,255,255,0.02), inset 0 -10px 30px rgba(0,0,0,0.3)",
            transform: "translateZ(6px)",
          }}
        >
          {/* V-neckline */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: 0,
              width: 0,
              height: 0,
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderTop: "36px solid #B87A4A",
            }}
          />
          {/* Clothing fold highlights */}
          <div
            className="absolute left-1/2 top-10 -translate-x-1/2"
            style={{
              width: 100,
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            }}
          />
          <div
            className="absolute left-1/2 top-16 -translate-x-1/2"
            style={{
              width: 60,
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
            }}
          />
        </div>

        {/* ═══ NECK ═══ */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 60,
            height: 42,
            bottom: 198,
            borderRadius: 20,
            background: `radial-gradient(ellipse at ${lx}% ${ly}%, #D49668, #A56C3C)`,
            boxShadow: "inset -4px 0 10px rgba(0,0,0,0.15), 0 8px 15px rgba(0,0,0,0.2)",
            transform: "translateZ(10px)",
          }}
        />

        {/* ═══ HEAD / FACE ═══ */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 190,
            height: 218,
            top: 50,
            borderRadius: "95px 95px 85px 85px",
            background: `radial-gradient(ellipse at ${lx}% ${ly}%, #DCAC78, #C48B58 40%, #A06C3A 85%)`,
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.5), inset -8px -10px 25px rgba(0,0,0,0.15), inset 5px 5px 20px rgba(255,210,150,0.08)",
            transform: "translateZ(18px)",
          }}
        >
          {/* Cheek blush */}
          <div className="absolute rounded-full" style={{ width: 36, height: 22, left: 20, top: 125, background: "rgba(200,120,100,0.14)", filter: "blur(8px)" }} />
          <div className="absolute rounded-full" style={{ width: 36, height: 22, right: 20, top: 125, background: "rgba(200,120,100,0.14)", filter: "blur(8px)" }} />

          {/* ─ EYES ─ */}
          {/* Left eye */}
          <div
            className="absolute"
            style={{
              width: 32,
              height: 20,
              left: 34,
              top: 98,
              borderRadius: "50%",
              background: "#F4EDE2",
              boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 15,
                height: 15,
                left: 7 + mouse.x * 3.5,
                top: 1.5 + mouse.y * 2.5,
                background: "radial-gradient(circle at 40% 35%, #3D2010, #1A0E05 70%)",
              }}
            />
            <div className="absolute rounded-full" style={{ width: 5, height: 5, left: 11 + mouse.x * 1.5, top: 2, background: "#fff" }} />
            <div className="absolute rounded-full" style={{ width: 3, height: 3, left: 16 + mouse.x * 1, top: 7, background: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Right eye */}
          <div
            className="absolute"
            style={{
              width: 32,
              height: 20,
              right: 34,
              top: 98,
              borderRadius: "50%",
              background: "#F4EDE2",
              boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 15,
                height: 15,
                left: 9 + mouse.x * 3.5,
                top: 1.5 + mouse.y * 2.5,
                background: "radial-gradient(circle at 40% 35%, #3D2010, #1A0E05 70%)",
              }}
            />
            <div className="absolute rounded-full" style={{ width: 5, height: 5, left: 14 + mouse.x * 1.5, top: 2, background: "#fff" }} />
            <div className="absolute rounded-full" style={{ width: 3, height: 3, left: 19 + mouse.x * 1, top: 7, background: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Eyelids */}
          <div className="absolute" style={{ width: 36, height: 10, left: 32, top: 93, borderRadius: "50% 50% 0 0", borderBottom: "2.5px solid #2A1A0A" }} />
          <div className="absolute" style={{ width: 36, height: 10, right: 32, top: 93, borderRadius: "50% 50% 0 0", borderBottom: "2.5px solid #2A1A0A" }} />

          {/* Eyebrows */}
          <div className="absolute" style={{ width: 38, height: 5, left: 32, top: 80, borderRadius: "5px 10px 5px 2px", background: "#1A1208", transform: "rotate(-4deg)" }} />
          <div className="absolute" style={{ width: 38, height: 5, right: 32, top: 80, borderRadius: "10px 5px 2px 5px", background: "#1A1208", transform: "rotate(4deg)" }} />

          {/* Nose */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: 16,
              height: 24,
              top: 125,
              borderRadius: "50% 50% 45% 45%",
              background: `radial-gradient(ellipse at ${lx}% 40%, rgba(180,120,70,0.35), transparent)`,
              boxShadow: "1px 4px 5px rgba(0,0,0,0.1)",
            }}
          />
          {/* Nose ring */}
          <div className="absolute rounded-full" style={{ width: 6, height: 6, left: 78, top: 143, background: "radial-gradient(circle at 35% 30%, #F0D080, #C49840)", boxShadow: "0 1px 4px rgba(0,0,0,0.35), 0 0 8px rgba(240,208,128,0.2)" }} />

          {/* Lips */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 160 }}>
            <div style={{ width: 36, height: 9, borderRadius: "0 0 50% 50%", background: "linear-gradient(to bottom, #B55A50, #C06858)" }} />
            <div style={{ width: 34, height: 11, marginLeft: 1, marginTop: -1, borderRadius: "0 0 50% 50%", background: "linear-gradient(to bottom, #C06858, #A85048)", boxShadow: "0 3px 5px rgba(0,0,0,0.12)" }} />
            <div className="absolute rounded-full" style={{ width: 10, height: 4, left: 13, top: 10, background: "rgba(255,200,180,0.18)", filter: "blur(1.5px)" }} />
          </div>

          {/* Bindi */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 12,
              height: 12,
              top: 56,
              background: "radial-gradient(circle at 40% 35%, #FF6B20, #FF4D00)",
              boxShadow: "0 0 16px rgba(255,77,0,0.4), 0 0 6px rgba(255,77,0,0.6), 0 0 30px rgba(255,77,0,0.15)",
            }}
          />
        </div>

        {/* ═══ HAIR FRONT — frames the face ═══ */}
        <div
          className="absolute"
          style={{
            width: 42,
            height: 190,
            left: 64,
            top: 55,
            borderRadius: "0 0 24px 35px",
            background: "linear-gradient(180deg, #181818, #0A0A0A 60%, #050505)",
            transform: "translateZ(24px)",
            boxShadow: "4px 0 12px rgba(0,0,0,0.4)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 42,
            height: 190,
            right: 64,
            top: 55,
            borderRadius: "0 0 35px 24px",
            background: "linear-gradient(180deg, #181818, #0A0A0A 60%, #050505)",
            transform: "translateZ(24px)",
            boxShadow: "-4px 0 12px rgba(0,0,0,0.4)",
          }}
        />

        {/* Hair shine highlights */}
        <div
          className="absolute"
          style={{
            width: 8,
            height: 80,
            left: 74,
            top: 70,
            borderRadius: 10,
            background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)",
            transform: "translateZ(25px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 6,
            height: 60,
            right: 76,
            top: 75,
            borderRadius: 10,
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), transparent)",
            transform: "translateZ(25px)",
          }}
        />

        {/* ═══ EARRINGS — Jhumka ═══ */}
        {/* Left */}
        <div
          className="absolute"
          style={{
            left: 60,
            top: 205,
            transform: `rotate(${swing}deg) translateZ(26px)`,
            transformOrigin: "top center",
            transition: "transform 0.12s ease-out",
          }}
        >
          <div className="rounded-full" style={{ width: 12, height: 12, background: "radial-gradient(circle at 35% 30%, #F0D080, #B88830)", boxShadow: "0 2px 8px rgba(0,0,0,0.35), 0 0 10px rgba(240,208,128,0.15)" }} />
          <div className="mx-auto" style={{ width: 2, height: 10, background: "#C49840" }} />
          <div style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "18px solid #D4A843", marginLeft: -4, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }} />
          <div className="mx-auto rounded-full" style={{ width: 8, height: 8, marginTop: 2, background: "radial-gradient(circle at 35% 30%, #F0D080, #C49840)", boxShadow: "0 2px 5px rgba(0,0,0,0.25)" }} />
        </div>

        {/* Right */}
        <div
          className="absolute"
          style={{
            right: 60,
            top: 205,
            transform: `rotate(${-swing}deg) translateZ(26px)`,
            transformOrigin: "top center",
            transition: "transform 0.12s ease-out",
          }}
        >
          <div className="rounded-full" style={{ width: 12, height: 12, background: "radial-gradient(circle at 35% 30%, #F0D080, #B88830)", boxShadow: "0 2px 8px rgba(0,0,0,0.35), 0 0 10px rgba(240,208,128,0.15)" }} />
          <div className="mx-auto" style={{ width: 2, height: 10, background: "#C49840" }} />
          <div style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "18px solid #D4A843", marginLeft: -4, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }} />
          <div className="mx-auto rounded-full" style={{ width: 8, height: 8, marginTop: 2, background: "radial-gradient(circle at 35% 30%, #F0D080, #C49840)", boxShadow: "0 2px 5px rgba(0,0,0,0.25)" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
