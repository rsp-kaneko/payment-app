import RootContext from "@/Contexts/RootContext"
import { Tag } from "@/types/tag"
import { Card } from "@mui/material"
import { FC, useContext, useMemo } from "react"

type Props = {
    tagId: number
}

const TagLabel: FC<Props> = (props) => {
    const {tagId} = props
    const {TAGS} = useContext(RootContext)

    const targetTag: Tag | null = useMemo(() => TAGS.find((tag) => tag.id === tagId) ?? null, [TAGS])

    return (
        <Card sx={{
            backgroundColor: targetTag?.color,
            padding: "0 8px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "0.9rem"
        }}>
            #{targetTag?.name}
        </Card>
    )
}

export default TagLabel
