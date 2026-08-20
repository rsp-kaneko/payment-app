import RootContext from "@/Contexts/RootContext";
import usePayment from "@/Hooks/usePayment";
import { Payment } from "@/types/payment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Input, InputLabel, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";

type Props = {
    payment: Payment
    open: boolean
    onClose: () => void
}

const EditPaymentFormDialog: FC<Props> = (props) => {
    const { payment, open, onClose } = props

    const { REFRESH, SET_ALERT } = useContext(RootContext)
    const {
        paymentLoad,
        paymentData,
        setPaymentData,
        updatePaymentData
    } = usePayment()

    useEffect(() => {
        setPaymentData({
            id: payment.id,
            title: payment.title,
            price: payment.price,
            payment_date: payment.payment_date
        })
    }, [])

    const handleEditPaymentData = () => {
        if (paymentData.title === "") {
            SET_ALERT({ open: true, type: "error", message: "タイトルは必須です" })
            return
        } else if (paymentData.price! < 1) {
            SET_ALERT({ open: true, type: "error", message: "最低￥1円以上" })
            return
        } else if (paymentData.payment_date === "") {
            SET_ALERT({ open: true, type: "error", message: "日付は必須です" })
            return
        }
        updatePaymentData(paymentData)
    }

    const handleDataReset = () => {
        setPaymentData({
            id: payment.id,
            title: payment.title,
            price: payment.price,
            payment_date: payment.payment_date
        })
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>データ更新</Typography>
                <IconButton onClick={onClose}>
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <FormControl variant="standard">
                        <InputLabel>タイトル</InputLabel>
                        <Input
                            type="text"
                            value={paymentData.title}
                            startAdornment={
                                <i className="fa-regular fa-file-lines mr-3"></i>
                            }
                            onChange={(e) =>
                                setPaymentData((prev) => ({...prev, title: e.target.value}))
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel>金額</InputLabel>
                        <Input
                            type="text"
                            value={paymentData.price! > 0 ? paymentData.price : 0}
                            startAdornment={
                                <i className="fa-solid fa-yen-sign mr-3"></i>
                            }
                            onChange={(e) =>
                                setPaymentData((prev) => ({...prev, price: Number(e.target.value)}))
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel>支払い日</InputLabel>
                        <Input
                            type="date"
                            value={paymentData.payment_date}
                            startAdornment={
                                <i className="fa-solid fa-calendar-days mr-3"></i>
                            }
                            onChange={(e) =>
                                setPaymentData((prev) => ({...prev, payment_date: e.target.value}))
                            }
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDataReset}
                >
                    <i className="fa-solid fa-eraser mr-3"></i>
                    リセット
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    loading={paymentLoad}
                    onClick={handleEditPaymentData}
                >
                    <i className="fa-solid fa-paper-plane mr-3"></i>
                    更新
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPaymentFormDialog
