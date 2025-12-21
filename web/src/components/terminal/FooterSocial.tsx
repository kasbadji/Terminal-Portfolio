import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations } from "../../styles/terminal-theme";

export function FooterSocial() {
  return (
    <motion.div
      {...terminalAnimations.footer}
      className={terminalTheme.footer.container}
      style={{
        borderTop: "1px solid var(--term-border, rgba(255, 255, 255, 0.06))",
        background: "var(--term-bg, rgba(15, 20, 25, 0.4))",
      }}
    >
      <a
        href="https://github.com/kasbadji"
        target="_blank"
        rel="noopener noreferrer"
        className={terminalTheme.footer.link}
        style={{ color: "var(--term-muted, #9ca3af)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--term-accent, #06b6d4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--term-muted, #9ca3af)")
        }
        aria-label="GitHub"
      >
        <Github className={terminalTheme.footer.icon} />
      </a>
      <a
        href="https://linkedin.com/in/kasbadji-halim-161684335"
        target="_blank"
        rel="noopener noreferrer"
        className={terminalTheme.footer.link}
        style={{ color: "var(--term-muted, #9ca3af)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--term-accent, #06b6d4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--term-muted, #9ca3af)")
        }
        aria-label="LinkedIn"
      >
        <Linkedin className={terminalTheme.footer.icon} />
      </a>
      <a
        href="mailto:mohamed.kasbadji@univ-alger.dz"
        className={terminalTheme.footer.link}
        style={{ color: "var(--term-muted, #9ca3af)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--term-accent, #06b6d4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--term-muted, #9ca3af)")
        }
        aria-label="Email"
      >
        <Mail className={terminalTheme.footer.icon} />
      </a>
    </motion.div>
  );
}
