import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'

const Calendar = () => {
    const [currentDate] = useState(new Date());
    const theme = useTheme();
    const today = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <Box sx={{ width: 240 }}>
            <Typography
                variant="subtitle2"
                sx={{
                    textAlign: "center",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 2,
                }}
            >
                {monthName}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 0.5,
                    mb: 1,
                }}
            >
                {weekDays.map((day) => (
                    <Typography
                        key={day}
                        variant="caption"
                        sx={{
                            textAlign: "center",
                            color: theme.palette.text.secondary,
                            fontWeight: 600,
                            fontSize: "0.65rem",
                        }}
                    >
                        {day}
                    </Typography>
                ))}
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 0.5,
                }}
            >
                {days.map((day, index) => {
                    const isToday =
                        day === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();

                    return (
                        <Box
                            key={index}
                            sx={{
                                aspectRatio: "1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                backgroundColor: isToday
                                    ? theme.palette.primary.main
                                    : "transparent",
                                cursor: day ? "pointer" : "default",
                                "&:hover": day
                                    ? {
                                        backgroundColor: isToday
                                            ? theme.palette.primaryDark
                                            : theme.palette.primaryLight,
                                    }
                                    : {},
                            }}
                        >
                            {day && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: isToday
                                            ? "#fff"
                                            : theme.palette.text.primary,
                                        fontWeight: isToday ? 600 : 400,
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {day}
                                </Typography>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

export default Calendar