"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useWindowManager } from "@/contexts/window-manager-context";

export function Dock() {
  const { state, restoreWindow, getApp } = useWindowManager();
  const theme = useTheme();

  const minimizedWindows = state.windows.filter((w) => w.isMinimized);

  if (minimizedWindows.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 1,
        padding: "8px 12px",
        backgroundColor: `${theme.palette.background.paper}ee`,
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        zIndex: 9998,
      }}
    >
      {minimizedWindows.map((window) => {
        const app = getApp(window.appId);
        return (
          <IconButton
            key={window.id}
            onClick={() => restoreWindow(window.id)}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "10px",
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: theme.palette.primaryLight,
                transform: "translateY(-4px)",
              },
              "& svg": {
                fontSize: 24,
                color: theme.palette.primary.main,
              },
            }}
            title={window.title}
          >
            {app?.icon}
          </IconButton>
        );
      })}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          color: theme.palette.text.secondary,
          fontSize: "0.65rem",
          whiteSpace: "nowrap",
        }}
      >
        {minimizedWindows.length} minimized
      </Typography>
    </Box>
  );
}
