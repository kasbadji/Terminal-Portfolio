import React from "react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations } from "../../styles/terminal-theme";
import { SkillsOutput } from "./SkillsOutput";
import type { Line } from "../../lib/terminal/types";

interface OutputRendererProps {
  lines: Line[];
  terminalEndRef: React.RefObject<HTMLDivElement | null>;
}

export function OutputRenderer({ lines, terminalEndRef }: OutputRendererProps) {
  return (
    <div className={terminalTheme.body.outputContainer}>
      {lines.map((l, idx) => (
        <motion.div
          key={idx}
          {...terminalAnimations.line}
          style={terminalTheme.output.lineStyle}
        >
          {l.type === "command" ? (
            <div className={terminalTheme.output.lineWrapper}>
              <span
                className={terminalTheme.output.prompt}
                style={{ color: "var(--term-prompt, #10b981)" }}
              >
                {l.prompt}
              </span>
              <span
                className={terminalTheme.output.command}
                style={{ color: "var(--term-prompt, #10b981)" }}
              >
                {" "}
                {l.command}
              </span>
            </div>
          ) : l.type === "skills" ? (
            <SkillsOutput skills={l.data} />
          ) : (
            <pre
              className={
                l.type === "error"
                  ? terminalTheme.output.error
                  : terminalTheme.output.text
              }
              style={{
                color:
                  l.type === "error"
                    ? "var(--term-error, #f87171)"
                    : "var(--term-fg, #e5e7eb)",
              }}
            >
              {l.value}
            </pre>
          )}
        </motion.div>
      ))}
      <div ref={terminalEndRef} />
    </div>
  );
}
