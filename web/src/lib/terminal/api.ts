import type { Project, Profile, Skill } from "./types";

/**
 * Get the API base URL with proper environment handling
 * In production/preview: uses NEXT_PUBLIC_API_BASE_URL (set in Vercel)
 * In development: falls back to http://localhost:4000
 */
export function getApiBaseUrl(): string {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  }

  // Server-side: still use the same env var
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}

export const API_BASE_URL = getApiBaseUrl();

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/projects`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!res.ok) {
      console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchProject(slug: string): Promise<Project> {
  const res = await fetch(`${getApiBaseUrl()}/projects/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch project: ${res.status}`);
  }
  return res.json();
}

export async function fetchProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/profile`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    if (!res.ok) {
      console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/skills`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error(`Failed to fetch skills: ${res.status} ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}
