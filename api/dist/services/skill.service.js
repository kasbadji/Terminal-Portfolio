import { prisma } from "../lib/prisma.js";
export async function listSkills() {
    return prisma.skill.findMany({
        orderBy: [{ category: "asc" }, { name: "asc" }],
    });
}
export async function createSkills(skills) {
    return prisma.skill.createMany({
        data: skills.map((s) => ({
            name: s.name,
            category: s.category ?? null,
            level: s.level ?? null,
        })),
    });
}
//# sourceMappingURL=skill.service.js.map