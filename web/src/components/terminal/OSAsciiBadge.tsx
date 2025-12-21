import React from "react";
import { motion } from "framer-motion";
import type { TerminalThemeTokens } from "../../lib/terminal/types";

interface OSAsciiBadgeProps {
  themeTokens: TerminalThemeTokens;
  themeName: string;
}

export function OSAsciiBadge({ themeTokens, themeName }: OSAsciiBadgeProps) {
  if (!themeTokens.osAscii) return null;

  const lines = themeTokens.osAscii.split("\n");
  const colors = themeTokens.osAsciiColors;
  const opacity = themeTokens.osAsciiOpacity ?? 0.3;

  return (
    <motion.div
      key={themeName}
      initial={{ opacity: 0, scale: 0.95, x: 30 }}
      animate={{ opacity: opacity, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-18 right-6 pointer-events-none select-none z-0 hidden md:block"
    >
      <pre
        className="font-mono leading-tight"
        style={{
          fontSize: "clamp(12px, 1.4vw, 18px)",
          lineHeight: 1.05,
          fontFamily:
            'var(--font-mono), "JetBrains Mono", ui-monospace, monospace',
          fontWeight: "600",
          textShadow: `0 0 20px ${colors?.[0] || themeTokens.accent}50`,
          whiteSpace: "pre",
          letterSpacing: "-0.02em",
        }}
      >
        {colors ? (
          lines.map((line, i) => (
            <span
              key={i}
              style={{
                display: "block",
                color: colors[i] || themeTokens.accent,
              }}
            >
              {line}
            </span>
          ))
        ) : (
          <span style={{ color: themeTokens.accent }}>{themeTokens.osAscii}</span>
        )}
      </pre>
    </motion.div>
  );
}
