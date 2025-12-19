import type { Request, Response } from "express";
import { ProjectService } from "../services/project.service.js";

export class ProjectController {
  static async listProjects(_req: Request, res: Response) {
    try {
      const projects = await ProjectService.listProjects();
      return res.json(projects);
    }
    catch {
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  }

  static async getProject(req: Request, res: Response) {
    try {
      const { projectSlug } = req.params;

      if (!projectSlug) {
        return res.status(400).json({ error: "Project slug is required" });
      }

      const project = await ProjectService.getProjectBySlug(projectSlug);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      return res.json(project);
    }
    catch {
      return res.status(500).json({ error: "Failed to fetch project" });
    }
  }
}
