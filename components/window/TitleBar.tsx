"use client";

import { WindowState } from '@/types/window';
import { useTranslations } from 'next-intl';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

interface TitleBarProps {
    windowState: WindowState;
    isMaximized: boolean;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ windowState, isMaximized, onMinimize, onMaximize, onClose }) => {
    const theme = useTheme();
    const t = useTranslations("Desktop");
    const retro = theme.palette.retro;
    const accentIndex = ["welcome", "about", "projects", "skills", "contact", "resume", "settings"].indexOf(windowState.appId);
    const accent = retro.accents[Math.max(0, accentIndex) % retro.accents.length];
    const titleColor = windowState.isFocused ? theme.palette.getContrastText(accent) : theme.palette.text.secondary;
    const controls = [
        { label: t("minimize"), action: onMinimize, icon: <RemoveIcon sx={{ fontSize: 16 }} /> },
        { label: isMaximized ? t("restore") : t("maximize"), action: onMaximize, icon: isMaximized ? <FilterNoneIcon sx={{ fontSize: 14 }} /> : <CropSquareIcon sx={{ fontSize: 16 }} /> },
        { label: t("close"), action: onClose, icon: <CloseIcon sx={{ fontSize: 16 }} /> },
    ];
    const handleButtonInteraction = (e: React.PointerEvent, action: () => void) => {
        e.stopPropagation();
        if (e.button !== 0) return;
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
                minHeight: 36,
                backgroundColor: windowState.isFocused ? accent : retro.surface,
                borderBottom: `2px solid ${retro.ink}`,
                boxShadow: retro.bevel,
                px: 0.75,
                userSelect: "none",
            }}
        >
            <Box
                className="window-drag-handle"
                sx={{
                    flex: 1,
                    minWidth: 0,
                    gap: 1,
                    pr: 1.5,
                    height: "100%",
                    "&::after": {
                        content: '""',
                        flex: 1,
                        height: 14,
                        opacity: 0.25,
                        background: `repeating-linear-gradient(0deg, ${titleColor} 0 1px, transparent 1px 3px)`,
                    },
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
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.04em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        ml: 0.5,
                    }}
                >
                    {windowState.title}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.75 }}>
                {controls.map(({ label, action, icon }) => (
                    <IconButton
                        key={label}
                        aria-label={`${label} ${windowState.title}`}
                        title={label}
                        size="small"
                        onPointerDown={(e) => handleButtonInteraction(e, action)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                action();
                            }
                        }}
                        sx={{
                            width: 26,
                            height: 24,
                            color: theme.palette.text.primary,
                            backgroundColor: retro.surface,
                            border: `1px solid ${retro.ink}`,
                            boxShadow: retro.bevel,
                            touchAction: "manipulation",
                            "&:hover": { backgroundColor: theme.palette.background.paper },
                            "&:active": { transform: "translate(1px, 1px)", boxShadow: "none" },
                        }}
                    >
                        {icon}
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}

export default TitleBar