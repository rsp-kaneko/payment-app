import RootContext from "@/Contexts/RootContext"
import { usePage } from "@inertiajs/react"
import { Box, IconButton, Typography } from "@mui/material"
import { FC, useContext, useState } from "react"

type Props = {

}

const MainHeader: FC<Props> = (props) => {
    const {} = props

    const user = usePage().props.auth.user
    const {SET_OPEN_ASIDE} = useContext(RootContext)
    const [currentDate, setCurrentDate] = useState("")

    setInterval(() => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const day = String(now.getDate()).padStart(2, "0")
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        const seconds = String(now.getSeconds()).padStart(2, "0")
        const formatDate = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
        setCurrentDate(formatDate)
    }, 1000)


    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "inherit",
            px: 2
        }}>
            <IconButton onClick={() => SET_OPEN_ASIDE(true)} sx={{display: {xs: "block", md: "none"}, color: "#1976d2"}}>
                <i className="fa-solid fa-bars"></i>
            </IconButton>
            <Box sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"},
                justifyContent: {xs: "center", md: "end"},
                alignItems: {xs: "end", md: "center"},
                height: "inherit",
                marginLeft: "auto",
                gap: {xs: 0, md: 2},
            }}>
                <Typography component="span" sx={{fontWeight: "bold"}}>
                    <i className="fa-solid fa-user-check mr-1 fa-lg" style={{color: "#4caf50"}}></i>
                    {user.name}様
                </Typography>
                <Typography component="span">
                    {currentDate}
                </Typography>
            </Box>
        </Box>
    )
}

export default MainHeader
