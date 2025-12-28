import Link from "next/link";
import type { Project } from "@/lib/content";
import { TagPill } from "./TagPill";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            <Link className="hover:underline" href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {project.timeframe} · {project.location}
          </p>
        </div>
        <Link className="text-sm text-blue-600 hover:underline" href={`/projects/${project.slug}`}>
          Details
        </Link>
      </div>

      <p className="mt-4 text-zinc-800 dark:text-zinc-100">{project.oneLiner}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <TagPill key={t} label={t} />
        ))}
      </div>
    </div>
  );
}
