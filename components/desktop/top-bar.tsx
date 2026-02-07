"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "@/config/colors";
import { siteConfig } from "@/config/site";

function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography
      variant="body2"
      sx={{
        color: colors.text.primary,
        fontWeight: 500,
        fontFamily: "monospace",
      }}
    >
      {time}
    </Typography>
  );
}

export function TopBar() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        backgroundColor: colors.background.paper,
        borderBottom: `1px solid ${colors.divider}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        zIndex: 9999,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: colors.primary.main,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Clock />
      </Box>
    </Box>
  );
}
