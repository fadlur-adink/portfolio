import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import SectionHeader from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";

export default function ContactsSection() {
  return (
    <Box id="contacts" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
          <SectionHeader title="contacts" />
        </Box>

        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              I&apos;m interested in freelance opportunities. However, if you
              have other request or question, don&apos;t hesitate to contact me
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Box sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Message me here
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
              >
                <ChatIcon fontSize="small" color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  {siteConfig.discord}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  {siteConfig.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
