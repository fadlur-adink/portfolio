"use client";

import { useEffect, useState } from "react";
import { Box, keyframes } from "@mui/material";
import { colors } from "@/config/colors";
import { useWindowManager } from "@/contexts/window-manager-context";
import { TopBar } from "./top-bar";
import { DesktopIcon } from "./desktop-icon";
import { Dock } from "./dock";
import { Window } from "@/components/window/window";
import { AppDefinition } from "@/types/window";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

interface DesktopProps {
  apps: AppDefinition[];
}

export function Desktop({ apps }: DesktopProps) {
  const { state, openWindow, registerApp, getApp } = useWindowManager();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    apps.forEach((app) => registerApp(app));
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
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
        animation: `${fadeIn} 0.6s ease-out`,
      }}
    >
      <Box
        sx={{
          opacity: isLoaded ? 1 : 0,
          animation: isLoaded ? `${slideDown} 0.5s ease-out` : "none",
        }}
      >
        <TopBar />
      </Box>

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
        {apps.map((app, index) => (
          <Box
            key={app.id}
            sx={{
              opacity: isLoaded ? 1 : 0,
              animation: isLoaded
                ? `${scaleIn} 0.4s ease-out ${0.2 + index * 0.1}s both`
                : "none",
            }}
          >
            <DesktopIcon
              icon={app.icon}
              label={app.title}
              onClick={() => openWindow(app.id)}
            />
          </Box>
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
