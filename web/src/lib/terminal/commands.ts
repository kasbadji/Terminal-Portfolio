import type { Line, ThemeName } from "./types";
import { fetchProjects, fetchProject, fetchProfile, fetchSkills } from "./api";
import { getHelpText } from "./help";
import { THEMES, normalizeThemeName } from "./themes";

export type CommandHandler = (
  args: string[],
  addLine: (line: Line) => void,
  clearLines: () => void,
  setTheme: (theme: ThemeName) => void
) => Promise<void>;

const PROMPT = "kasbadji@terminal:~$";

export async function runCommand(
  raw: string,
  addLine: (line: Line) => void,
  clearLines: () => void,
  setTheme: (theme: ThemeName) => void
): Promise<void> {
  const command = raw.trim();
  const [cmd, ...args] = command.split(/\s+/);

  if (!command) return;

  addLine({ type: "command", prompt: PROMPT, command });

  if (cmd === "help") {
    addLine({ type: "text", value: getHelpText() });
    return;
  }

  if (cmd === "clear") {
    clearLines();
    return;
  }

  if (cmd === "projects") {
    try {
      const projects = await fetchProjects();

      if (projects.length === 0) {
        addLine({ type: "text", value: "No projects found." });
        return;
      }

      const output = projects
        .map((p) => `- ${p.projectName} (slug: ${p.projectSlug})`)
        .join("\n");

      addLine({ type: "text", value: output });
    } catch {
      addLine({
        type: "error",
        value: "Failed to load projects. Is the API running?",
      });
    }
    return;
  }

  if (cmd === "about") {
    try {
      const profile = await fetchProfile();

      if (!profile) {
        addLine({ type: "text", value: "No profile found in database." });
        return;
      }

      const output = [
        `${profile.fullName} — ${profile.professionalTitle}`,
        "",
        profile.shortBio,
      ].join("\n");

      addLine({ type: "text", value: output });
    } catch {
      addLine({ type: "error", value: "Failed to load profile." });
    }
    return;
  }

  if (cmd === "skills") {
    try {
      const skills = await fetchSkills();

      if (skills.length === 0) {
        addLine({ type: "text", value: "No skills found." });
        return;
      }

      addLine({ type: "skills", data: skills });
    } catch {
      addLine({
        type: "error",
        value: "Failed to load skills. Is the API running?",
      });
    }
    return;
  }

  if (cmd === "project") {
    const projectSlug = args[0];
    if (!projectSlug) {
      addLine({
        type: "error",
        value: "Usage: project <projectSlug>",
      });
      return;
    }

    try {
      const p = await fetchProject(projectSlug);

      const output = [
        `Name: ${p.projectName}`,
        `Tech: ${p.technologiesUsed.join(", ")}`,
        "",
        p.projectDescription,
        "",
        p.githubRepositoryUrl ? `GitHub: ${p.githubRepositoryUrl}` : "",
        p.liveDemoUrl ? `Live: ${p.liveDemoUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      addLine({ type: "text", value: output });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("404")) {
        addLine({ type: "error", value: "Project not found." });
      } else {
        addLine({ type: "error", value: "Failed to load project." });
      }
    }
    return;
  }

  if (cmd === "whoami") {
    addLine({
      type: "text",
      value: "Kasbadji Mohamed Halim",
    });
    return;
  }

  if (cmd === "education") {
    addLine({
      type: "text",
      value:
        "Computer Science — Alger 1 Benyoucef Benkhedda University (Licence 3)",
    });
    return;
  }

  if (cmd === "themes") {
    const themeList = Object.keys(THEMES)
      .map((themeName) => `  - ${themeName}`)
      .join("\n");
    addLine({
      type: "text",
      value: "Available themes:\n" + themeList,
    });
    return;
  }

  if (cmd === "theme") {
    const themeName = args.join(" ");

    if (!themeName) {
      addLine({
        type: "error",
        value:
          "Usage: theme <name>\nType 'themes' to see available themes.",
      });
      return;
    }

    const matchedTheme = normalizeThemeName(themeName);

    if (!matchedTheme) {
      addLine({
        type: "error",
        value: `Theme '${themeName}' not found. Type 'themes' to see available themes.`,
      });
      return;
    }

    setTheme(matchedTheme);
    addLine({
      type: "text",
      value: `Theme changed to: ${matchedTheme}`,
    });
    return;
  }

  addLine({
    type: "error",
    value: `Unknown command: ${command}. Type 'help'.`,
  });
}
