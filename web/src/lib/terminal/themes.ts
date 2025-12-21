import type { ThemeName, TerminalThemeTokens } from "./types";

export const THEMES: Record<ThemeName, TerminalThemeTokens> = {
  Default: {
    name: "Default",
    background: "rgba(15, 20, 25, 0.4)",
    foreground: "#e5e7eb",
    muted: "#9ca3af",
    accent: "#06b6d4",
    prompt: "#10b981",
    error: "#f87171",
    border: "rgba(255, 255, 255, 0.06)",
    barBg: "rgba(55, 65, 81, 0.5)",
    barFill: "linear-gradient(to right, #10b981, #06b6d4)",
  },
  Dracula: {
    name: "Dracula",
    background: "#282a36",
    foreground: "#f8f8f2",
    muted: "#6272a4",
    accent: "#bd93f9",
    prompt: "#50fa7b",
    error: "#ff5555",
    border: "#44475a",
    barBg: "#44475a",
    barFill: "linear-gradient(to right, #50fa7b, #8be9fd)",
  },
  Gruvbox: {
    name: "Gruvbox",
    background: "#282828",
    foreground: "#ebdbb2",
    muted: "#928374",
    accent: "#fe8019",
    prompt: "#b8bb26",
    error: "#fb4934",
    border: "#3c3836",
    barBg: "#3c3836",
    barFill: "linear-gradient(to right, #b8bb26, #83a598)",
  },
  Nord: {
    name: "Nord",
    background: "#2e3440",
    foreground: "#eceff4",
    muted: "#4c566a",
    accent: "#88c0d0",
    prompt: "#a3be8c",
    error: "#bf616a",
    border: "#3b4252",
    barBg: "#3b4252",
    barFill: "linear-gradient(to right, #a3be8c, #88c0d0)",
  },
  "Solarized Dark": {
    name: "Solarized Dark",
    background: "#002b36",
    foreground: "#839496",
    muted: "#586e75",
    accent: "#2aa198",
    prompt: "#859900",
    error: "#dc322f",
    border: "#073642",
    barBg: "#073642",
    barFill: "linear-gradient(to right, #859900, #2aa198)",
  },
  Monokai: {
    name: "Monokai",
    background: "#272822",
    foreground: "#f8f8f2",
    muted: "#75715e",
    accent: "#66d9ef",
    prompt: "#a6e22e",
    error: "#f92672",
    border: "#3e3d32",
    barBg: "#3e3d32",
    barFill: "linear-gradient(to right, #a6e22e, #66d9ef)",
  },
  Cyberpunk: {
    name: "Cyberpunk",
    background: "#0a0e27",
    foreground: "#00ff9f",
    muted: "#7b68ee",
    accent: "#ff1493",
    prompt: "#00ffff",
    error: "#ff0055",
    border: "#1a1e3e",
    barBg: "#1a1e3e",
    barFill: "linear-gradient(to right, #00ffff, #ff1493)",
  },
  "One Dark": {
    name: "One Dark",
    background: "#282c34",
    foreground: "#abb2bf",
    muted: "#5c6370",
    accent: "#61afef",
    prompt: "#98c379",
    error: "#e06c75",
    border: "#3e4451",
    barBg: "#3e4451",
    barFill: "linear-gradient(to right, #98c379, #61afef)",
  },
  Kali: {
    name: "Kali",
    background: "#0d1117",
    foreground: "#ffffff",
    muted: "#6e7681",
    accent: "#367bf0",
    prompt: "#00ff00",
    error: "#ff0000",
    border: "#30363d",
    barBg: "#30363d",
    barFill: "linear-gradient(to right, #00ff00, #367bf0)",
    osAscii: `..............
            ..,;:ccc,.
          ......''';lxO.
.....''''..........,:ld;
           .';;;:::;,,.x,
      ..'''.            0Xxoc:,.  ...
  ....                ,ONkc;,;cokOdc',.
 .                   OMo           ':ddo.
                    dMc               :OO;
                    0M.                 .:o.
                    ;Wd
                     ;XO,
                       ,d0Odlc;,..
                           ..',;:cdOOd::,.
                                    .:d;.':;.
                                       'd,  .'
                                         ;l   ..
                                          .o
                                            c
                                            .'
                                             .`,
    osAsciiColors: [
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
      "#367bf0",
    ],
    osAsciiOpacity: 0.25,
  },
  Arch: {
    name: "Arch",
    background: "#0a0e14",
    foreground: "#b3b1ad",
    muted: "#626a73",
    accent: "#1793d1",
    prompt: "#73d0ff",
    error: "#ff3333",
    border: "#1f2430",
    barBg: "#1f2430",
    barFill: "linear-gradient(to right, #73d0ff, #1793d1)",
    osAscii: `                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`,
    osAsciiColors: [
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#73d0ff",
      "#73d0ff",
      "#73d0ff",
      "#73d0ff",
      "#73d0ff",
      "#73d0ff",
      "#73d0ff",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
      "#1793d1",
    ],
    osAsciiOpacity: 0.3,
  },
  Ubuntu: {
    name: "Ubuntu",
    background: "#300a24",
    foreground: "#ffffff",
    muted: "#aea79f",
    accent: "#e95420",
    prompt: "#77216f",
    error: "#cc0000",
    border: "#5e2750",
    barBg: "#5e2750",
    barFill: "linear-gradient(to right, #77216f, #e95420)",
    osAscii: `            .-/+oossssoo+/-.
        \`:+ssssssssssssssssss+:\`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`,
    osAsciiColors: [
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
      "#e95420",
    ],
    osAsciiOpacity: 0.28,
  },
  Debian: {
    name: "Debian",
    background: "#1a0000",
    foreground: "#d0d0d0",
    muted: "#808080",
    accent: "#d70a53",
    prompt: "#ff5555",
    error: "#ff0000",
    border: "#4a0000",
    barBg: "#4a0000",
    barFill: "linear-gradient(to right, #ff5555, #d70a53)",
    osAscii: `       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""           `,
    osAsciiColors: [
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
      "#d70a53",
    ],
    osAsciiOpacity: 0.3,
  },
  Fedora: {
    name: "Fedora",
    background: "#0b1015",
    foreground: "#e8e8e8",
    muted: "#7c7c7c",
    accent: "#3c6eb4",
    prompt: "#51a2da",
    error: "#cc0000",
    border: "#294172",
    barBg: "#294172",
    barFill: "linear-gradient(to right, #51a2da, #3c6eb4)",
    osAscii: `        ,'''''.
       |   ,.  |
       |  |  '_'
  ,....|  |..
.'  ,_;|   ..'
|  |   |  |
|  ',_,'  |
 '.     ,'
   '''''
                               `,
    osAsciiColors: [
      "#3c6eb4",
      "#3c6eb4",
      "#3c6eb4",
      "#3c6eb4",
      "#51a2da",
      "#51a2da",
      "#51a2da",
      "#3c6eb4",
      "#3c6eb4",
      "#3c6eb4",
    ],
    osAsciiOpacity: 0.3,
  },
};

export function getThemeByName(name: ThemeName): TerminalThemeTokens {
  return THEMES[name];
}

export function normalizeThemeName(input: string): ThemeName | null {
  const normalized = input.toLowerCase().replace(/[-_]/g, " ");
  const match = Object.keys(THEMES).find(
    (t) => t.toLowerCase().replace(/[-_]/g, " ") === normalized
  );
  return match ? (match as ThemeName) : null;
}

export function applyThemeVars(theme: TerminalThemeTokens): React.CSSProperties {
  return {
    "--term-bg": theme.background,
    "--term-fg": theme.foreground,
    "--term-muted": theme.muted,
    "--term-accent": theme.accent,
    "--term-prompt": theme.prompt,
    "--term-error": theme.error,
    "--term-border": theme.border,
    "--term-bar-bg": theme.barBg,
    "--term-bar-fill": theme.barFill,
  } as React.CSSProperties;
}
