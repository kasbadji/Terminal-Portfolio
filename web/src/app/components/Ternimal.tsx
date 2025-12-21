"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations, terminalConfig } from "../styles/terminal-theme";

type Line =
  | { type: "text"; value: string }
  | { type: "error"; value: string }
  | { type: "command"; prompt: string; command: string };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

// Clean ASCII art title matching the Figma design
const ASCII_ART = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`;

// Terminal Header Component
const TerminalHeader = () => (
  <div className={terminalTheme.header.container} style={terminalTheme.header.borderStyle}>
    <div className={terminalTheme.header.dotsContainer}>
      <div className={terminalTheme.header.dots}>
        <div className={`${terminalTheme.header.dot} ${terminalTheme.header.dotRed}`}></div>
        <div className={`${terminalTheme.header.dot} ${terminalTheme.header.dotYellow}`}></div>
        <div className={`${terminalTheme.header.dot} ${terminalTheme.header.dotGreen}`}></div>
      </div>
      <span className={terminalTheme.header.title}>
        {terminalConfig.headerTitle}
      </span>
    </div>
    <div className={terminalTheme.header.themeLabel}>
      Theme: <span className={terminalTheme.header.themeValue}>{terminalConfig.headerTheme}</span>
    </div>
  </div>
);

// Footer Social Icons Component
const FooterSocial = () => (
  <motion.div
    {...terminalAnimations.footer}
    className={terminalTheme.footer.container}
  >
    <a
      href="https://github.com/kasbadji"
      target="_blank"
      rel="noopener noreferrer"
      className={terminalTheme.footer.link}
      aria-label="GitHub"
    >
      <Github className={terminalTheme.footer.icon} />
    </a>
    <a
      href="https://linkedin.com/in/kasbadji-halim-161684335"
      target="_blank"
      rel="noopener noreferrer"
      className={terminalTheme.footer.link}
      aria-label="LinkedIn"
    >
      <Linkedin className={terminalTheme.footer.icon} />
    </a>
    <a
      href="mailto:mohamed.kasbadji@univ-alger.dz"
      className={terminalTheme.footer.link}
      aria-label="Email"
    >
      <Mail className={terminalTheme.footer.icon} />
    </a>
  </motion.div>
);

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const PROMPT = terminalConfig.prompt;
  const [history, setHistory] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [historyIndex, setHistoryIndex] = useState(-1);

  const COMMAND = ["help", "projects", "clear", "about"] as const;
  const [projectSlugs, setProjectSlugs] = useState<string[]>([]);

  const helpText = useMemo(
    () =>
      [
        "Available commands:",
        "  help      - Show this help",
        "  about     - About me",
        "  projects  - List my projects",
        "  project <slug> - Show details about a project",
        "  clear     - Clear the terminal",
      ].join("\n"),
    []
  );

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    async function loadSlugs() {
        try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        if (!res.ok) return;
        const projects: Array<{ projectSlug: string }> = await res.json();
        setProjectSlugs(projects.map((p) => p.projectSlug));
        } catch {
        // ignore, autocomplete will just be limited
        }
    }

    loadSlugs();
  }, []);

  async function runCommand(raw: string) {
    const command = raw.trim();
    const [cmd, ...args] = command.split(/\s+/);

    if (!command) return;

    setLines((prev) => [...prev, { type: "command", prompt: PROMPT, command }]);

    if (cmd === "help") {
      setLines((prev) => [...prev, { type: "text", value: helpText }]);
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "projects") {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        if (!res.ok) throw new Error("Request failed");
        const projects: Array<{ projectName: string; projectSlug: string }> = await res.json();

        if (projects.length === 0) {
          setLines((prev) => [...prev, { type: "text", value: "No projects found." }]);
          return;
        }

        const output = projects
          .map((p) => `- ${p.projectName} (slug: ${p.projectSlug})`)
          .join("\n");

        setLines((prev) => [...prev, { type: "text", value: output }]);
      } catch {
        setLines((prev) => [
          ...prev,
          { type: "error", value: "Failed to load projects. Is the API running?" },
        ]);
      }
      return;
    }

    if (cmd === "about") {
        try {
            const res = await fetch(`${API_BASE_URL}/profile`);

            if (!res.ok) throw new Error("Request failed");

            const profile: null | {
                fullName: string;
                professionalTitle: string;
                shortBio: string;
            } = await res.json();

            if (!profile) {
                setLines((prev) => [...prev, { type: "text", value: "No profile found in database." }]);
                return;
            }

            const output = [
                `${profile.fullName} — ${profile.professionalTitle}`,
                "",
                profile.shortBio,
            ].join("\n");

            setLines((prev) => [...prev, { type: "text", value: output }]);
        } catch {
            setLines((prev) => [...prev, { type: "error", value: "Failed to load profile." }]);
        }
        return;
    }

    if (cmd === "project") {
        const projectSlug = args[0];
        if (!projectSlug) {
            setLines((prev) => [
            ...prev,
            { type: "error", value: "Usage: project <projectSlug>" },
            ]);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/projects/${projectSlug}`);
            if (res.status === 404) {
            setLines((prev) => [...prev, { type: "error", value: "Project not found." }]);
            return;
            }
            if (!res.ok) throw new Error("Request failed");

            const p: {
            projectName: string;
            projectDescription: string;
            technologiesUsed: string[];
            githubRepositoryUrl?: string | null;
            liveDemoUrl?: string | null;
            } = await res.json();

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

            setLines((prev) => [...prev, { type: "text", value: output }]);
        } catch {
            setLines((prev) => [...prev, { type: "error", value: "Failed to load project." }]);
        }
        return;
    }

    setLines((prev) => [
      ...prev,
      { type: "error", value: `Unknown command: ${command}. Type 'help'.` },
    ]);
  }

  return (
    <div className={terminalTheme.container.wrapper} style={terminalTheme.container.wrapperStyle}>
      {/* Terminal Header - Fixed */}
      <TerminalHeader />

      {/* Terminal Body - Scrollable */}
      <div className={terminalTheme.body.scrollContainer} style={terminalTheme.body.scrollStyle}>
        <div className={terminalTheme.body.contentWrapper}>
        {/* ASCII Art Header */}
        <pre style={terminalTheme.ascii.style}>
          {ASCII_ART}
        </pre>

        {/* Welcome Messages */}
        <motion.div
          {...terminalAnimations.welcome}
          className={terminalTheme.welcome.container}
        >
          <div className={terminalTheme.welcome.primaryText}>
            {terminalConfig.welcomeMessage}
          </div>
          <div className={terminalTheme.welcome.secondaryText}>
            Type <span className={terminalTheme.welcome.highlightText}>{terminalConfig.helpHint}</span> {terminalConfig.welcomeHint.replace('Type help', '')}
          </div>
        </motion.div>

        {/* Terminal Output */}
        <div className={terminalTheme.body.outputContainer}>
          {lines.map((l, idx) => (
            <motion.div
              key={idx}
              {...terminalAnimations.line}
              style={terminalTheme.output.lineStyle}
            >
              {l.type === "command" ? (
                <div className={terminalTheme.output.lineWrapper}>
                  <span className={terminalTheme.output.prompt}>{l.prompt}</span>
                  <span className={terminalTheme.output.command}> {l.command}</span>
                </div>
              ) : (
                <pre className={l.type === "error" ? terminalTheme.output.error : terminalTheme.output.text}>{l.value}</pre>
              )}
            </motion.div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Line */}
        <motion.form
          {...terminalAnimations.input}
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = input.trim();

            if (trimmed) {
              setHistory((prev) => [...prev, trimmed]);
              setHistoryIndex(-1);
            }

            runCommand(input);
            setInput("");
          }}
          className={terminalTheme.input.form}
        >
          <span className={terminalTheme.input.prompt}>
            {PROMPT}
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className={terminalTheme.input.field}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();

                  const value = input;
                  const parts = value.trim().split(/\s+/);

                  if (parts.length <= 1) {
                    const partial = value.trim();
                    const matches = COMMAND.filter((c) => c.startsWith(partial));

                    if (matches.length === 1) {
                      setInput(matches[0] + " ");
                    }
                    return;
                  }

                  const [first, second] = parts;

                  if (first === "project") {
                    const partialSlug = second ?? "";
                    const matches = projectSlugs.filter((s) =>
                      s.startsWith(partialSlug)
                    );

                    if (matches.length === 1) {
                      setInput(`project ${matches[0]} `);
                    }
                    return;
                  }
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (history.length === 0) return;

                  setHistoryIndex((prev) => {
                    if (prev === 0) return prev;

                    const next =
                      prev === -1 ? history.length - 1 : Math.max(0, prev - 1);
                    setInput(history[next]);
                    return next;
                  });
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (history.length === 0) return;

                  setHistoryIndex((prev) => {
                    if (prev === -1) return -1;

                    const next = prev + 1;

                    if (next >= history.length) {
                      setInput("");
                      return -1;
                    }

                    setInput(history[next]);
                    return next;
                  });
                }
              }}
            />
          </motion.form>

          {/* Help Text */}
          {lines.length === 0 && (
            <motion.div
              {...terminalAnimations.helpText}
              className={terminalTheme.input.helpText}
            >
              Type <span className={terminalTheme.input.helpHighlight}>{terminalConfig.helpHint}</span> to see available commands. Use Tab for auto-complete.
            </motion.div>
          )}
        </div>
      </div>

      {/* Social Links Footer */}
      <FooterSocial />
    </div>
  );
}
