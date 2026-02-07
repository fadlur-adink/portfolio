import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        mt: 8,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mr: 1, fontFamily: "monospace" }}
              >
                Fadlur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {siteConfig.email}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.primary">
              Front End Developer and Mobile Developer
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Media
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="github"
                href={siteConfig.links.github}
                target="_blank"
                sx={{ color: "text.secondary" }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                aria-label="linkedin"
                href={siteConfig.links.linkedin}
                target="_blank"
                sx={{ color: "text.secondary" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          © Copyright {new Date().getFullYear()}. Made by {siteConfig.name}
        </Typography>
      </Container>
    </Box>
  );
}
