import type { Project, Profile, Skill } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchProject(slug: string): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function fetchProfile(): Promise<Profile | null> {
  const res = await fetch(`${API_BASE_URL}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE_URL}/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}
