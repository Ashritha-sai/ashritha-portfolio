"use client";

import { useState } from "react";

type Skill = {
  name: string;
  level: number; // 0-100
  category: string;
};

type Props = {
  skills: Skill[];
  size?: number;
};

export function SkillsRadar({ skills, size = 300 }: Props) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const center = size / 2;
  const maxRadius = (size / 2) - 40;
  const levels = 5;

  // Calculate positions for each skill
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Create the polygon path for skill values
  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.level);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background circles */}
        {Array.from({ length: levels }).map((_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="rgba(99, 102, 241, 0.8)"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Skill points */}
        {skills.map((skill, i) => {
          const point = getPoint(i, skill.level);
          const isHovered = hoveredSkill === skill.name;
          return (
            <circle
              key={skill.name}
              cx={point.x}
              cy={point.y}
              r={isHovered ? 8 : 5}
              fill={isHovered ? "rgb(99, 102, 241)" : "rgb(129, 140, 248)"}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const point = getPoint(i, 115);
          const isHovered = hoveredSkill === skill.name;
          return (
            <text
              key={`label-${skill.name}`}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-xs transition-all duration-200 ${
                isHovered ? "fill-indigo-600 font-semibold" : "fill-slate-600"
              }`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill.name}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredSkill && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
          <div className="text-sm font-semibold text-slate-800">{hoveredSkill}</div>
          <div className="text-xs text-slate-500">
            {skills.find((s) => s.name === hoveredSkill)?.level}% proficiency
          </div>
        </div>
      )}
    </div>
  );
}
