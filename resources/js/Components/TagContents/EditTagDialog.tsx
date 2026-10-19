import RootContext from "@/Contexts/RootContext"
import useTag from "@/Hooks/useTag"
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputBase,
    Paper,
    RadioGroup,
    Typography,
} from "@mui/material"
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
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        p: 1,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    },
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "10px",
                            bgcolor: "rgba(99, 102, 241, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6366f1",
                            fontSize: "1.1rem",
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Box>
                    <Box>
                        <Typography component="h5" sx={{ fontWeight: "bold", fontSize: "1.125rem", color: "#1e293b" }}>
                            タグ編集
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            タグ名やカラーの変更ができます
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: "#94a3b8",
                        "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                            color: "#475569",
                        },
                    }}
                >
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 1, px: 2 }}>
                <Box
                    sx={{
                        p: 2.5,
                        bgcolor: "#f8fafc",
                        borderRadius: 2.5,
                        border: "1px solid #e2e8f0",
                    }}
                >
                    {tagLoad ? (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3, gap: 1.5 }}>
                            <CircularProgress size={32} thickness={4} sx={{ color: "#6366f1" }} />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                処理中...
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* カラー選択 */}
                            <Box>
                                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "bold", mb: 0.5, display: "block" }}>
                                    カラーを選択
                                </Typography>
                                <FormControl fullWidth>
                                    <RadioGroup
                                        value={tagData.color ?? ""}
                                        row
                                        onChange={(e) => setTagData((data) => ({ ...data, color: e.target.value }))}
                                        sx={{ gap: 0.5, flexWrap: "wrap" }}
                                    >
                                        {COLOR_CODES.map((colorCode, index) => (
                                            <ColorLabelButton
                                                key={colorCode.name + index}
                                                colorCode={colorCode}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            {/* 入力フォーム */}
                            <Paper
                                component="form"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleUpdateTag()
                                }}
                                elevation={0}
                                sx={{
                                    p: "4px 8px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    bgcolor: "#ffffff",
                                    borderRadius: 2,
                                    border: "1.5px solid",
                                    borderColor: tagData.name ? "#6366f1" : "#cbd5e1",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        borderColor: "#94a3b8",
                                    },
                                    "&:focus-within": {
                                        borderColor: "#6366f1",
                                        boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15)",
                                    },
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1, fontSize: "0.95rem" }}
                                    placeholder="新しいタグ名を入力（2〜10文字）"
                                    type="text"
                                    value={tagData.name ?? ""}
                                    onChange={(e) =>
                                        setTagData((data) => ({ ...data, name: e.target.value }))
                                    }
                                />
                                {tagData.color && tagData.name && (
                                    <Box
                                        sx={{
                                            bgcolor: tagData.color,
                                            color: "#fff",
                                            px: 1.5,
                                            py: 0.25,
                                            borderRadius: 1.5,
                                            fontSize: "0.75rem",
                                            fontWeight: "bold",
                                            mr: 1,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        #{tagData.name}
                                    </Box>
                                )}
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton
                                    color="primary"
                                    sx={{
                                        p: "8px",
                                        color: "#6366f1",
                                        "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" },
                                    }}
                                    onClick={handleUpdateTag}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </IconButton>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditTagDialog
