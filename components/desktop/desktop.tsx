"use client";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { colors } from "@/config/colors";
import { useWindowManager } from "@/contexts/window-manager-context";
import { TopBar } from "./top-bar";
import { DesktopIcon } from "./desktop-icon";
import { Dock } from "./dock";
import { Window } from "@/components/window/window";
import { AppDefinition } from "@/types/window";

interface DesktopProps {
  apps: AppDefinition[];
}

export function Desktop({ apps }: DesktopProps) {
  const { state, openWindow, registerApp, getApp } = useWindowManager();

  useEffect(() => {
    apps.forEach((app) => registerApp(app));
  }, [apps, registerApp]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: colors.background.default,
        backgroundImage: `
          radial-gradient(ellipse at top, ${colors.primary.main}10 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, ${colors.primary.dark}08 0%, transparent 50%)
        `,
        overflow: "hidden",
      }}
    >
      <TopBar />

      <Box
        sx={{
          position: "absolute",
          top: 56,
          left: 16,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 1,
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.title}
            onClick={() => openWindow(app.id)}
          />
        ))}
      </Box>

      {state.windows.map((window) => {
        const app = getApp(window.appId);
        if (!app) return null;
        return (
          <Window key={window.id} window={window}>
            {app.component}
          </Window>
        );
      })}

      <Dock />
    </Box>
  );
}
