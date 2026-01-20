# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Dev server on localhost:3000 (Turbopack disabled for Windows compatibility)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint (flat config with Next.js + TypeScript rules)
```

## Architecture Overview

This is a personal portfolio site built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Tailwind CSS 4**.

### Content-Driven Design

Portfolio data lives in `/content/*.json` files:
- `site.json` - Personal info, headline, highlights
- `projects.json` - Detailed project data
- `experience.json` - Research experience entries
- `archive.json` - Yearly milestones

The `lib/content.ts` module exports typed getter functions (`getSite()`, `getProjects()`, `getExperience()`, `getArchive()`) that pages import directly. All content is static at build time—no API routes or runtime fetching.

### Page Structure

- `/` - Homepage with animated hero, featured projects, principles
- `/projects` - Project gallery (featured + early builds)
- `/projects/[slug]` - Individual project detail pages (anvya, human3d, biomarker, prosthesis, etc.)
- `/research` - Research experience timeline
- `/Leadership` - Interactive network graph of leadership roles
- `/archive` - Timeline of milestones (fellowships, conferences, awards)
- `/contact` - Contact info and recruitment templates

### Key Components

- `components/ArmLinefieldBackground.tsx` - Canvas-based animated robotic arm for hero section (custom polyline animation with particle system)
- `components/FadeIn.tsx` - Scroll-triggered fade-in using Intersection Observer
- `components/ProjectCard.tsx`, `TagPill.tsx`, `Section.tsx` - Reusable UI primitives

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`

### Styling

- Dark theme (neutral-950 background)
- Tailwind utility classes with custom gradients and effects
- Client components marked with `"use client"` directive for interactivity
