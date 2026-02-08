"use client";

import { createTheme, type Theme } from "@mui/material/styles";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ColorScheme } from "./settings";

declare module "@mui/material/styles" {
	interface Palette {
		primaryLight: string;
		primaryDark: string;
	}
	interface PaletteOptions {
		primaryLight?: string;
		primaryDark?: string;
	}
}

const inter = Inter({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

export function createAppTheme(scheme: ColorScheme): Theme {
	return createTheme({
		palette: {
			mode: "dark",
			background: {
				default: scheme.background.default,
				paper: scheme.background.paper,
			},
			primary: {
				main: scheme.primary.main,
				light: scheme.primary.light,
				dark: scheme.primary.dark,
			},
			text: {
				primary: scheme.text.primary,
				secondary: scheme.text.secondary,
			},
			divider: scheme.divider,
			primaryLight: scheme.primary.light,
			primaryDark: scheme.primary.dark,
		},
		typography: {
			fontFamily: inter.style.fontFamily,
			h1: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			h2: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			h3: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			h4: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			h5: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			h6: {
				fontFamily: jetbrainsMono.style.fontFamily,
				fontWeight: 700,
			},
			button: {
				fontFamily: jetbrainsMono.style.fontFamily,
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						scrollbarColor: `${scheme.primary.main} ${scheme.background.default}`,
						"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
							backgroundColor: scheme.background.default,
							width: "8px",
						},
						"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
							borderRadius: 8,
							backgroundColor: scheme.primary.main,
							minHeight: 24,
						},
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: "4px",
						textTransform: "none",
						fontSize: "1rem",
					},
					outlined: {
						borderColor: scheme.primary.main,
						color: scheme.text.primary,
						"&:hover": {
							borderColor: scheme.primary.main,
							backgroundColor: scheme.primary.light,
							boxShadow: `0 0 8px ${scheme.primary.light}`,
						},
					},
					contained: {
						borderRadius: "4px",
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						backgroundColor: scheme.background.paper,
						border: `1px solid ${scheme.divider}`,
						borderRadius: 0,
						boxShadow: "none",
						backgroundImage: "none",
					},
				},
			},
			MuiLink: {
				styleOverrides: {
					root: {
						textDecoration: "none",
						"&:hover": {
							color: scheme.primary.main,
						},
					},
				},
			},
		},
	});
}

const defaultScheme: ColorScheme = {
	id: "purple",
	name: "Purple",
	primary: { main: "#a855f7", light: "rgba(168, 85, 247, 0.1)", dark: "#9333ea" },
	background: { default: "#1e1f24", paper: "#24262d" },
	text: { primary: "#ffffff", secondary: "#9ca3af" },
	divider: "rgba(255,255,255,0.08)",
};

const theme = createAppTheme(defaultScheme);
export default theme;
