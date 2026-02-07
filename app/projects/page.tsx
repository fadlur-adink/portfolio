import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ProjectCard, SectionHeader } from "@/components/ui";
import { completeApps, smallProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
          <SectionHeader title="projects" showLine={false} />
          <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
            List of my projects
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
          <Box component="span" sx={{ color: "primary.main" }}>
            #
          </Box>
          complete-apps
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {completeApps.map((project, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mb: 4 }}>
          <Box component="span" sx={{ color: "primary.main" }}>
            #
          </Box>
          small-projects
        </Typography>

        <Grid container spacing={4}>
          {smallProjects.map((project, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
