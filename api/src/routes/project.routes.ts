import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";

export const projectRoutes = Router();

projectRoutes.get("/", ProjectController.listProjects);
projectRoutes.get("/:projectSlug", ProjectController.getProject);
