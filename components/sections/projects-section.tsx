import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import ProjectCard from "@/components/ui/project-card";
import SectionHeader from "@/components/ui/section-header";
import { featuredProjects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Box id="works" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <SectionHeader title="projects" showLine lineWidth="30%" />
          </Box>
          <Link
            href="/projects"
            style={{
              flexShrink: 0,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            View all ~~&gt;
          </Link>
        </Box>

        <Grid container spacing={4}>
          {featuredProjects.map((project, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
