/**
 * Type definitions for the terminal application
 */

export interface Skill {
  name: string;
  category?: string | null;
  level?: string | null;
}

export interface Project {
  projectName: string;
  projectSlug: string;
  projectDescription: string;
  technologiesUsed: string[];
  githubRepositoryUrl?: string | null;
  liveDemoUrl?: string | null;
}

export interface Profile {
  fullName: string;
  professionalTitle: string;
  shortBio: string;
}

export type Line =
  | { type: "text"; value: string }
  | { type: "error"; value: string }
  | { type: "command"; prompt: string; command: string }
  | { type: "skills"; data: Skill[] };

export type ThemeName =
  | "Default"
  | "Dracula"
  | "Gruvbox"
  | "Nord"
  | "Solarized Dark"
  | "Monokai"
  | "Cyberpunk"
  | "One Dark"
  | "Kali"
  | "Arch"
  | "Ubuntu"
  | "Debian"
  | "Fedora";

export interface TerminalThemeTokens {
  name: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  prompt: string;
  error: string;
  border: string;
  barBg: string;
  barFill: string;
  osAscii?: string;
  osAsciiColors?: string[];
  osAsciiOpacity?: number;
}
