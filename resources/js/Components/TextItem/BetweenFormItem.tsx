import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import { ChangeEventHandler, FC, ReactNode } from "react"

type Props = {
    type: string
    sLabel: string
    eLabel: string
    sIcon?: ReactNode
    eIcon?: ReactNode
    sValue?: string | number
    eValue?: string | number
    sOnChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    eOnChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

const BetweenFormItem: FC<Props> = ({
    type,
    sLabel,
    eLabel,
    sIcon = undefined,
    eIcon = undefined,
    sValue = undefined,
    eValue = undefined,
    sOnChange = undefined,
    eOnChange = undefined
}) => {
    return (
        <Paper
            component="form"
            variant="outlined"
            sx={{
                p: "2px 4px",
                display: 'flex',
                alignItems: 'center',
                border: "1px solid #aaa",
                borderRadius: 2
            }}
        >
            <IconButton size="small">
                {sIcon}
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                type={type}
                placeholder={sLabel}
                value={sValue}
                onChange={sOnChange}
            />
            <Divider sx={{ height: 28, m: 0.5, borderColor: "#aaa" }} orientation="vertical" />
            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                <i className="fa-solid fa-right-left text-black"></i>
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5, borderColor: "#aaa" }} orientation="vertical" />
            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                {eIcon}
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                type={type}
                placeholder={eLabel}
                value={eValue}
                onChange={eOnChange}
            />
        </Paper>
    )
}

export default BetweenFormItem
