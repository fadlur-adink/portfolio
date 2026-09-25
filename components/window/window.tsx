"use client";

import { useWindowManager } from "@/contexts/window-manager-context";
import { WindowState } from "@/types/window";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import TitleBar from "./TitleBar";

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

const TOP_BAR_HEIGHT = 40;
const MOBILE_PADDING = 16;



function useViewportSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export function Window({ window: windowState, children }: WindowProps) {
  const theme = useTheme();
  const t = useTranslations("Desktop");
  const reduceMotion = useReducedMotion();
  const {
    state,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager();

  const rndRef = useRef<Rnd>(null);
  const viewport = useViewportSize();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  if (!windowState.isOpen) {
    return null;
  }

  const isMaximized = windowState.isMaximized;
  const isMinimized = windowState.isMinimized;

  let targetWidth = windowState.size.width;
  let targetHeight = windowState.size.height;
  let targetX = windowState.position.x;
  let targetY = windowState.position.y;

  if (isMaximized) {
    targetWidth = viewport.width;
    targetHeight = viewport.height - TOP_BAR_HEIGHT;
    targetX = 0;
    targetY = TOP_BAR_HEIGHT;
  } else {
    if (viewport.width > 0 && viewport.height > 0) {
      targetWidth = Math.min(
        targetWidth,
        viewport.width - MOBILE_PADDING * 2
      );
      targetHeight = Math.min(
        targetHeight,
        viewport.height - TOP_BAR_HEIGHT - MOBILE_PADDING
      );
      targetX = Math.min(
        targetX,
        Math.max(0, viewport.width - targetWidth - MOBILE_PADDING)
      );
      targetY = Math.max(
        TOP_BAR_HEIGHT,
        Math.min(targetY, viewport.height - targetHeight - MOBILE_PADDING)
      );
    }
  }

  const windowIndex = state.windows.findIndex((w) => w.id === windowState.id);

  const iconSize = 48;
  const iconGap = 8;
  const dockPadding = 12;
  const totalIconsWidth = state.windows.length * iconSize + (state.windows.length - 1) * iconGap;
  const dockWidth = Math.max(0, totalIconsWidth + dockPadding * 2);
  const dockX = (viewport.width - dockWidth) / 2;
  const iconX = dockX + dockPadding + windowIndex * (iconSize + iconGap) + iconSize / 2;
  const iconY = viewport.height - 16 - 32;

  const centerX = targetX + targetWidth / 2;
  const centerY = targetY + targetHeight / 2;

  const deltaX = iconX - centerX;
  const deltaY = iconY - centerY;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      inert={isMinimized}
      aria-hidden={isMinimized || undefined}
      animate={
        isMinimized
          ? {
            x: reduceMotion ? 0 : deltaX,
            y: reduceMotion ? 0 : deltaY,
            scale: reduceMotion ? 1 : 0.08,
            opacity: 0,
            transition: { duration: reduceMotion ? 0 : 0.24, ease: [0.4, 0, 1, 1] }
          }
          : {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            transition: { duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }
          }
      }
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, transition: { duration: reduceMotion ? 0 : 0.12 } }}
      className={isMaximized ? "maximized-window-wrapper" : undefined}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: windowState.zIndex,
        transformOrigin: `${centerX}px ${centerY}px`,
      }}
    >
      <Rnd
        ref={rndRef}
        size={{ width: targetWidth, height: targetHeight }}
        position={{ x: targetX, y: targetY }}
        minWidth={Math.min(300, viewport.width - MOBILE_PADDING * 2)}
        minHeight={200}
        maxWidth={viewport.width}
        maxHeight={viewport.height - TOP_BAR_HEIGHT}
        bounds={isMaximized ? undefined : "window"}
        dragHandleClassName="window-drag-handle"
        disableDragging={isMaximized || isMinimized}
        onDragStart={() => {
          focusWindow(windowState.id);
          setIsDragging(true);
        }}
        onDrag={(_e, d) => {
          if (d.y < TOP_BAR_HEIGHT) {
            d.y = TOP_BAR_HEIGHT;
          }
        }}
        onDragStop={(_e, d) => {
          setIsDragging(false);
          const clampedY = Math.max(TOP_BAR_HEIGHT, d.y);
          moveWindow(windowState.id, { x: d.x, y: clampedY });
        }}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          setIsResizing(false);
          resizeWindow(windowState.id, {
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          });
          moveWindow(windowState.id, { x: position.x, y: position.y });
        }}
        className={isMaximized ? "maximized-rnd" : undefined}
        style={{
          margin: 0,
          pointerEvents: isMinimized ? "none" : "auto",
          zIndex: windowState.zIndex,
          transition:
            isDragging || isResizing || reduceMotion
              ? "none"
              : "width 0.18s steps(5), height 0.18s steps(5), transform 0.18s steps(5)",
        }}
        enableResizing={
          isMaximized || isMinimized
            ? false
            : {
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }
        }
      >
        <Box
          role="region"
          aria-label={windowState.title}
          onPointerDown={() => focusWindow(windowState.id)}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.paper,
            borderRadius: isMaximized ? 0 : "4px",
            border: `2px solid ${theme.palette.retro.ink}`,
            boxShadow: isMaximized ? "none" : windowState.isFocused
              ? `7px 7px 0 ${theme.palette.retro.ink}`
              : `4px 4px 0 ${theme.palette.retro.ink}`,
            p: "2px",
            overflow: "hidden",
          }}
        >
          <TitleBar
            windowState={windowState}
            isMaximized={isMaximized}
            onMinimize={() => minimizeWindow(windowState.id)}
            onMaximize={() => maximizeWindow(windowState.id)}
            onClose={() => closeWindow(windowState.id)}
          />
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderTop: 0,
            }}
          >
            {children}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 23, px: 1, backgroundColor: theme.palette.retro.surface, borderTop: `1px solid ${theme.palette.retro.ink}`, boxShadow: theme.palette.retro.bevel }}>
            <Box sx={{ width: 6, height: 6, backgroundColor: theme.palette.primary.main }} />
            <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary", flex: 1 }}>{t("ready")}</Typography>
            <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>{windowState.appId}.exe</Typography>
            {!isMaximized && <Box aria-hidden="true" sx={{ width: 12, height: 12, background: `repeating-linear-gradient(135deg, transparent 0 2px, ${theme.palette.text.secondary} 2px 3px)`, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />}
          </Box>
        </Box>
      </Rnd>
    </motion.div>
  );
}

