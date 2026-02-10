"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function SettingsSection({
	title,
	children,
}: { title: string; children: React.ReactNode }) {
	const theme = useTheme();
	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="subtitle2"
				sx={{ color: theme.palette.text.secondary, mb: 2 }}
			>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
