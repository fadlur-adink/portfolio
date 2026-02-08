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
		primary: {
			main: "#a855f7",
			light: "rgba(168, 85, 247, 0.1)",
			dark: "#9333ea",
		},
		background: { default: "#1e1f24", paper: "#24262d" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "blue",
		name: "Blue",
		primary: {
			main: "#3b82f6",
			light: "rgba(59, 130, 246, 0.1)",
			dark: "#2563eb",
		},
		background: { default: "#1a1b2e", paper: "#1f2137" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "green",
		name: "Green",
		primary: {
			main: "#22c55e",
			light: "rgba(34, 197, 94, 0.1)",
			dark: "#16a34a",
		},
		background: { default: "#1a1f1a", paper: "#1f261f" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "orange",
		name: "Orange",
		primary: {
			main: "#f97316",
			light: "rgba(249, 115, 22, 0.1)",
			dark: "#ea580c",
		},
		background: { default: "#1f1a17", paper: "#26201c" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "red",
		name: "Red",
		primary: {
			main: "#ef4444",
			light: "rgba(239, 68, 68, 0.1)",
			dark: "#dc2626",
		},
		background: { default: "#1f1a1a", paper: "#261f1f" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "cyan",
		name: "Cyan",
		primary: {
			main: "#06b6d4",
			light: "rgba(6, 182, 212, 0.1)",
			dark: "#0891b2",
		},
		background: { default: "#1a1f21", paper: "#1f262a" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "pink",
		name: "Pink",
		primary: {
			main: "#ec4899",
			light: "rgba(236, 72, 153, 0.1)",
			dark: "#db2777",
		},
		background: { default: "#1f1a1d", paper: "#261f23" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "amber",
		name: "Amber",
		primary: {
			main: "#f59e0b",
			light: "rgba(245, 158, 11, 0.1)",
			dark: "#d97706",
		},
		background: { default: "#1f1c17", paper: "#26231c" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "slate",
		name: "Slate",
		primary: {
			main: "#64748b",
			light: "rgba(100, 116, 139, 0.1)",
			dark: "#475569",
		},
		background: { default: "#0f172a", paper: "#111827" },
		text: { primary: "#f8fafc", secondary: "#94a3b8" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "teal",
		name: "Teal",
		primary: {
			main: "#14b8a6",
			light: "rgba(20, 184, 166, 0.1)",
			dark: "#0d9488",
		},
		background: { default: "#0f1f1d", paper: "#132826" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "indigo",
		name: "Indigo",
		primary: {
			main: "#6366f1",
			light: "rgba(99, 102, 241, 0.1)",
			dark: "#4f46e5",
		},
		background: { default: "#15162c", paper: "#1b1d3a" },
		text: { primary: "#ffffff", secondary: "#a1a1aa" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "rose-dark",
		name: "Rose Dark",
		primary: {
			main: "#f43f5e",
			light: "rgba(244, 63, 94, 0.1)",
			dark: "#e11d48",
		},
		background: { default: "#1b0f14", paper: "#241017" },
		text: { primary: "#ffffff", secondary: "#9ca3af" },
		divider: "rgba(255,255,255,0.08)",
	},
	{
		id: "light-blue",
		name: "Light Blue",
		primary: {
			main: "#2563eb",
			light: "rgba(37, 99, 235, 0.12)",
			dark: "#1d4ed8",
		},
		background: { default: "#f8fafc", paper: "#ffffff" },
		text: { primary: "#0f172a", secondary: "#475569" },
		divider: "rgba(15,23,42,0.08)",
	},
	{
		id: "light-green",
		name: "Light Green",
		primary: {
			main: "#16a34a",
			light: "rgba(22, 163, 74, 0.12)",
			dark: "#15803d",
		},
		background: { default: "#f7fdf9", paper: "#ffffff" },
		text: { primary: "#052e16", secondary: "#4b5563" },
		divider: "rgba(5,46,22,0.08)",
	},
	{
		id: "light-amber",
		name: "Light Amber",
		primary: {
			main: "#d97706",
			light: "rgba(217, 119, 6, 0.15)",
			dark: "#b45309",
		},
		background: { default: "#fffbeb", paper: "#ffffff" },
		text: { primary: "#422006", secondary: "#6b7280" },
		divider: "rgba(66,32,6,0.1)",
	},
	{
		id: "light-pink",
		name: "Light Pink",
		primary: {
			main: "#db2777",
			light: "rgba(219, 39, 119, 0.12)",
			dark: "#be185d",
		},
		background: { default: "#fff5f9", paper: "#ffffff" },
		text: { primary: "#500724", secondary: "#6b7280" },
		divider: "rgba(80,7,36,0.1)",
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
