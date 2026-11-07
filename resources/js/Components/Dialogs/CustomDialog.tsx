import { Box, Dialog, DialogTitle, IconButton, Typography } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = {
    open: boolean
    onClose: () => void
    title: string
    children: ReactNode
    icon?: ReactNode
    subTitle?: string
    color?: string
}

const CustomDialog: FC<Props> = ({
    open,
    onClose,
    title,
    children,
    icon = <i className="fa-solid fa-circle-info"></i>,
    subTitle = "",
    color = undefined
}) => {

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <Box sx={{
                        backgroundColor: "#ddd",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: color ? color : "#333"
                    }}>
                        {icon}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography component="span" sx={{ fontWeight: "bold", color: color ? color : "#000" }}>{title}</Typography>
                        <Typography variant="caption">{subTitle}</Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    )
}

export default CustomDialog
