import RootContext from "@/Contexts/RootContext"
import useTag from "@/Hooks/useTag"
import { Box, Dialog, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, InputBase, Paper, Radio, RadioGroup, Typography } from "@mui/material"
import { FC, useContext } from "react"
import TagCard from "./TagCard"
import ColorLabelButton from "./ColorLabelButton"

type Props = {
    open: boolean
    onClose: () => void
}

const TagSettingDialog: FC<Props> = (props) => {
    const {open, onClose} = props

    const {SET_ALERT, COLOR_CODES, TAGS} = useContext(RootContext)

    const {
        tagLoad,
        tagData,
        setTagData,
        createTag,
        deleteTag
    } = useTag()

    const handleCreateTag = () => {
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
        createTag(tagData)
        setTagData((data) => ({...data, name: "", color: ""}))
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
                <Box>
                    {tagLoad ? (
                        <Box sx={{textAlign: "center"}}>
                            <Typography component="span">...Please Wait</Typography>
                        </Box>
                    ) : (
                        <Box>
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
                                    placeholder="タグを追加"
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
                                    onClick={handleCreateTag}
                                >
                                    <i className="fa-solid fa-circle-plus"></i>
                                </IconButton>
                            </Paper>
                        </Box>
                    )}
                </Box>
                <Box sx={{mt: 2}}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        flexWrap: "wrap",
                        gap: 2
                    }}>
                        {TAGS.length !== 0 ? (
                            TAGS.map((tag) => (
                                <TagCard
                                    key={tag.id}
                                    tag={tag}
                                    deleteTag={deleteTag}
                                />
                            ))
                        ) : (
                            <Box sx={{fontWeight: "bold", color: "#f00"}}>
                                <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                                登録されたタグが存在しません
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default TagSettingDialog
