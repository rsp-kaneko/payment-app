import { MonthlyTag } from "@/types/tag"
import { Card, CardContent, CardHeader, IconButton, LinearProgress, Typography } from "@mui/material"
import { FC, useContext, useMemo, useState } from "react"
import EditTagDialog from "./EditTagDialog"
import RootContext from "@/Contexts/RootContext"

type Props = {
    tagData: MonthlyTag
}

const MonthlyTagDataCard: FC<Props> = (props) => {
    const {tagData} = props
    const {COLOR_CODES} = useContext(RootContext)

    const [openEditDialog, setOpenEditDialog] = useState(false)

    const onCloseEditDialog = () => setOpenEditDialog(false)

    const priceRatio = useMemo(() => Math.floor((tagData.total_price / tagData.monthly_total_price) * 100), [tagData])
    const progressColor: any = useMemo(() => {
        const targetCode = COLOR_CODES.find((data) => data.color === tagData.tag_color)
        return targetCode ? targetCode.name : "inherit"
    }, [tagData.tag_color])

    return (
        <Card>
            <CardHeader
                title={
                    <Typography component="h1" sx={{fontSize: "1.5rem"}}>
                        #{tagData.name}
                        <i className="fa-solid fa-tag ml-2" style={{color: tagData.tag_color}}></i>
                    </Typography>
                }
                subheader={"全体の"+priceRatio+"%"}
                action={
                    <IconButton onClick={() => setOpenEditDialog(true)}>
                        <i className="fa-solid fa-pen fa-sm"></i>
                    </IconButton>
                }
            />
            <CardContent>
                <LinearProgress
                    variant="determinate"
                    color={progressColor}
                    value={priceRatio}
                />
                <Typography component="p" sx={{fontWeight: "bold", mt: 2}}>
                    合計：￥{Number(tagData.total_price).toLocaleString("ja-JP")}
                </Typography>
            </CardContent>

            <EditTagDialog
                open={openEditDialog}
                onClose={onCloseEditDialog}
                tagId={tagData.id}
            />
        </Card>
    )
}

export default MonthlyTagDataCard
