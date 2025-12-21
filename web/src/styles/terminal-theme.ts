/**
 * Terminal Theme Configuration
 * This file contains all styling and theme-related constants for the Terminal component
 */

// CSS Class Names
export const terminalTheme = {
  // Container
  container: {
    wrapper: "h-screen flex flex-col overflow-hidden",
    wrapperStyle: { background: 'var(--term-bg, rgba(15, 20, 25, 0.4))', color: 'var(--term-fg, #e5e7eb)' }
  },

  // Header
  header: {
    container: "h-11 px-8 flex items-center justify-between shrink-0",
    borderStyle: {
      borderBottom: '1px solid var(--term-border, rgba(255, 255, 255, 0.06))',
      background: 'var(--term-bg, rgba(15, 20, 25, 0.4))'
    },
    dotsContainer: "flex items-center gap-3",
    dots: "flex gap-2",
    dot: "w-3 h-3 rounded-full",
    dotRed: "bg-red-500",
    dotYellow: "bg-yellow-500",
    dotGreen: "bg-green-500",
    title: "text-sm font-medium",
    themeLabel: "text-xs",
    themeValue: ""
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
      color: 'var(--term-accent, #06b6d4)',
      marginBottom: '1.5rem',
      opacity: 1
    }
  },

  // Welcome Section
  welcome: {
    container: "mb-6 space-y-0.5",
    primaryText: "text-sm",
    secondaryText: "text-sm",
    highlightText: "font-semibold"
  },

  // Terminal Lines/Output
  output: {
    lineWrapper: "text-sm font-mono",
    lineStyle: { wordBreak: 'break-word' as const, color: 'var(--term-fg, #e5e7eb)' },
    prompt: "font-semibold",
    command: "",
    text: "whitespace-pre-wrap font-mono text-sm",
    error: "whitespace-pre-wrap font-mono text-sm"
  },

  // Input Form
  input: {
    form: "flex items-center gap-2 mb-4",
    prompt: "text-sm font-semibold shrink-0",
    field: "flex-1 bg-transparent border-none outline-none text-sm font-mono",
    helpText: "text-xs",
    helpHighlight: ""
  },

  // Footer
  footer: {
    container: "h-16 flex justify-center items-center gap-8 shrink-0",
    link: "transition-colors duration-200",
    icon: "w-5 h-5"
  },

  // Skills Output
  skills: {
    container: "my-4 space-y-6",
    categoryContainer: "space-y-3",
    categoryHeader: "flex items-center gap-2 mb-3",
    categoryIcon: "w-4 h-4",
    categoryTitle: "text-sm font-semibold uppercase tracking-wide",
    skillsContainer: "space-y-2 ml-6",
    skillRow: "flex items-center gap-3",
    skillIcon: "w-4 h-4 shrink-0",
    skillName: "text-sm min-w-30",
    skillLevelContainer: "flex items-center gap-3 flex-1",
    skillBadge: "px-2 py-0.5 text-xs font-medium rounded-full",
    progressBarContainer: "flex-1 max-w-50 h-2 rounded-full overflow-hidden",
    progressBar: "h-full rounded-full",
    noLevel: "text-xs"
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
  },

  // Skills animations
  skillCategory: (catIdx: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: catIdx * 0.1, duration: 0.4 }
  }),

  skillRow: (catIdx: number, skillIdx: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: catIdx * 0.1 + skillIdx * 0.05,
      duration: 0.3
    }
  }),

  skillProgressBar: (catIdx: number, skillIdx: number, levelNum: number) => ({
    initial: { width: 0 },
    animate: { width: `${levelNum}%` },
    transition: {
      delay: catIdx * 0.1 + skillIdx * 0.05 + 0.2,
      duration: 0.8,
      ease: "easeOut" as const
    }
  })
} as const;

// Terminal Configuration
export const terminalConfig = {
  prompt: "kasbadji@terminal:~$",
  headerTitle: "kasbadji@terminal ~ %",
  headerTheme: "Default",
  welcomeMessage: "Welcome to my interactive terminal portfolio!",
  helpHint: "help",
  welcomeHint: "Type help to get started.",
  tabHint: "Type help to see available commands. Use Tab for auto-complete."
} as const;
