import React from "react";
import { terminalTheme, terminalConfig } from "../../styles/terminal-theme";
import type { ThemeName } from "../../lib/terminal/types";

interface TerminalHeaderProps {
  theme: ThemeName;
}

export function TerminalHeader({ theme }: TerminalHeaderProps) {
  return (
    <div
      className={terminalTheme.header.container}
      style={terminalTheme.header.borderStyle}
    >
      <div className={terminalTheme.header.dotsContainer}>
        <div className={terminalTheme.header.dots}>
          <div
            className={`${terminalTheme.header.dot} ${terminalTheme.header.dotRed}`}
          ></div>
          <div
            className={`${terminalTheme.header.dot} ${terminalTheme.header.dotYellow}`}
          ></div>
          <div
            className={`${terminalTheme.header.dot} ${terminalTheme.header.dotGreen}`}
          ></div>
        </div>
        <span
          className={terminalTheme.header.title}
          style={{ color: "var(--term-muted, #9ca3af)" }}
        >
          {terminalConfig.headerTitle}
        </span>
      </div>
      <div
        className={terminalTheme.header.themeLabel}
        style={{ color: "var(--term-muted, #9ca3af)" }}
      >
        Theme:{" "}
        <span
          className={terminalTheme.header.themeValue}
          style={{ color: "var(--term-accent, #06b6d4)" }}
        >
          {theme}
        </span>
      </div>
    </div>
  );
}
