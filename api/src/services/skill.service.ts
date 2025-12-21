import { prisma } from "../lib/prisma.js";

export async function listSkills() {
  return prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export async function createSkills(
  skills: { name: string; category?: string | null; level?: string | null }[]
) {
  return prisma.skill.createMany({
    data: skills.map((s) => ({
      name: s.name,
      category: s.category ?? null,
      level: s.level ?? null,
    })),
  });
}
