"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

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
  <div className="h-11 bg-(--color-bg-secondary) px-8 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-(--color-dot-red)"></div>
        <div className="w-3 h-3 rounded-full bg-(--color-dot-yellow)"></div>
        <div className="w-3 h-3 rounded-full bg-(--color-dot-green)"></div>
      </div>
      <span className="text-(--color-text-secondary) text-sm font-medium">
        portfolio@terminal ~ %
      </span>
    </div>
    <div className="text-(--color-text-secondary) text-xs">
      Theme: <span className="text-(--color-terminal-cyan)">Default</span>
    </div>
  </div>
);

// Footer Social Icons Component
const FooterSocial = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="h-16 flex justify-center items-center gap-8 border-t border-(--color-border) bg-(--color-bg-secondary) shrink-0"
  >
    <a
      href="https://github.com/kasbadji"
      target="_blank"
      rel="noopener noreferrer"
      className="text-(--color-text-secondary) hover:text-(--color-terminal-cyan) transition-colors duration-200"
      aria-label="GitHub"
    >
      <Github className="w-5 h-5" />
    </a>
    <a
      href="https://linkedin.com/in/kasbadji-halim-161684335"
      target="_blank"
      rel="noopener noreferrer"
      className="text-(--color-text-secondary) hover:text-(--color-terminal-cyan) transition-colors duration-200"
      aria-label="LinkedIn"
    >
      <Linkedin className="w-5 h-5" />
    </a>
    <a
      href="mailto:mohamed.kasbadji@univ-alger.dz"
      className="text-(--color-text-secondary) hover:text-(--color-terminal-cyan) transition-colors duration-200"
      aria-label="Email"
    >
      <Mail className="w-5 h-5" />
    </a>
  </motion.div>
);

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const PROMPT = "guest@portfolio:~$";
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
        "  projects  - List my projects",
        "  clear     - Clear the terminal",
        "  about     - About me",
        "  project <slug> - Show details about a project",
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'rgba(15, 20, 25, 0.4)' }}>
      {/* Terminal Header - Fixed */}
      <TerminalHeader />

      {/* Terminal Body - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '32px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '110ch' }}>
        {/* ASCII Art Header */}
        <pre
          style={{
            margin: 0,
            padding: 0,
            fontSize: 'clamp(9px, 1.8vw, 15px)',
            lineHeight: '1',
            whiteSpace: 'pre',
            letterSpacing: '0',
            maxWidth: '100%',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono), "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontWeight: '700',
            fontVariantLigatures: 'none',
            fontFeatureSettings: '"liga" 0, "calt" 0',
            fontKerning: 'none',
            transform: 'none',
            textShadow: 'none',
            color: 'var(--color-terminal-cyan)',
            marginBottom: '1.5rem',
            opacity: 1
          }}
        >
          {ASCII_ART}
        </pre>

        {/* Welcome Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 space-y-0.5"
        >
          <div className="text-(--color-text-primary) text-sm">
            Welcome to my interactive terminal portfolio!
          </div>
          <div className="text-(--color-text-secondary) text-sm">
            Type <span className="text-(--color-terminal-green) font-semibold">help</span> to get started.
          </div>
        </motion.div>

        {/* Terminal Output */}
        <div className="space-y-1 mb-3">
          {lines.map((l, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ wordBreak: 'break-word' }}
            >
              {l.type === "command" ? (
                <div className="text-sm font-mono">
                  <span className="text-(--color-terminal-green) font-semibold">{l.prompt}</span>
                  <span className="text-(--color-terminal-green)"> {l.command}</span>
                </div>
              ) : (
                <pre className={`whitespace-pre-wrap font-mono text-sm ${
                  l.type === "error" ? "text-red-400" : "text-(--color-text-primary)"
                }`}>{l.value}</pre>
              )}
            </motion.div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Line */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-(--color-terminal-green) text-sm font-semibold shrink-0">
            {PROMPT}
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-(--color-terminal-green) text-sm caret-(--color-terminal-green) font-mono"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-(--color-text-secondary) text-xs"
            >
              Type <span className="text-(--color-terminal-green)">help</span> to see available commands. Use Tab for auto-complete.
            </motion.div>
          )}
        </div>
      </div>

      {/* Social Links Footer */}
      <FooterSocial />
    </div>
  );
}
