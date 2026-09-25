"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSettings } from "@/contexts/settings-context";
import { useTheme } from "@mui/material/styles";
import { AnimatePresence } from "framer-motion";
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
    transform: translateY(8px) scale(0.96);
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
  const theme = useTheme();
  const retro = theme.palette.retro;
  const t = useTranslations("Desktop");
  const { currentScheme } = useSettings();
  const didOpenWelcome = useRef(false);

  useEffect(() => {
    apps.forEach((app) => registerApp(app));
    if (!didOpenWelcome.current) {
      openWindow("welcome");
      didOpenWelcome.current = true;
    }
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, [apps, registerApp, openWindow]);

  const widgetStyle = {
    border: `2px solid ${retro.ink}`,
    borderRadius: "4px",
    backgroundColor: retro.surface,
    boxShadow: `${retro.shadow}, ${retro.bevel}`,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: retro.desktop,
        backgroundImage: `linear-gradient(${retro.grid} 1px, transparent 1px), linear-gradient(90deg, ${retro.grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        backgroundPosition: "-1px -1px",
        overflow: "hidden",
        animation: `${fadeIn} 0.3s steps(4)`,
      }}
    >
      <Box
        sx={{
          opacity: isLoaded ? 1 : 0,
          animation: isLoaded ? `${slideDown} 0.24s steps(4)` : "none",
        }}
      >
        <TopBar />
      </Box>

      <Box sx={{ position: "absolute", left: { xs: 110, sm: 160 }, bottom: 96, right: 32, color: retro.desktopText, pointerEvents: "none", opacity: 0.8 }}>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: 700, letterSpacing: "-0.07em", lineHeight: 1.1 }}>FadlurOS<span style={{ fontSize: "0.4em", verticalAlign: "top", letterSpacing: 0 }}> ✳</span></Typography>
        <Typography variant="caption" sx={{ display: { xs: "none", sm: "block" }, mt: 1 }}>{t("tagline")}</Typography>
      </Box>

      <Box sx={{ position: "absolute", top: 114, right: { md: 36, lg: 72 }, width: 270, display: { xs: "none", md: "grid" }, gap: 3 }}>
        <Box sx={widgetStyle}>
          <Box sx={{ px: 1.25, py: 0.75, backgroundColor: retro.accents[2], color: theme.palette.getContrastText(retro.accents[2]), borderBottom: `2px solid ${retro.ink}`, boxShadow: retro.bevel, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" fontWeight={700}>{t("personalize")}</Typography>
            <Typography aria-hidden="true" variant="caption">▣</Typography>
          </Box>
          <Box sx={{ p: 2.5, textAlign: "center" }}>
            <Box aria-hidden="true" sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
              {retro.accents.map((color, i) => <Box key={i} sx={{ width: 32, height: 32, backgroundColor: color, border: `2px solid ${retro.ink}`, boxShadow: `2px 2px 0 ${retro.ink}`, borderRadius: "50%" }} />)}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{currentScheme.name}</Typography>
            <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mb: 2 }}>{t("appearanceHint")}</Typography>
            <Button size="small" variant="outlined" onClick={() => openWindow("settings")}>{t("openSettings")} ↗</Button>
          </Box>
        </Box>
        <Box sx={{ ...widgetStyle, transform: "rotate(2deg)", ml: 2 }}>
          <Box sx={{ px: 1.25, py: 0.75, backgroundColor: retro.accents[3], color: theme.palette.getContrastText(retro.accents[3]), borderBottom: `2px solid ${retro.ink}`, boxShadow: retro.bevel }}>
            <Typography variant="caption" fontWeight={700}>{t("noteTitle")}</Typography>
          </Box>
          <Box sx={{ px: 2.5, py: 2, textAlign: "center", backgroundColor: "background.paper" }}>
            <Box aria-hidden="true" className="retro-float" sx={{ fontSize: "2.5rem", lineHeight: 1.4, color: "primary.main" }}>✳</Box>
            <Typography variant="body2" sx={{ my: 1.5, lineHeight: 1.7 }}>{t("note")}</Typography>
            <Button size="small" variant="text" onClick={() => openWindow("projects")}>{t("explore")} →</Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 64,
          left: 16,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 0.5,
          maxHeight: "calc(100dvh - 150px)",
        }}
      >
        {apps.map((app, index) => (
          <Box
            key={app.id}
            sx={{
              opacity: isLoaded ? 1 : 0,
              animation: isLoaded
                ? `${scaleIn} 0.24s steps(4) ${0.05 + index * 0.045}s both`
                : "none",
            }}
          >
            <DesktopIcon
              icon={app.icon}
              index={index}
              label={app.title}
              onClick={() => openWindow(app.id)}
            />
          </Box>
        ))}
      </Box>

      <AnimatePresence>
        {state.windows.map((window) => {
          const app = getApp(window.appId);
          if (!app) return null;
          return (
            <Window key={window.id} window={window}>
              {app.component}
            </Window>
          );
        })}
      </AnimatePresence>

      <Box sx={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between", color: retro.desktopText, pointerEvents: "none" }}>
        <Typography variant="caption" sx={{ fontSize: "0.55rem", letterSpacing: "0.12em", display: { xs: "none", sm: "block" } }}>{t("edition")}</Typography>
        <Typography variant="caption" sx={{ fontSize: "0.55rem", letterSpacing: "0.08em", display: { xs: "none", md: "block" } }}>■ {t("status")}</Typography>
      </Box>
      <Dock />
    </Box>
  );
}
