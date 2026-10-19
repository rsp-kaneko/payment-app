import { Tag } from "@/types/tag"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { FC } from "react"

type Props = {
    tag: Tag
    deleteTag: (id: number) => void
}

const TagCard: FC<Props> = (props) => {
    const {tag, deleteTag} = props

    const handleDeleteTag = () => {
        if (!confirm("タグを削除しますか？")) return
        deleteTag(tag.id)
    }

    return (
        <Card sx={{
            bgcolor: tag.color,
            height: 40,
            p: 0
        }}>
            <CardContent sx={{
                p: 0.5,
                pl: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography component="span" sx={{fontWeight: "bold", color: "#fff", fontSize: "0.9rem"}}>#{tag.name}</Typography>
                <IconButton onClick={handleDeleteTag} sx={{padding: 1}}><i className="fa-solid fa-trash fa-xs"></i></IconButton>
            </CardContent>
        </Card>
    )
}

export default TagCard
