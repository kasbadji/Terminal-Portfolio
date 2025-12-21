import type { Skill } from "./types";

export function parseLevel(level: string | null | undefined): number | null {
  if (!level) return null;
  const match = level.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export function groupSkillsByCategory(
  skills: Skill[]
): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category?.trim() || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});
}

export function sortCategories(groups: Record<string, Skill[]>): string[] {
  const categories = Object.keys(groups).sort((a, b) => a.localeCompare(b));
  categories.forEach((cat) => {
    groups[cat].sort((a, b) => a.name.localeCompare(b.name));
  });
  return categories;
}
