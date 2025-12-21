import { Router } from "express";
import { profileRoutes } from "./profile.routes.js";
import { projectRoutes } from "./project.routes.js";
import skillRoutes from "./skill.routes.js";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, message: "API is running" });
});

router.use("/profile", profileRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);

