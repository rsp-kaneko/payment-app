import { Button } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
    active?: boolean
    disabled?: boolean
    onClick?: (any: any) => void
}

const CalendarButton: FC<Props> = (props) => {
    const { children, active = false, disabled = false, onClick = undefined } = props

    return (
        <Button
            fullWidth
            variant="text"
            disabled={disabled}
            onClick={onClick}
            sx={{
                py: 1,
                borderRadius: 1.5,
                fontWeight: active ? "bold" : 600,
                fontSize: "0.95rem",
                transition: "all 0.15s ease-in-out",
                bgcolor: disabled
                    ? "#f8fafc"
                    : active
                        ? "#1976d2"
                        : "#f8fafc",
                color: disabled
                    ? "#cbd5e1"
                    : active
                        ? "#ffffff"
                        : "#334155",
                border: active
                    ? "1px solid #1976d2"
                    : "1px solid #e2e8f0",
                boxShadow: active
                    ? "0 2px 6px rgba(25, 118, 210, 0.3)"
                    : "none",
                "&:hover": {
                    bgcolor: disabled
                        ? "#f8fafc"
                        : active
                            ? "#1565c0"
                            : "#eff6ff",
                    borderColor: active ? "#1565c0" : "#93c5fd",
                    color: active ? "#ffffff" : "#1d4ed8"
                }
            }}
        >
            {children}
        </Button>
    )
}

export default CalendarButton
