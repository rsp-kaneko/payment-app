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
                backgroundColor: disabled
                    ? "#aaa"
                    : active ? "#e5e5e5" : "#1976d2",
                borderRadius: 0,
                color: active ? "#333" : "#fff",
                fontSize: "1.2em",
                fontWeight: "bold",
                ":hover": {
                    backgroundColor: "#e5e5e5",
                    color: "#333"
                }
            }}
        >
            {children}
        </Button>
    )
}

export default CalendarButton
