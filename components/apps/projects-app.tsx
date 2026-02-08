import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { Box, Grid, Typography } from "@mui/material";

export function ProjectsApp() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h5"
				sx={{ color: "primary.main", mb: 3, fontWeight: 700 }}
			>
				Projects
			</Typography>
			<Grid container spacing={3}>
				{projects.map((project, index) => (
					<Grid key={index} size={{ xs: 12, sm: 6 }}>
						<ProjectCard {...project} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
