/**
 * Terminal Theme Configuration
 * This file contains all styling and theme-related constants for the Terminal component
 */

// CSS Class Names
export const terminalTheme = {
  // Container
  container: {
    wrapper: "h-screen flex flex-col overflow-hidden",
    wrapperStyle: { background: 'rgba(15, 20, 25, 0.4)' }
  },

  // Header
  header: {
    container: "h-11 bg-(--color-bg-secondary) px-8 flex items-center justify-between shrink-0",
    borderStyle: { borderBottom: '1px solid rgba(255, 255, 255, 0.06)' },
    dotsContainer: "flex items-center gap-3",
    dots: "flex gap-2",
    dot: "w-3 h-3 rounded-full",
    dotRed: "bg-(--color-dot-red)",
    dotYellow: "bg-(--color-dot-yellow)",
    dotGreen: "bg-(--color-dot-green)",
    title: "text-(--color-text-secondary) text-sm font-medium",
    themeLabel: "text-(--color-text-secondary) text-xs",
    themeValue: "text-(--color-terminal-cyan)"
  },

  // Body/Content Area
  body: {
    scrollContainer: "flex-1 overflow-y-auto overflow-x-hidden",
    scrollStyle: {
      paddingLeft: '32px',
      paddingRight: '32px',
      paddingTop: '32px',
      paddingBottom: '80px'
    },
    contentWrapper: "max-w-[110ch]",
    outputContainer: "space-y-2 mb-5"
  },

  // ASCII Art
  ascii: {
    style: {
      margin: 0,
      padding: 0,
      fontSize: 'clamp(9px, 1.8vw, 15px)',
      lineHeight: '1',
      whiteSpace: 'pre' as const,
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
    }
  },

  // Welcome Section
  welcome: {
    container: "mb-6 space-y-0.5",
    primaryText: "text-(--color-text-primary) text-sm",
    secondaryText: "text-(--color-text-secondary) text-sm",
    highlightText: "text-(--color-terminal-green) font-semibold"
  },

  // Terminal Lines/Output
  output: {
    lineWrapper: "text-sm font-mono",
    lineStyle: { wordBreak: 'break-word' as const },
    prompt: "text-(--color-terminal-green) font-semibold",
    command: "text-(--color-terminal-green)",
    text: "whitespace-pre-wrap font-mono text-sm text-(--color-text-primary)",
    error: "whitespace-pre-wrap font-mono text-sm text-red-400"
  },

  // Input Form
  input: {
    form: "flex items-center gap-2 mb-4",
    prompt: "text-(--color-terminal-green) text-sm font-semibold shrink-0",
    field: "flex-1 bg-transparent border-none outline-none text-(--color-terminal-green) text-sm caret-(--color-terminal-green) font-mono",
    helpText: "text-(--color-text-secondary) text-xs",
    helpHighlight: "text-(--color-terminal-green)"
  },

  // Footer
  footer: {
    container: "h-16 flex justify-center items-center gap-8 border-t border-(--color-border) bg-(--color-bg-secondary) shrink-0",
    link: "text-(--color-text-secondary) hover:text-(--color-terminal-cyan) transition-colors duration-200",
    icon: "w-5 h-5"
  }
} as const;

// Animation Variants
export const terminalAnimations = {
  welcome: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.3, duration: 0.5 }
  },
  input: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.5, duration: 0.5 }
  },
  helpText: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.7 }
  },
  footer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.8, duration: 0.5 }
  },
  line: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.2 }
  }
} as const;

// Terminal Configuration
export const terminalConfig = {
  prompt: "guest@portfolio:~$",
  headerTitle: "portfolio@terminal ~ %",
  headerTheme: "Default",
  welcomeMessage: "Welcome to my interactive terminal portfolio!",
  helpHint: "help",
  welcomeHint: "Type help to get started.",
  tabHint: "Type help to see available commands. Use Tab for auto-complete."
} as const;
