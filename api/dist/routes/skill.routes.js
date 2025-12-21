import { Router } from "express";
import { getSkills, postSkills } from "../controllers/skill.controller.js";
const router = Router();
router.get("/", getSkills);
router.post("/", postSkills);
export default router;
//# sourceMappingURL=skill.routes.js.map