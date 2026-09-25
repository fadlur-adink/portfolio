"use client";

import { skills } from "@/data/skills";
import { useTranslations } from "next-intl";
import { Box, Grid, Typography, useTheme } from "@mui/material";

export function SkillsApp() {
	const theme = useTheme();
	const t = useTranslations("Skills");
	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h5"
				sx={{ color: "primary.main", mb: 3, fontWeight: 700 }}
			>
				{t("title")}
			</Typography>
			<Grid container spacing={2}>
				{skills.map((skillGroup, index) => (
					<Grid key={skillGroup.category} size={{ xs: 12, sm: 6 }}>
						<Box
							sx={{
								border: `2px solid ${theme.palette.retro.ink}`,
								boxShadow: theme.palette.retro.shadow,
								height: "100%",
								borderRadius: "4px",
								overflow: "hidden",
							}}
						>
							<Box
								sx={{
									p: 1.5,
									borderBottom: `2px solid ${theme.palette.retro.ink}`,
									backgroundColor: theme.palette.retro.accents[index % theme.palette.retro.accents.length],
									boxShadow: theme.palette.retro.bevel,
								}}
							>
								<Typography
									variant="subtitle2"
									sx={{
										fontWeight: 700,
										color: theme.palette.getContrastText(theme.palette.retro.accents[index % theme.palette.retro.accents.length]),
									}}
								>
									{skillGroup.category}
								</Typography>
							</Box>
							<Box sx={{ p: 1.5 }}>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary" }}
								>
									{skillGroup.items.join(" • ")}
								</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
