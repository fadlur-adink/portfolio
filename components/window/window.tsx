"use client";

import { useRef, useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { WindowState } from "@/types/window";
import { useWindowManager } from "@/contexts/window-manager-context";
import { colors } from "@/config/colors";

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
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager();

  const rndRef = useRef<Rnd>(null);
  const viewport = useViewportSize();

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isMaximized = windowState.isMaximized;

  const clampedWidth = Math.min(
    windowState.size.width,
    viewport.width - MOBILE_PADDING * 2
  );
  const clampedHeight = Math.min(
    windowState.size.height,
    viewport.height - TOP_BAR_HEIGHT - MOBILE_PADDING
  );
  const clampedX = Math.min(
    windowState.position.x,
    Math.max(0, viewport.width - clampedWidth - MOBILE_PADDING)
  );
  const clampedY = Math.max(
    TOP_BAR_HEIGHT,
    Math.min(windowState.position.y, viewport.height - clampedHeight - MOBILE_PADDING)
  );

  if (isMaximized) {
    return (
      <Box
        onClick={() => focusWindow(windowState.id)}
        sx={{
          position: "fixed",
          left: 0,
          top: TOP_BAR_HEIGHT,
          width: "100vw",
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
          zIndex: windowState.zIndex,
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.background.paper,
          border: `1px solid ${colors.divider}`,
          boxShadow: windowState.isFocused
            ? `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px ${colors.primary.main}40`
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
            backgroundColor: colors.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Rnd
      ref={rndRef}
      size={{ width: clampedWidth, height: clampedHeight }}
      position={{ x: clampedX, y: clampedY }}
      minWidth={Math.min(300, viewport.width - MOBILE_PADDING * 2)}
      minHeight={200}
      maxWidth={viewport.width - MOBILE_PADDING * 2}
      maxHeight={viewport.height - TOP_BAR_HEIGHT - MOBILE_PADDING}
      bounds="window"
      dragHandleClassName="window-drag-handle"
      onDragStart={() => focusWindow(windowState.id)}
      onDrag={(_e, d) => {
        if (d.y < TOP_BAR_HEIGHT) {
          d.y = TOP_BAR_HEIGHT;
        }
      }}
      onDragStop={(_e, d) => {
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
        zIndex: windowState.zIndex,
      }}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <Box
        onClick={() => focusWindow(windowState.id)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.background.paper,
          borderRadius: "8px",
          border: `1px solid ${colors.divider}`,
          boxShadow: windowState.isFocused
            ? `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px ${colors.primary.main}40`
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
            backgroundColor: colors.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    </Rnd>
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
          ? colors.background.default
          : colors.background.paper,
        borderBottom: `1px solid ${colors.divider}`,
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
          cursor: "grab",
          "&:active": {
            cursor: "grabbing",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: colors.text.primary,
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
            color: colors.text.secondary,
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
            color: colors.text.secondary,
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
            color: colors.text.secondary,
            touchAction: "manipulation",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.8)",
              color: colors.text.primary,
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
