"use client";

import { useState } from "react";
import {
	Box,
	Typography,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
	type SelectChangeEvent,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import InfoIcon from "@mui/icons-material/Info";
import { useSettings } from "@/contexts/settings-context";
import { colorSchemes, fontFamilies, fontSizes } from "@/config/settings";
import { useTheme } from "@mui/material/styles";

type SettingsTab = "appearance" | "about";

function AppearancePanel() {
	const { settings, updateSettings, resetSettings } = useSettings();
	const theme = useTheme();

	const handleColorSchemeChange = (schemeId: string) => {
		updateSettings({ colorScheme: schemeId });
	};

	const handleLanguageChange = (e: SelectChangeEvent) => {
		updateSettings({ language: e.target.value as "en" | "id" });
	};

	const handleFontSizeChange = (e: SelectChangeEvent) => {
		updateSettings({
			fontSize: e.target.value as "small" | "medium" | "large",
		});
	};

	const handleFontFamilyChange = (e: SelectChangeEvent) => {
		updateSettings({
			fontFamily: e.target.value as keyof typeof fontFamilies,
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: 600 }}
			>
				Appearance
			</Typography>

			<Box sx={{ mb: 4 }}>
				<Typography
					variant="subtitle2"
					sx={{ color: theme.palette.text.secondary, mb: 2 }}
				>
					Color Scheme
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gap: 1.5,
					}}
				>
					{colorSchemes.map((scheme) => (
						<Box
							key={scheme.id}
							onClick={() => handleColorSchemeChange(scheme.id)}
							sx={{
								cursor: "pointer",
								borderRadius: 2,
								p: 1.5,
								border:
									settings.colorScheme === scheme.id
										? `2px solid ${scheme.primary.main}`
										: `2px solid ${theme.palette.divider}`,
								backgroundColor:
									settings.colorScheme === scheme.id
										? scheme.primary.light
										: "transparent",
								transition: "all 0.2s ease",
								"&:hover": {
									borderColor: scheme.primary.main,
								},
							}}
						>
							<Box
								sx={{
									width: "100%",
									height: 32,
									borderRadius: 1,
									background: `linear-gradient(135deg, ${scheme.primary.main} 0%, ${scheme.primary.dark} 100%)`,
									mb: 1,
								}}
							/>
							<Typography
								variant="caption"
								sx={{
									color: theme.palette.text.primary,
									display: "block",
									textAlign: "center",
									fontWeight: settings.colorScheme === scheme.id ? 600 : 400,
								}}
							>
								{scheme.name}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>

			<Box sx={{ mb: 3 }}>
				<FormControl fullWidth size="small">
					<InputLabel sx={{ color: theme.palette.text.secondary }}>
						Language
					</InputLabel>
					<Select
						value={settings.language}
						label="Language"
						onChange={handleLanguageChange}
						sx={{
							color: theme.palette.text.primary,
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.divider,
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.primary.main,
							},
						}}
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="id">Indonesian</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<Box sx={{ mb: 3 }}>
				<FormControl fullWidth size="small">
					<InputLabel sx={{ color: theme.palette.text.secondary }}>
						Font Size
					</InputLabel>
					<Select
						value={settings.fontSize}
						label="Font Size"
						onChange={handleFontSizeChange}
						sx={{
							color: theme.palette.text.primary,
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.divider,
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.primary.main,
							},
						}}
					>
						{Object.entries(fontSizes).map(([key, value]) => (
							<MenuItem key={key} value={key}>
								{key.charAt(0).toUpperCase() + key.slice(1)} ({value.base}px)
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			<Box sx={{ mb: 4 }}>
				<FormControl fullWidth size="small">
					<InputLabel sx={{ color: theme.palette.text.secondary }}>
						Font Family
					</InputLabel>
					<Select
						value={settings.fontFamily}
						label="Font Family"
						onChange={handleFontFamilyChange}
						sx={{
							color: theme.palette.text.primary,
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.divider,
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.primary.main,
							},
						}}
					>
						<MenuItem value="system">System Default</MenuItem>
						<MenuItem value="mono">Monospace</MenuItem>
						<MenuItem value="serif">Serif</MenuItem>
						<MenuItem value="sans">Sans-serif</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<Button
				variant="outlined"
				onClick={resetSettings}
				sx={{
					color: theme.palette.text.secondary,
					borderColor: theme.palette.divider,
					"&:hover": {
						borderColor: theme.palette.primary.main,
						backgroundColor: theme.palette.primaryLight,
					},
				}}
			>
				Reset to Defaults
			</Button>
		</Box>
	);
}

const ASCII_ART = `
   ███████╗██████╗  ██████╗ ███████╗
   ██╔════╝██╔══██╗██╔═══██╗██╔════╝
   █████╗  ██████╔╝██║   ██║███████╗
   ██╔══╝  ██╔══██╗██║   ██║╚════██║
   ██║     ██║  ██║╚██████╔╝███████║
   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

interface SystemInfoItem {
	label: string;
	value: string;
}

function AboutPanel() {
	const { currentScheme } = useSettings();
	const theme = useTheme();

	const systemInfo: SystemInfoItem[] = [
		{ label: "OS", value: "FadlurOS 1.0.0" },
		{ label: "Host", value: "Next.js 16.1.6" },
		{ label: "Kernel", value: "React 19.0.0" },
		{ label: "Uptime", value: "4+ years coding" },
		{ label: "Packages", value: "MUI, react-rnd, TypeScript" },
		{ label: "Shell", value: "zsh 5.9" },
		{ label: "Resolution", value: "Responsive" },
		{ label: "DE", value: "Desktop Environment" },
		{ label: "WM", value: "Window Manager (react-rnd)" },
		{ label: "Theme", value: currentScheme.name },
		{ label: "Terminal", value: "iTerm2" },
		{ label: "CPU", value: "Brain @ 100% Coffee" },
		{ label: "Memory", value: "Unlimited Stack Overflow" },
	];

	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: 600 }}
			>
				About
			</Typography>

			<Box
				sx={{
					display: "flex",
					gap: 4,
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<Box
					component="pre"
					sx={{
						color: theme.palette.primary.main,
						fontFamily: "monospace",
						fontSize: "0.6rem",
						lineHeight: 1.2,
						margin: 0,
						flexShrink: 0,
					}}
				>
					{ASCII_ART}
				</Box>

				<Box sx={{ flex: 1 }}>
					{systemInfo.map((item) => (
						<Box
							key={item.label}
							sx={{
								display: "flex",
								mb: 0.5,
								fontFamily: "monospace",
								fontSize: "0.85rem",
							}}
						>
							<Typography
								component="span"
								sx={{
									color: theme.palette.primary.main,
									fontWeight: 600,
									minWidth: 100,
									fontFamily: "inherit",
									fontSize: "inherit",
								}}
							>
								{item.label}:
							</Typography>
							<Typography
								component="span"
								sx={{
									color: theme.palette.text.secondary,
									fontFamily: "inherit",
									fontSize: "inherit",
								}}
							>
								{item.value}
							</Typography>
						</Box>
					))}

					<Box sx={{ display: "flex", gap: 0.5, mt: 2 }}>
						{colorSchemes.slice(0, 8).map((scheme) => (
							<Box
								key={scheme.id}
								sx={{
									width: 20,
									height: 20,
									borderRadius: "4px",
									backgroundColor: scheme.primary.main,
								}}
							/>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export function SettingsApp() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex", height: "100%", minHeight: 400 }}>
			<Box
				sx={{
					width: 200,
					borderRight: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.default,
				}}
			>
				<List sx={{ py: 1 }}>
					<ListItemButton
						selected={activeTab === "appearance"}
						onClick={() => setActiveTab("appearance")}
						sx={{
							mx: 1,
							borderRadius: 1,
							"&.Mui-selected": {
								backgroundColor: theme.palette.primaryLight,
								"&:hover": {
									backgroundColor: theme.palette.primaryLight,
								},
							},
							"&:hover": {
								backgroundColor: theme.palette.primaryLight,
							},
						}}
					>
						<ListItemIcon sx={{ minWidth: 36 }}>
							<PaletteIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
						</ListItemIcon>
						<ListItemText
							primary="Appearance"
							primaryTypographyProps={{
								fontSize: "0.875rem",
								color: theme.palette.text.primary,
							}}
						/>
					</ListItemButton>

					<ListItemButton
						selected={activeTab === "about"}
						onClick={() => setActiveTab("about")}
						sx={{
							mx: 1,
							borderRadius: 1,
							"&.Mui-selected": {
								backgroundColor: theme.palette.primaryLight,
								"&:hover": {
									backgroundColor: theme.palette.primaryLight,
								},
							},
							"&:hover": {
								backgroundColor: theme.palette.primaryLight,
							},
						}}
					>
						<ListItemIcon sx={{ minWidth: 36 }}>
							<InfoIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
						</ListItemIcon>
						<ListItemText
							primary="About"
							primaryTypographyProps={{
								fontSize: "0.875rem",
								color: theme.palette.text.primary,
							}}
						/>
					</ListItemButton>
				</List>
			</Box>

			<Box
				sx={{
					flex: 1,
					overflow: "auto",
					backgroundColor: theme.palette.background.paper,
				}}
			>
				{activeTab === "appearance" && <AppearancePanel />}
				{activeTab === "about" && <AboutPanel />}
			</Box>
		</Box>
	);
}
