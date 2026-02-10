"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ColorScheme } from "@/config/settings";

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
		<Box
			onClick={onSelect}
			sx={{
				cursor: "pointer",
				borderRadius: 2,
				p: 1.5,
				border: isSelected
					? `2px solid ${scheme.primary.main}`
					: `2px solid ${theme.palette.divider}`,
				backgroundColor: isSelected
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
					background: `linear-gradient(135deg, ${scheme.primary.main} 0%, ${scheme.background.default} 100%)`,
				}}
			/>
			<Typography
				variant="caption"
				sx={{
					color: theme.palette.text.primary,
					display: "block",
					textAlign: "center",
					fontWeight: isSelected ? 600 : 400,
				}}
			>
				{scheme.name}
			</Typography>
		</Box>
	);
}
