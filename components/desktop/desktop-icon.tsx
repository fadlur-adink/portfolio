import { alpha, Box, Typography } from "@mui/material";

interface DesktopIconProps {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
	return (
		<Box
			onClick={onClick}
			onDoubleClick={onClick}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: 80,
				height: 90,
				cursor: "pointer",
				borderRadius: "8px",
				transition: "background-color 0.2s ease",
				"&:hover": {
					backgroundColor: (theme) =>
						alpha(theme.palette.primary.main, 0.08),
				},
				"&:active": {
					backgroundColor: "primaryLight",
				},
			}}
		>
			<Box
				sx={{
					width: 48,
					height: 48,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "12px",
					backgroundColor: "background.paper",
					border: (theme) => `1px solid ${theme.palette.divider}`,
					mb: 1,
					"& svg": {
						fontSize: 28,
						color: "primary.main",
					},
				}}
			>
				{icon}
			</Box>
			<Typography
				variant="caption"
				sx={{
					color: "text.primary",
					textAlign: "center",
					fontSize: "0.75rem",
					fontWeight: 500,
					textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
					maxWidth: 76,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</Typography>
		</Box>
	);
}
