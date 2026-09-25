"use client";

import type { ColorScheme } from "@/config/settings";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";

export function ColorSchemeCard({
	scheme,
	isSelected,
	onSelect,
}: {
	scheme: ColorScheme;
	isSelected: boolean;
	onSelect: () => void;
}) {
	const theme = useTheme();
	return (
		<ButtonBase
			onClick={onSelect}
			aria-pressed={isSelected}
			aria-label={scheme.name}
			sx={{
				cursor: "pointer",
				borderRadius: "2px",
				display: "block",
				p: 1,
				boxShadow: isSelected ? `3px 3px 0 ${theme.palette.retro.ink}` : "none",
				border: (theme) =>
					isSelected
						? `2px solid ${scheme.primary.main}`
						: `2px solid ${theme.palette.divider}`,
				backgroundColor: isSelected
					? scheme.primary.light
					: "transparent",
				transition: "transform 120ms steps(2), box-shadow 120ms steps(2)",
				"&:hover": {
					borderColor: scheme.primary.main,
					transform: "translateY(-2px)",
				},
			}}
		>
			<Box
				sx={{
					width: "100%",
					height: 52,
					position: "relative",
					border: `1px solid ${theme.palette.retro.ink}`,
					mb: 0.75,
					backgroundColor: scheme.desktop ?? scheme.background.default,
					backgroundImage: `linear-gradient(${scheme.primary.main}40 1px, transparent 1px), linear-gradient(90deg, ${scheme.primary.main}40 1px, transparent 1px)`,
					backgroundSize: "10px 10px",
				}}
			>
				<Box aria-hidden="true" sx={{ position: "absolute", inset: "9px 16px 8px 12px", border: `1px solid ${theme.palette.retro.ink}`, backgroundColor: scheme.background.paper, boxShadow: `2px 2px 0 ${theme.palette.retro.ink}` }}>
					<Box sx={{ height: 8, backgroundColor: scheme.accents?.[0] ?? scheme.primary.main, borderBottom: `1px solid ${theme.palette.retro.ink}` }} />
					<Box sx={{ m: 0.75, width: "55%", height: 3, backgroundColor: scheme.text.secondary, opacity: 0.5 }} />
				</Box>
			</Box>
			<Typography
				variant="caption"
				sx={{
					color: "text.primary",
					display: "block",
					textAlign: "center",
					fontWeight: isSelected ? 600 : 400,
				}}
			>
				{scheme.name}
			</Typography>
		</ButtonBase>
	);
}
