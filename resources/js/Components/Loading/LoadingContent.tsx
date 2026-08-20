import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

const LoadingContent: FC = () => {
    return (
        <Box sx={{
            zIndex: 10000,
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}>
            <Box sx={{
                width: 300,
                height: 300,
                margin: "auto",
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2
            }}>
                <CircularProgress size="64px" sx={{ color: "#0ff" }} />
                <Typography component="p" sx={{ color: "#fff" }}>読み込み中...</Typography>
            </Box>
        </Box>
    )
}

export default LoadingContent
