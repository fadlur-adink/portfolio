"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { useSettings } from "@/contexts/settings-context";
import { colorSchemes } from "@/config/settings";

interface SystemInfoItem {
	label: string;
	value: string;
}

const ASCII_ART = `
   ███████╗██████╗  ██████╗ ███████╗
   ██╔════╝██╔══██╗██╔═══██╗██╔════╝
   █████╗  ██████╔╝██║   ██║███████╗
   ██╔══╝  ██╔══██╗██║   ██║╚════██║
   ██║     ██║  ██║╚██████╔╝███████║
   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

export function AboutPanel() {
	const { currentScheme } = useSettings();
	const theme = useTheme();
	const t = useTranslations("Settings");

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
				{t("about")}
			</Typography>

				<Box
					sx={{
						display: "flex",
						gap: 4,
						flexWrap: "wrap",
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
