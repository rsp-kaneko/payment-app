import RootContext from "@/Contexts/RootContext"
import useTag from "@/Hooks/useTag"
import { Dialog, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputBase, Paper, RadioGroup, Typography } from "@mui/material"
import { FC, useContext, useEffect, useMemo } from "react"
import ColorLabelButton from "./ColorLabelButton"
import { Tag } from "@/types/tag"

type Props = {
    tagId: number
    open: boolean
    onClose: () => void
}

const EditTagDialog: FC<Props> = (props) => {
    const {tagId, open, onClose} = props
    const {COLOR_CODES, TAGS, SET_ALERT, TAG_REFRESH} = useContext(RootContext)
    const {tagLoad, updateTag, tagData, setTagData} = useTag()

    const handleUpdateTag = () => {
        if (tagData.name) {
            if (tagData.name.length < 2) {
                SET_ALERT({type: "error", open: true, message: "最低2文字以上"})
                return
            } else if (tagData.name.length > 10) {
                SET_ALERT({type: "error", open: true, message: "最大10文字まで"})
                return
            }
        } else {
            SET_ALERT({type: "error", open: true, message: "タグ名を入力してください"})
            return
        }
        if (!tagData.color) {
            SET_ALERT({type: "error", open: true, message: "カラーを選択してください"})
            return
        }
        updateTag(tagData)
        setTagData((data) => ({...data, name: "", color: ""}))
    }

    const tag: Tag | null = useMemo(() => TAGS.find((tag) => tag.id === tagId) ?? null, [TAGS, open])

    useEffect(() => {
        onClose()
    }, [TAG_REFRESH])

    useEffect(() => {
        setTagData({
            id: tagId,
            name: tag?.name,
            color: tag?.color
        })
    }, [tag])

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>タグ編集</Typography>
                <IconButton onClick={onClose}>
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup value={tagData.color} row onChange={(e) => setTagData((data) => ({...data, color: e.target.value}))}>
                        {COLOR_CODES.map((colorCode, index) => (
                            <ColorLabelButton
                                key={colorCode.name + index}
                                colorCode={colorCode}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="新しいタグ名を入力"
                        type="text"
                        value={tagData.name}
                        onChange={(e) =>
                            setTagData((data) => ({...data, name: e.target.value}))
                        }
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        color="primary"
                        sx={{ p: '10px' }}
                        loading={tagLoad}
                        onClick={handleUpdateTag}
                    >
                        <i className="fa-solid fa-circle-plus"></i>
                    </IconButton>
                </Paper>
            </DialogContent>
        </Dialog>
    )
}

export default EditTagDialog
