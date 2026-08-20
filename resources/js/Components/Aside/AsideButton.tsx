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
                color: active ? "#333" : "#fff",
                backgroundColor: active ? "#e5e5e5" : "inherit",
                height: 80,
                fontWeight: "bold",
                fontSize: "1.3em",
                justifyContent: "start",
                paddingLeft: 4,
                borderRadius: 0,
                ":hover": {
                    color: "#333",
                    backgroundColor: "#e5e5e5",
                }
            }}
        >
            {children}
        </Button>
    )
}

export default AsideButton
