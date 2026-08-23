import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = {
    title: ReactNode
    subTitle?: string
    children: ReactNode
}

const ProfileCard: FC<Props> = (props) => {
    const {title, subTitle = "", children} = props

    return (
        <Card>
            <CardHeader
                title={
                    <Typography component="p" sx={{color: "#fff", fontSize: "1.1rem"}}>{title}</Typography>
                }
                subheader={
                    <Typography component="p" sx={{color: "#ccc", fontSize: "0.9rem"}}>{subTitle}</Typography>
                }
                sx={{
                    bgcolor: "#113f6eff"
                }}
            />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default ProfileCard
