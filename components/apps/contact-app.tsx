"use client";

import { Box, Typography, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { colors } from "@/config/colors";
import { siteConfig } from "@/config/site";

export function ContactApp() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ color: colors.primary.main, mb: 3, fontWeight: 700 }}
      >
        Contact
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body1" sx={{ color: colors.text.secondary, mb: 2 }}>
            I&apos;m interested in freelance opportunities. However, if you
            have other request or question, don&apos;t hesitate to contact me.
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 3,
              border: `1px solid ${colors.divider}`,
              borderRadius: "8px",
              backgroundColor: colors.background.paper,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 700, color: colors.text.primary }}
            >
              Get in Touch
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ChatIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    Discord
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.primary }}>
                    {siteConfig.discord}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.primary }}>
                    {siteConfig.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <GitHubIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    GitHub
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.primary }}>
                    @{siteConfig.name.toLowerCase().replace(" ", "")}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LinkedInIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    LinkedIn
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.primary }}>
                    Fadlur Rahman
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
