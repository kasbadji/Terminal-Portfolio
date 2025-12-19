import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller.js";

export const profileRoutes = Router();

profileRoutes.get("/", ProfileController.getProfile);
