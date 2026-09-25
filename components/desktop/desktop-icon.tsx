"use client";

import { alpha, Box, ButtonBase, Typography, useTheme } from "@mui/material";

interface DesktopIconProps {
	icon: React.ReactNode;
	label: string;
	index?: number;
	onClick: () => void;
}

export function DesktopIcon({ icon, label, index = 0, onClick }: DesktopIconProps) {
	const theme = useTheme();
	const retro = theme.palette.retro;
	const accent = retro.accents[index % retro.accents.length];
	return (
		<ButtonBase
			onClick={onClick}
			aria-label={label}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: { xs: 76, sm: 88 },
				height: { xs: 76, sm: 86 },
				cursor: "pointer",
				border: "1px solid transparent",
				borderRadius: "2px",
				transition: "transform 120ms steps(2)",
				"&:hover": {
					backgroundColor: alpha(retro.desktopText, 0.12),
					borderColor: alpha(retro.desktopText, 0.5),
					"& .desktop-app-icon": { transform: "translateY(-3px)" },
				},
				"&:active": {
					transform: "translateY(2px)",
				},
			}}
		>
			<Box
				className="desktop-app-icon"
				sx={{
					width: 48,
					height: 48,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "3px",
					backgroundColor: accent,
					border: `2px solid ${retro.ink}`,
					boxShadow: `3px 3px 0 ${retro.ink}, ${retro.bevel}`,
					transition: "transform 120ms steps(2)",
					mb: 1,
					"& svg": {
						fontSize: 28,
						color: theme.palette.getContrastText(accent),
					},
				}}
			>
				{icon}
			</Box>
			<Typography
				variant="caption"
				sx={{
					color: retro.desktopText,
					textAlign: "center",
					fontSize: "0.65rem",
					fontWeight: 700,
					backgroundColor: retro.desktop,
					px: 0.5,
					maxWidth: 76,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</Typography>
		</ButtonBase>
	);
}
