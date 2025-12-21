export function getHelpText(): string {
  return [
    "Available commands:",
    "  help      - Show this help",
    "  about     - About me",
    "  whoami    - Who am I",
    "  projects  - List my projects",
    "  project <slug> - Show details about a project",
    "  education - Show my education",
    "  skills    - List my skills",
    "  themes    - List available themes",
    "  theme <name> - Set a theme",
    "  clear     - Clear the terminal",
  ].join("\n");
}
