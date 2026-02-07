import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/section-header";
import aboutImage from "@/public/images/about.png";
import { colors } from "@/config/colors";

export default function AboutSection() {
  return (
    <Box id="about-me" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 6,
            justifyContent: "space-between",
          }}
        >
          <SectionHeader title="about-me" />
        </Box>

        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              Hello, I&apos;m Fadlur Rahman!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              I&apos;m a Dynamic Front End Programmer with over 4 years of
              experience crafting innovative web/mobile applications that
              enhance user engagement and operational efficiency.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              My expertise lies in leveraging advanced frameworks such as React,
              Next.js, and React Native to develop responsive applications and
              robust front-end architectures. I am proficient in collaborating
              with cross-functional teams to deliver scalable and
              high-performance systems.
            </Typography>
            <Link
              href="/about-me"
              style={{
                display: "inline-block",
                marginTop: "16px",
                padding: "8px 16px",
                border: `1px solid ${colors.primary.main}`,
                color: "inherit",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Read more -&gt;
            </Link>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 350,
                aspectRatio: "3/4",
                bgcolor: "background.paper",
                borderTop: "1px solid",
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={aboutImage}
                alt="About Image"
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 50,
                  left: -10,
                  width: 50,
                  height: 50,
                  backgroundImage: `radial-gradient(${colors.primary.main} 2px, transparent 2px)`,
                  backgroundSize: "10px 10px",
                  opacity: 0.5,
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
