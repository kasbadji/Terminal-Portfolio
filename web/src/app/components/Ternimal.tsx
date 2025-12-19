"use client";

import React, { useMemo, useState, useEffect } from "react";

type Line =
  | { type: "text"; value: string }
  | { type: "error"; value: string };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "text", value: "Welcome to my terminal portfolio." },
    { type: "text", value: "Type 'help' to see available commands." },
  ]);

  const [input, setInput] = useState("");

  const PROMPT = "kasbadji@portfolio:~$ ";
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

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

    setLines((prev) => [...prev, { type: "text", value: `> ${PROMPT} ${command}` }]);

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
    <div style={{ background: "#0b0f0b", color: "#a8ff60", padding: 16, borderRadius: 12 }}>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0, minHeight: 240 }}>
        {lines.map((l, idx) => (
          <div key={idx} style={{ color: l.type === "error" ? "#ff6b6b" : "#a8ff60" }}>
            {l.value}
          </div>
        ))}
      </pre>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = input.trim();

          if(trimmed) {
            setHistory((prev) => [...prev, trimmed]);
            setHistoryIndex(-1);
          }

          runCommand(input);
          setInput("");
        }}
      >
        <span style={{ color: "#a8ff60" }}>{PROMPT} </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#a8ff60",
            width: "70%",
          }}

          onKeyDown={(e) => {
            if(e.key === "Tab"){
                e.preventDefault();

                const value = input;
                const parts = value.trim().split(/\s+/);

                if(parts.length <= 1){
                    const partial = value.trim();
                    const matches = COMMAND.filter(c => c.startsWith(partial));

                    if(matches.length === 1){
                        setInput(matches[0] + " ");
                    }
                    return;
                }

                const [first, second] = parts;

                if(first === "project"){
                    const partialSlug = second ?? "";
                    const matches = projectSlugs.filter(s => s.startsWith(partialSlug));

                    if(matches.length === 1){
                        setInput(`project ${matches[0]} `);
                    }
                    return;
                }
            }

            if(e.key === "ArrowUp"){
                e.preventDefault();
                if(history.length === 0) return;

                setHistoryIndex((prev) => {
                    if(prev === 0) return prev;

                    const next = prev === -1 ? history.length - 1 : Math.max(0, prev - 1);
                    setInput(history[next]);
                    return next;
                });
            }

            if(e.key === "ArrowDown"){
                e.preventDefault();
                if(history.length === 0) return;

                setHistoryIndex((prev) => {
                    if(prev === -1) return -1;

                    const next = prev + 1;

                    if(next >= history.length){
                        setInput("");
                        return -1;
                    }

                    setInput(history[next]);
                    return next;
               });
            }
           }}
        />
      </form>
    </div>
  );
}
