import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Guest({ children, title }: PropsWithChildren & {title?: string | null}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center sm:pt-0">
            <Box sx={{mb: 5, textAlign: "center"}}>
                <img src="./favicon.ico" width="160px" style={{margin: "0 auto"}} />
                <Typography
                    component="p"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "2rem"
                    }}
                >
                    帳簿管理システム
                </Typography>
            </Box>

            <Card sx={(theme) => ({
                width: "90%",
                mx: "auto",
                [theme.breakpoints.up("md")]: {
                    width: 500,
                }
            })}>
                <CardHeader
                    title={
                        <Typography component="span">{title}</Typography>
                    }
                    sx={{
                        bgcolor: "#1976d2",
                        color: "#fff"
                    }}
                />
                <CardContent sx={{px: 5, py: 5}}>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}
