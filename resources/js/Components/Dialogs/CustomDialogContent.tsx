import { DialogContent, Stack } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const CustomDialogContent: FC<Props> = ({
    children
}) => {
    return (
        <DialogContent>
            <Stack spacing={2} sx={{
                border: "1px solid #ddd",
                borderRadius: 4,
                p: 2,
                backgroundColor: "#eee"
            }}>
                {children}
            </Stack>
        </DialogContent>
    )
}

export default CustomDialogContent
