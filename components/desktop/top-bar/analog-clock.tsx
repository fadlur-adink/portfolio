import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const AnalogClock = () => {
    const [time, setTime] = useState(new Date());
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12;

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    return (
        <Box
            sx={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                backgroundColor: theme.palette.background.default,
                border: `3px solid ${theme.palette.primary.main}`,
                position: "relative",
                margin: "0 auto",
            }}
        >
            {[...Array(12)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 2,
                        height: i % 3 === 0 ? 12 : 6,
                        backgroundColor:
                            i % 3 === 0
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                        transformOrigin: "center 78px",
                        transform: `translate(-50%, -78px) rotate(${i * 30}deg)`,
                    }}
                />
            ))}

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 4,
                    height: 50,
                    backgroundColor: theme.palette.text.primary,
                    borderRadius: 2,
                    transformOrigin: "center bottom",
                    transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
                    transition: "transform 0.1s ease-out",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 3,
                    height: 65,
                    backgroundColor: theme.palette.text.primary,
                    borderRadius: 2,
                    transformOrigin: "center bottom",
                    transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
                    transition: "transform 0.1s ease-out",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 2,
                    height: 70,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1,
                    transformOrigin: "center bottom",
                    transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 10,
                    height: 10,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </Box>
    );
}

export default AnalogClock