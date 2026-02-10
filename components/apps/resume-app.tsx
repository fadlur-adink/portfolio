"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";

export function ResumeApp() {
	const theme = useTheme();
	const pdfUrl = "/Fadlur_Rahman_Front_End_Developer_CV.pdf";

	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: theme.palette.background.default,
			}}
		>
			<Box
				sx={{
					p: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottom: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<DescriptionIcon color="primary" />
					<Typography variant="subtitle1" fontWeight="bold">
						Resume
					</Typography>
				</Box>
				<Button
					variant="contained"
					startIcon={<DownloadIcon />}
					href={pdfUrl}
					download
					size="small"
				>
					Download
				</Button>
			</Box>

			<Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
				<object
					data={pdfUrl}
					type="application/pdf"
					width="100%"
					height="100%"
					style={{ border: "none" }}
				>
					<Box
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: 2,
							p: 3,
							textAlign: "center",
						}}
					>
						<Typography variant="body1" color="text.secondary">
							Unable to display PDF directly.
						</Typography>
						<Button variant="outlined" href={pdfUrl} download>
							Download PDF instead
						</Button>
					</Box>
				</object>
			</Box>
		</Box>
	);
}
