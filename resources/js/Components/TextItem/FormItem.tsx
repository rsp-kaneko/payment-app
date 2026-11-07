import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import { ChangeEventHandler, FC, ReactNode } from "react"

type Props = {
    type: string
    label: string
    icon?: ReactNode
    value?: string | number
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

const FormItem: FC<Props> = ({
    type,
    label,
    icon = undefined,
    value = undefined,
    onChange = undefined
}) => {

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: "none",
                border: "1px solid #aaa",
                borderRadius: 2
            }}
        >
            <IconButton size="small">
                {icon}
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5, borderColor: "#aaa" }} orientation="vertical" />
            <InputBase
                type={type}
                value={value}
                onChange={onChange}
                placeholder={label}
                fullWidth
                sx={{ml: 1}}
            />
        </Paper>
    )
}

export default FormItem
