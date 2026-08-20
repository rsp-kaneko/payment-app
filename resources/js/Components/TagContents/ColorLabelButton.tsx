import { ColorCode } from "@/types"
import { FormControlLabel, Radio } from "@mui/material"
import { FC } from "react"

type Props = {
    colorCode: ColorCode
}

const ColorLabelButton: FC<Props> = (props) => {
    const {colorCode} = props

    return (
        <FormControlLabel
            value={colorCode.color}
            control={
                <Radio
                    sx={{
                        color: colorCode.color,
                        '&.Mui-checked': {
                            color: colorCode.color
                        },
                    }}
                    />
                }
            label={colorCode.name}
        />
    )
}

export default ColorLabelButton
