import { Box, Typography } from "@mui/material";

export function SettingsSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="subtitle2"
				sx={{ color: "text.secondary", mb: 2 }}
			>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
