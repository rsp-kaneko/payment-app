import RootContext from "@/Contexts/RootContext";
import { Alert, Snackbar } from "@mui/material";
import { FC, useContext } from "react";

const AlertSnackbar: FC = () => {
    const {ALERT, SET_ALERT} = useContext(RootContext)

    const onClose = () => SET_ALERT({...ALERT, open: false})

    return (
        <Snackbar
            open={ALERT.open}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2500}
        >
            <Alert
                severity={ALERT.type}
                variant="filled"
                onClose={onClose}
                sx={{width: "100%", whiteSpace: "pre-wrap"}}
            >
                {ALERT.message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar
