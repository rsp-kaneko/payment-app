import usePayment from "@/Hooks/usePayment";
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
    deleteIdList: Array<number>
    setDeleteIdList: Dispatch<SetStateAction<Array<number>>>
}

const DeletePaymentCard: FC<Props> = (props) => {
    const { deleteIdList, setDeleteIdList } = props

    const { paymentLoad, deletePaymentData } = usePayment()
    const [openDialog, setOpenDialog] = useState(false)

    const handleClearDeleteId = () => setDeleteIdList([])
    const handleDeletePayment = () => {
        deletePaymentData(deleteIdList)
    }
    const onCloseDialog = () => setOpenDialog(false)

    const ConfirmDialog: FC = () => {
        return (
            <Dialog open={openDialog} fullWidth>
                <DialogTitle>{deleteIdList.length} 件削除しますか？</DialogTitle>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={onCloseDialog}>キャンセル</Button>
                    <Button variant="contained" color="error" loading={paymentLoad} onClick={handleDeletePayment}>削除</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Card sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#777",
                zIndex: 10
            }}>
                <CardContent sx={{
                    display: "flex",
                    justifyContent: {xs: "space-between", md: "center"},
                    gap: 2,
                    alignItems: "center",
                    color: "#fff",
                }}>
                    <Box>
                        <Typography component="span" sx={{mr: 2}}>{deleteIdList.length} 件選択</Typography>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={handleClearDeleteId}
                        >
                            キャンセル
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenDialog(true)}
                        >
                            削除
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <ConfirmDialog />
        </>
    )
}

export default DeletePaymentCard
