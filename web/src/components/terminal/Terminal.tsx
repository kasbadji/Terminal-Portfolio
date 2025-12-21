"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations, terminalConfig } from "../../styles/terminal-theme";
import { TerminalHeader } from "./TerminalHeader";
import { FooterSocial } from "./FooterSocial";
import { OutputRenderer } from "./OutputRenderer";
import { InputLine } from "./InputLine";
import { OSAsciiBadge } from "./OSAsciiBadge";
import { runCommand } from "../../lib/terminal/commands";
import { getThemeByName, THEMES } from "../../lib/terminal/themes";
import { fetchProjects } from "../../lib/terminal/api";
import type { Line, ThemeName } from "../../lib/terminal/types";

const ASCII_ART = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`;

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeName>("Default");
  const [projectSlugs, setProjectSlugs] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasLoadedTheme = useRef(false);

  // Load theme from localStorage after hydration (only once)
  useEffect(() => {
    if (!hasLoadedTheme.current) {
      hasLoadedTheme.current = true;
      // Use setTimeout to avoid cascading render warning
      setTimeout(() => {
        const saved = localStorage.getItem("terminal-theme");
        if (saved && saved in THEMES) {
          setActiveTheme(saved as ThemeName);
        }
      }, 0);
    }
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    if (!terminalRef.current) return;

    const themeTokens = getThemeByName(activeTheme);
    const root = terminalRef.current;

    root.style.setProperty("--term-bg", themeTokens.background);
    root.style.setProperty("--term-fg", themeTokens.foreground);
    root.style.setProperty("--term-muted", themeTokens.muted);
    root.style.setProperty("--term-accent", themeTokens.accent);
    root.style.setProperty("--term-prompt", themeTokens.prompt);
    root.style.setProperty("--term-error", themeTokens.error);
    root.style.setProperty("--term-border", themeTokens.border);
    root.style.setProperty("--term-bar-bg", themeTokens.barBg);
    root.style.setProperty("--term-bar-fill", themeTokens.barFill);
  }, [activeTheme]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("terminal-theme", activeTheme);
  }, [activeTheme]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Load project slugs for autocomplete
  useEffect(() => {
    async function loadSlugs() {
      try {
        const projects = await fetchProjects();
        setProjectSlugs(projects.map((p) => p.projectSlug));
      } catch {
        // ignore, autocomplete will just be limited
      }
    }

    loadSlugs();
  }, []);

  const addLine = (line: Line) => {
    setLines((prev) => [...prev, line]);
  };

  const clearLines = () => {
    setLines([]);
  };

  const handleCommand = async (command: string) => {
    await runCommand(command, addLine, clearLines, setActiveTheme);
  };

  const themeTokens = getThemeByName(activeTheme);

  return (
    <div
      ref={terminalRef}
      className={terminalTheme.container.wrapper}
      style={{
        background: "var(--term-bg, rgba(15, 20, 25, 0.4))",
        color: "var(--term-fg, #e5e7eb)",
        position: "relative",
      }}
    >
      {/* OS ASCII Badge - Big neofetch-style logo on the right */}
      <OSAsciiBadge themeTokens={themeTokens} themeName={activeTheme} />

      {/* Terminal Header - Fixed */}
      <TerminalHeader theme={activeTheme} />

      {/* Terminal Body - Scrollable */}
      <div
        className={terminalTheme.body.scrollContainer}
        style={terminalTheme.body.scrollStyle}
      >
        <div className={terminalTheme.body.contentWrapper}>
          {/* ASCII Art Header */}
          <pre style={terminalTheme.ascii.style}>{ASCII_ART}</pre>

          {/* Welcome Messages */}
          <motion.div
            {...terminalAnimations.welcome}
            className={terminalTheme.welcome.container}
          >
            <div
              className={terminalTheme.welcome.primaryText}
              style={{ color: "var(--term-fg, #e5e7eb)" }}
            >
              {terminalConfig.welcomeMessage}
            </div>
            <div
              className={terminalTheme.welcome.secondaryText}
              style={{ color: "var(--term-muted, #9ca3af)" }}
            >
              Type{" "}
              <span
                className={terminalTheme.welcome.highlightText}
                style={{ color: "var(--term-prompt, #10b981)" }}
              >
                {terminalConfig.helpHint}
              </span>{" "}
              {terminalConfig.welcomeHint.replace("Type help", "")}
            </div>
          </motion.div>

          {/* Terminal Output */}
          <OutputRenderer lines={lines} terminalEndRef={terminalEndRef} />

          {/* Input Line */}
          <InputLine
            onSubmit={handleCommand}
            projectSlugs={projectSlugs}
            hasOutput={lines.length > 0}
          />
        </div>
      </div>

      {/* Social Links Footer */}
      <FooterSocial />
    </div>
  );
}
