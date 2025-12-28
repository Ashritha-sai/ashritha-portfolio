import site from "../content/site.json";
import projects from "../content/projects.json";
import experience from "../content/experience.json";
import archive from "../content/archive.json";

export type Site = typeof site;
export type Project = (typeof projects)[number];
export type Experience = (typeof experience)[number];
export type ArchiveYear = (typeof archive)[number];

export function getSite(): Site {
  return site;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getExperience(): Experience[] {
  return experience;
}

export function getArchive(): ArchiveYear[] {
  return archive;
}
