export interface ColorScheme {
  id: string;
  name: string;
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  divider: string;
}

export interface Settings {
  colorScheme: string;
  language: "en" | "id";
  fontSize: "small" | "medium" | "large";
  fontFamily: "system" | "mono" | "serif" | "sans";
}

export const defaultSettings: Settings = {
  colorScheme: "purple",
  language: "en",
  fontSize: "medium",
  fontFamily: "system",
};

export const colorSchemes: ColorScheme[] = [
  {
    id: "purple",
    name: "Purple",
    primary: { main: "#a855f7", light: "rgba(168, 85, 247, 0.1)", dark: "#9333ea" },
    background: { default: "#1e1f24", paper: "#24262d" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "blue",
    name: "Blue",
    primary: { main: "#3b82f6", light: "rgba(59, 130, 246, 0.1)", dark: "#2563eb" },
    background: { default: "#1a1b2e", paper: "#1f2137" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "green",
    name: "Green",
    primary: { main: "#22c55e", light: "rgba(34, 197, 94, 0.1)", dark: "#16a34a" },
    background: { default: "#1a1f1a", paper: "#1f261f" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "orange",
    name: "Orange",
    primary: { main: "#f97316", light: "rgba(249, 115, 22, 0.1)", dark: "#ea580c" },
    background: { default: "#1f1a17", paper: "#26201c" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "red",
    name: "Red",
    primary: { main: "#ef4444", light: "rgba(239, 68, 68, 0.1)", dark: "#dc2626" },
    background: { default: "#1f1a1a", paper: "#261f1f" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "cyan",
    name: "Cyan",
    primary: { main: "#06b6d4", light: "rgba(6, 182, 212, 0.1)", dark: "#0891b2" },
    background: { default: "#1a1f21", paper: "#1f262a" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "pink",
    name: "Pink",
    primary: { main: "#ec4899", light: "rgba(236, 72, 153, 0.1)", dark: "#db2777" },
    background: { default: "#1f1a1d", paper: "#261f23" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
  {
    id: "amber",
    name: "Amber",
    primary: { main: "#f59e0b", light: "rgba(245, 158, 11, 0.1)", dark: "#d97706" },
    background: { default: "#1f1c17", paper: "#26231c" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    divider: "rgba(255,255,255,0.08)",
  },
];

export const fontFamilies = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
  serif: 'Georgia, "Times New Roman", Times, serif',
  sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
};

export const fontSizes = {
  small: { base: 14, scale: 0.875 },
  medium: { base: 16, scale: 1 },
  large: { base: 18, scale: 1.125 },
};
