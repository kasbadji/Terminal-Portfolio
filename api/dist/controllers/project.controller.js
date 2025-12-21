import { ProjectService } from "../services/project.service.js";
export class ProjectController {
    static async listProjects(_req, res) {
        try {
            const projects = await ProjectService.listProjects();
            return res.json(projects);
        }
        catch {
            return res.status(500).json({ error: "Failed to fetch projects" });
        }
    }
    static async getProject(req, res) {
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
//# sourceMappingURL=project.controller.js.map