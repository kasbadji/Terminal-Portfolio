import type { Request, Response } from "express";
import { createSkills, listSkills } from "../services/skill.service.js";

export async function getSkills(req: Request, res: Response) {
  const skills = await listSkills();
  res.json(skills);
}

export async function postSkills(req: Request, res: Response) {
  const body = req.body;
  const items = Array.isArray(body) ? body : [body];

  // minimal validation
  const cleaned = items
    .filter((x) => x && typeof x.name === "string" && x.name.trim().length > 0)
    .map((x) => ({
      name: String(x.name).trim(),
      category: x.category ? String(x.category) : null,
      level: x.level ? String(x.level) : null,
    }));

  const result = await createSkills(cleaned);
  res.status(201).json({ inserted: result.count });
}
