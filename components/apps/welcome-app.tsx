"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import heroImage from "@/public/images/hero.png";
import { colors } from "@/config/colors";
import { siteConfig } from "@/config/site";
import { useWindowManager } from "@/contexts/window-manager-context";

export function WelcomeApp() {
  const { openWindow } = useWindowManager();

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${colors.primary.main}`,
        }}
      >
        <Image
          src={heroImage}
          alt="Profile"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </Box>

      <Box>
        <Typography variant="h4" sx={{ color: colors.text.primary, fontWeight: 700 }}>
          {siteConfig.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: colors.primary.main, fontWeight: 500, mt: 1 }}
        >
          Front End & Mobile Developer
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{ color: colors.text.secondary, maxWidth: 400 }}
      >
        Dynamic Front End Programmer with over 4 years of experience crafting
        innovative web/mobile applications.
      </Typography>

      <Box
        sx={{
          p: 2,
          border: `1px solid ${colors.divider}`,
          borderRadius: "8px",
          backgroundColor: colors.background.paper,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ width: 12, height: 12, bgcolor: colors.primary.main, borderRadius: "50%" }} />
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          Currently working on{" "}
          <Box component="span" sx={{ color: colors.text.primary, fontWeight: 600 }}>
            {siteConfig.currentProject}
          </Box>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => openWindow("about")}
          sx={{
            borderColor: colors.primary.main,
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: colors.primary.light,
              borderColor: colors.primary.main,
            },
          }}
        >
          About Me
        </Button>
        <Button
          variant="contained"
          onClick={() => openWindow("contact")}
          sx={{
            backgroundColor: colors.primary.main,
            "&:hover": {
              backgroundColor: colors.primary.dark,
            },
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
}
