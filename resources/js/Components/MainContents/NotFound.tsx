import { Box, Typography } from "@mui/material";
import { FC } from "react";

const NotFound: FC = () => {
    return (
        <Box sx={{
            textAlign: "center",
            mx: "auto",
            color: "#555",
            mt: 8
        }}>
            <i className="fa-solid fa-triangle-exclamation" style={{fontSize: "5rem"}}></i>
            <Typography component="p" sx={{fontWeight: "bold"}}>データがありません</Typography>
        </Box>
    )
}

export default NotFound
