import React, { useState } from "react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations, terminalConfig } from "../../styles/terminal-theme";
import { THEMES } from "../../lib/terminal/themes";

interface InputLineProps {
  onSubmit: (command: string) => void;
  projectSlugs: string[];
  hasOutput: boolean;
}

const COMMANDS = [
  "help",
  "about",
  "whoami",
  "projects",
  "skills",
  "education",
  "clear",
  "themes",
  "theme",
] as const;

const PROMPT = terminalConfig.prompt;

export function InputLine({ onSubmit, projectSlugs, hasOutput }: InputLineProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
    }

    onSubmit(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const value = input;
      const parts = value.trim().split(/\s+/);

      if (parts.length <= 1) {
        const partial = value.trim();
        const matches = COMMANDS.filter((c) => c.startsWith(partial));

        if (matches.length === 1) {
          setInput(matches[0] + " ");
        }
        return;
      }

      const [first, second] = parts;

      if (first === "project") {
        const partialSlug = second ?? "";
        const matches = projectSlugs.filter((s) => s.startsWith(partialSlug));

        if (matches.length === 1) {
          setInput(`project ${matches[0]} `);
        }
        return;
      }

      if (first === "theme") {
        const partialTheme = second ?? "";
        const themeNames = Object.keys(THEMES);
        const matches = themeNames.filter((t) =>
          t.toLowerCase().startsWith(partialTheme.toLowerCase())
        );

        if (matches.length === 1) {
          setInput(`theme ${matches[0]} `);
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
  };

  return (
    <>
      <motion.form
        {...terminalAnimations.input}
        onSubmit={handleSubmit}
        className={terminalTheme.input.form}
      >
        <span
          className={terminalTheme.input.prompt}
          style={{ color: "var(--term-prompt, #10b981)" }}
        >
          {PROMPT}
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          className={terminalTheme.input.field}
          style={{
            color: "var(--term-prompt, #10b981)",
            caretColor: "var(--term-prompt, #10b981)",
          }}
          onKeyDown={handleKeyDown}
        />
      </motion.form>

      {/* Help Text */}
      {!hasOutput && (
        <motion.div
          {...terminalAnimations.helpText}
          className={terminalTheme.input.helpText}
          style={{ color: "var(--term-muted, #9ca3af)" }}
        >
          Type{" "}
          <span
            className={terminalTheme.input.helpHighlight}
            style={{ color: "var(--term-prompt, #10b981)" }}
          >
            {terminalConfig.helpHint}
          </span>{" "}
          to see available commands. Use Tab for auto-complete.
        </motion.div>
      )}
    </>
  );
}
