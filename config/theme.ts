"use client";

import { alpha, createTheme, getLuminance, lighten, type Theme } from "@mui/material/styles";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ColorScheme, Settings } from "./settings";
import { colorSchemes, defaultSettings, fontFamilies, fontSizes } from "./settings";

interface RetroPalette {
	desktop: string;
	desktopText: string;
	grid: string;
	surface: string;
	ink: string;
	shadow: string;
	bevel: string;
	accents: string[];
}

declare module "@mui/material/styles" {
	interface Palette {
		primaryLight: string;
		primaryDark: string;
		retro: RetroPalette;
	}
	interface PaletteOptions {
		primaryLight?: string;
		primaryDark?: string;
		retro?: RetroPalette;
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

function getFontFamily(fontFamilySetting: Settings["fontFamily"]): string {
	if (fontFamilySetting === "system" || fontFamilySetting === "sans") {
		return inter.style.fontFamily;
	}
	if (fontFamilySetting === "mono") return jetbrainsMono.style.fontFamily;
	return fontFamilies[fontFamilySetting];
}

function getHeadingFontFamily(fontFamilySetting: Settings["fontFamily"]): string {
	return getFontFamily(fontFamilySetting);
}

export function createAppTheme(scheme: ColorScheme, settings?: Settings): Theme {
	const fontFamily = getFontFamily(settings?.fontFamily ?? defaultSettings.fontFamily);
	const headingFontFamily = getHeadingFontFamily(settings?.fontFamily ?? defaultSettings.fontFamily);
	const fontSize = fontSizes[settings?.fontSize ?? "medium"];
	const baseFontSize = fontSize.base;
	const isLight = getLuminance(scheme.background.paper) > 0.5;
	const ink = isLight ? scheme.text.primary : "#0b0815";
	const desktop = scheme.desktop ?? scheme.background.default;
	const desktopText = getLuminance(desktop) > 0.5 ? scheme.text.primary : "#fff5ff";
	const bevel = `inset 2px 2px 0 ${alpha("#ffffff", isLight ? 0.8 : 0.18)}, inset -2px -2px 0 ${alpha(ink, 0.22)}`;

	return createTheme({
		shape: { borderRadius: 2 },
		palette: {
			mode: isLight ? "light" : "dark",
			retro: {
				desktop,
				desktopText,
				grid: alpha(desktopText, scheme.desktop ? 0.26 : 0.1),
				surface: scheme.background.default,
				ink,
				shadow: `5px 5px 0 ${ink}`,
				bevel,
				accents: scheme.accents ?? [scheme.primary.main, lighten(scheme.primary.main, 0.25), scheme.primary.dark, lighten(scheme.primary.main, 0.5)],
			},
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
			fontFamily: fontFamily,
			fontSize: baseFontSize,
			htmlFontSize: baseFontSize,
			h1: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			h2: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			h3: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			h4: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			h5: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			h6: {
				fontFamily: headingFontFamily,
				fontWeight: 700,
			},
			button: {
				fontFamily: headingFontFamily,
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					html: { fontSize: baseFontSize },
					":root": {
						"--retro-ink": ink,
						"--retro-surface": scheme.background.default,
						"--retro-accent": scheme.primary.main,
					},
					"*:focus-visible": {
						outline: `2px dashed ${scheme.primary.main}`,
						outlineOffset: 3,
					},
					"::selection": { background: scheme.primary.main, color: "#ffffff" },
					body: {
						scrollbarColor: `${scheme.primary.main} ${scheme.background.default}`,
						"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
							backgroundColor: scheme.background.default,
							width: "12px",
							height: "12px",
						},
						"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
							borderRadius: 1,
							border: `2px solid ${ink}`,
							backgroundColor: scheme.primary.main,
							minHeight: 24,
						},
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 2,
						textTransform: "none",
						fontWeight: 700,
						border: `2px solid ${ink}`,
						boxShadow: `3px 3px 0 ${ink}, ${bevel}`,
						transition: "transform 120ms steps(2), box-shadow 120ms steps(2)",
						"&:hover": { transform: "translate(-1px, -1px)", boxShadow: `4px 4px 0 ${ink}, ${bevel}` },
						"&:active": { transform: "translate(2px, 2px)", boxShadow: `1px 1px 0 ${ink}` },
					},
					outlined: {
						borderColor: ink,
						color: scheme.text.primary,
						backgroundColor: scheme.background.default,
						"&:hover": { borderColor: ink, backgroundColor: scheme.primary.light },
					},
					contained: { borderColor: ink },
					text: { borderColor: "transparent", boxShadow: "none" },
				},
			},
			MuiButtonBase: { defaultProps: { disableRipple: true } },
			MuiIconButton: {
				styleOverrides: { root: { borderRadius: 2 } },
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: { borderRadius: 2, backgroundColor: scheme.background.paper, boxShadow: `inset 2px 2px 0 ${alpha(ink, 0.15)}` },
					notchedOutline: { borderWidth: 2, borderColor: scheme.divider },
				},
			},
			MuiMenu: {
				styleOverrides: { paper: { border: `2px solid ${ink}`, boxShadow: `4px 4px 0 ${ink}`, backgroundImage: "none" } },
			},
			MuiChip: {
				styleOverrides: { root: { borderRadius: 2, border: `1px solid ${scheme.divider}`, fontFamily, fontWeight: 500 } },
			},
			MuiLinearProgress: {
				styleOverrides: { root: { height: 12, border: `1px solid ${ink}`, borderRadius: 0 }, bar: { backgroundImage: `repeating-linear-gradient(90deg, transparent 0 6px, ${alpha(ink, 0.25)} 6px 8px)` } },
			},
			MuiCard: {
				styleOverrides: {
					root: {
						backgroundColor: scheme.background.paper,
						border: `2px solid ${ink}`,
						borderRadius: 2,
						boxShadow: `4px 4px 0 ${ink}`,
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

const theme = createAppTheme(colorSchemes[0], defaultSettings);
export default theme;
