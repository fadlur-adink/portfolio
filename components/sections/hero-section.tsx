import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import heroImage from "@/public/images/hero.png";
import { siteConfig } from "@/config/site";
import { colors } from "@/config/colors";

export default function HeroSection() {
  return (
    <Box id="home" sx={{ pt: { xs: 8, md: 16 }, pb: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2" sx={{ mb: 4, lineHeight: 1.2 }}>
              {siteConfig.name} is a{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Front End Developer
              </Box>{" "}
              and{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Mobile Developer
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "480px" }}
            >
              Dynamic Front End Programmer with over 4 years of experience
              crafting innovative web/mobile applications.
            </Typography>
            <Button variant="outlined" size="large" href="#contacts">
              Contact me !!
            </Button>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 80,
                height: 80,
                backgroundImage: `radial-gradient(${colors.primary.main} 2px, transparent 2px)`,
                backgroundSize: "15px 15px",
                opacity: 0.5,
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 500,
                aspectRatio: "1/1",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Image
                src={heroImage}
                alt="Hero Image"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 50,
                width: 60,
                height: 60,
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "50%",
                zIndex: 2,
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              p: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ width: 16, height: 16, bgcolor: "primary.main" }} />
            <Typography variant="body1" color="text.secondary">
              Currently working on{" "}
              <Box component="strong" sx={{ color: "text.primary" }}>
                {siteConfig.currentProject}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
