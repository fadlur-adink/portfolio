import { skills } from "@/data/skills";
import { Box, Grid, Typography } from "@mui/material";

export function SkillsApp() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h5"
				sx={{ color: "primary.main", mb: 3, fontWeight: 700 }}
			>
				Skills
			</Typography>
			<Grid container spacing={2}>
				{skills.map((skillGroup) => (
					<Grid key={skillGroup.category} size={{ xs: 12, sm: 6 }}>
						<Box
							sx={{
								border: (theme) =>
									`1px solid ${theme.palette.divider}`,
								height: "100%",
								borderRadius: "4px",
								overflow: "hidden",
							}}
						>
							<Box
								sx={{
									p: 1.5,
									borderBottom: (theme) =>
										`1px solid ${theme.palette.divider}`,
									backgroundColor: "background.paper",
								}}
							>
								<Typography
									variant="subtitle2"
									sx={{
										fontWeight: 700,
										color: "text.primary",
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
