import { Typography } from "@mui/material";
import { CSSProperties, FC, ReactNode } from "react";

type Props = {
    children: ReactNode
    color?: string
}

const TextItemBox: FC<Props> = (props) => {
    const { children, color = "#888" } = props

    const styles: CSSProperties = {
        backgroundColor: color,
        color: "#fff",
        padding: "0 8px",
        borderRadius: 1,
        fontSize: "0.9em"
    }

    return (
        <Typography component="span" sx={styles}>
            {children}
        </Typography>
    )
}

export default TextItemBox