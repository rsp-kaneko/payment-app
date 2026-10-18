import { Box, Button } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
    active?: boolean
    onClick?: (any: any) => void
    children: ReactNode
}

const AsideButton: FC<Props> = (props) => {
    const { active = false, onClick = undefined, children } = props

    return (
        <Button
            fullWidth
            onClick={onClick}
            sx={{
                color: active ? "#1565c0" : "rgba(255, 255, 255, 0.9)",
                bgcolor: active ? "#ffffff" : "transparent",
                boxShadow: active ? "0 4px 12px rgba(0, 0, 0, 0.12)" : "none",
                minHeight: 46,
                py: 1.2,
                px: 2,
                borderRadius: 2,
                fontWeight: active ? "bold" : 600,
                fontSize: "0.95rem",
                justifyContent: "start",
                textTransform: "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    bgcolor: active ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: active ? "#1565c0" : "#ffffff",
                    transform: active ? "none" : "translateX(3px)"
                }
            }}
        >
            {children}
        </Button>
    )
}

export default AsideButton
