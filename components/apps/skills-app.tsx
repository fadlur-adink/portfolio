"use client";

import { Box, Typography, Grid } from "@mui/material";
import { colors } from "@/config/colors";
import { skills } from "@/data/skills";

export function SkillsApp() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ color: colors.primary.main, mb: 3, fontWeight: 700 }}
      >
        Skills
      </Typography>
      <Grid container spacing={2}>
        {skills.map((skillGroup) => (
          <Grid key={skillGroup.category} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                border: `1px solid ${colors.divider}`,
                height: "100%",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderBottom: `1px solid ${colors.divider}`,
                  backgroundColor: colors.background.paper,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: colors.text.primary }}
                >
                  {skillGroup.category}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  {skillGroup.items.join(" • ")}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
