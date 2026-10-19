import { alpha, Box, Card, CardContent, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { FC } from "react";

const LoadingContent: FC = () => {
    return (
        <Box sx={{
            zIndex: 10000,
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: 0
        }}>
            <Card sx={{
                width: 200,
                height: 200,
                backgroundColor: alpha("#333", 0.9),
                borderRadius: 4,
                position: "relative"
            }}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    color: "#fff"
                }}>
                    <LinearProgress color="info" sx={{width: '100%', position: 'absolute', top: 0, height: 8}}/>
                    <CircularProgress size={64} color="info" />
                    <Typography component='p' sx={{fontWeight: "bold", fontSize: "1.2rem"}}>Loading Now...</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoadingContent
