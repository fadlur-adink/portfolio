"use client";

import { useRef, useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Box, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { WindowState } from "@/types/window";
import { useWindowManager } from "@/contexts/window-manager-context";

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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        isMinimized
          ? {
              x: deltaX,
              y: deltaY,
              scale: 0.1,
              opacity: 0,
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }
            }
      }
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
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
        bounds="window"
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
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          resizeWindow(windowState.id, {
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          });
          moveWindow(windowState.id, { x: position.x, y: position.y });
        }}
        style={{
          pointerEvents: isMinimized ? "none" : "auto",
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
          onPointerDown={() => focusWindow(windowState.id)}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.paper,
            borderRadius: isMaximized ? 0 : "8px",
            border: isMaximized ? "none" : `1px solid ${theme.palette.divider}`,
            borderTop: `1px solid ${theme.palette.divider}`,
            boxShadow: windowState.isFocused
              ? `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px ${theme.palette.primary.main}40`
              : "0 4px 16px rgba(0, 0, 0, 0.3)",
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
              overflow: "auto",
              backgroundColor: theme.palette.background.default,
            }}
          >
            {children}
          </Box>
        </Box>
      </Rnd>
    </motion.div>
  );
}

interface TitleBarProps {
  windowState: WindowState;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

function TitleBar({
  windowState,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  const theme = useTheme();
  const handleButtonInteraction = (
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent,
    action: () => void
  ) => {
    e.stopPropagation();
    e.preventDefault();
    action();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 36,
        backgroundColor: windowState.isFocused
          ? theme.palette.background.default
          : theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: 1,
        userSelect: "none",
      }}
    >
      <Box
        className="window-drag-handle"
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          cursor: isMaximized ? "default" : "grab",
          "&:active": {
            cursor: isMaximized ? "default" : "grabbing",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            ml: 1,
          }}
        >
          {windowState.title}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton
          size="small"
          onPointerDown={(e) => handleButtonInteraction(e, onMinimize)}
          sx={{
            width: 32,
            height: 32,
            color: theme.palette.text.secondary,
            touchAction: "manipulation",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <RemoveIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton
          size="small"
          onPointerDown={(e) => handleButtonInteraction(e, onMaximize)}
          sx={{
            width: 32,
            height: 32,
            color: theme.palette.text.secondary,
            touchAction: "manipulation",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {isMaximized ? (
            <FilterNoneIcon sx={{ fontSize: 14 }} />
          ) : (
            <CropSquareIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
        <IconButton
          size="small"
          onPointerDown={(e) => handleButtonInteraction(e, onClose)}
          sx={{
            width: 32,
            height: 32,
            color: theme.palette.text.secondary,
            touchAction: "manipulation",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.8)",
              color: theme.palette.text.primary,
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
