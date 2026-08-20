import RootContext from "@/Contexts/RootContext"
import usePayment from "@/Hooks/usePayment"
import { MonthlyPaymentTagList } from "@/types/tag"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material"
import { ChangeEvent, FC, useContext, useEffect, useState } from "react"

type Props = {
    open: boolean
    onClose: () => void
    paymentId: number
    targetTagData: MonthlyPaymentTagList | null
}

const AddTagsDialog: FC<Props> = (props) => {
    const {open, onClose, paymentId, targetTagData} = props

    const {TAGS, TAG_REFRESH} = useContext(RootContext)
    const {joinTags, paymentLoad} = usePayment()
    const [tagIds, setTagIds] = useState<Array<number>>([])

    useEffect(() => {
        onClose()
    }, [TAG_REFRESH])

    useEffect(() => {
        targetTagData && setTagIds(targetTagData.tag_id_list)
    }, [targetTagData])

    const onChangeTagIds = (e: ChangeEvent<HTMLInputElement>) => {
        let changedTagIds: Array<number> = [];
        if (e.target.checked) {
            changedTagIds = [...tagIds, Number(e.target.value)]
        } else {
            changedTagIds = tagIds.filter((id) => id !== Number(e.target.value))
        }
        setTagIds(changedTagIds)
    }

    const handleJoinTags = () => {
        joinTags(paymentId, tagIds)
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="h5" sx={{ fontWeight: "bold" }}>タグ設定</Typography>
                <IconButton onClick={onClose}>
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormGroup sx={{display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", gap: 1}}>
                    {TAGS.length !== 0 && TAGS.map((tag) => (
                        <FormControlLabel
                            key={tag.id}
                            sx={{
                                backgroundColor: tag.color,
                                paddingRight: 1,
                                borderRadius: 2,
                                opacity: tagIds.includes(tag.id) ? 1 : 0.5
                            }}
                            control={<Checkbox
                                key={tag.id}
                                size="small"
                                onChange={(e) => onChangeTagIds(e)}
                                checked={tagIds.includes(tag.id)}
                                value={tag.id}
                                sx={{
                                    padding: 0.5,
                                    color: "#fff",
                                    '&.Mui-checked': {
                                        color: "#fff",
                                    },
                                }}
                            />}
                            label={
                                <Typography component="span" sx={{color: "#fff", fontWeight: "bold", fontSize: "0.9rem"}}>#{tag.name}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="small" loading={paymentLoad} onClick={handleJoinTags}>追加</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTagsDialog
