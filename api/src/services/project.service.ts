import { prisma } from "../lib/prisma.js";

export class ProjectService {
  static async listProjects() {
    return prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getProjectBySlug(projectSlug: string) {
    return prisma.project.findUnique({
      where: { projectSlug },
    });
  }
}
