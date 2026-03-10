import { WindowState } from '@/types/window';
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
    )
}

export default TitleBar