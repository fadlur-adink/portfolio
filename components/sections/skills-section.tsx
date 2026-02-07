import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SectionHeader from "@/components/ui/section-header";
import { skills } from "@/data/skills";

export default function SkillsSection() {
  return (
    <Box id="skills" sx={{ mt: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="skills" showLine={false} />
        </Box>
        <Grid container spacing={2}>
          {skills.map((skillGroup) => (
            <Grid
              key={skillGroup.category}
              size={{ xs: 12, md: "auto" }}
              sx={{ flexGrow: 1 }}
            >
              <Box
                sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", fontWeight: 700 }}
                  >
                    {skillGroup.category}
                  </Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {skillGroup.items.join(" ")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
