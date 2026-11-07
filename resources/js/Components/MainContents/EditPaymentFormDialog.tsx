import RootContext from "@/Contexts/RootContext";
import usePayment from "@/Hooks/usePayment";
import { Payment } from "@/types/payment";
import { Button, DialogActions, Divider } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import CustomDialog from "../Dialogs/CustomDialog";
import FormItem from "../TextItem/FormItem";
import CustomDialogContent from "../Dialogs/CustomDialogContent";

type Props = {
    payment: Payment
    open: boolean
    onClose: () => void
}

const EditPaymentFormDialog: FC<Props> = (props) => {
    const { payment, open, onClose } = props

    const { SET_ALERT } = useContext(RootContext)
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
        <CustomDialog
            open={open}
            onClose={onClose}
            title="データ更新"
            subTitle="支払いデータの編集機能"
            icon={<i className="fa-solid fa-piggy-bank"></i>}
            color="#070"
        >
            <CustomDialogContent>
                <FormItem
                    type="text"
                    label="タイトル"
                    icon={<i className="fa-regular fa-file-lines"></i>}
                    value={paymentData.title}
                    onChange={(e) => setPaymentData((prev) => ({...prev, title: e.target.value}))}
                />

                <FormItem
                    type="number"
                    label="金額"
                    icon={<i className="fa-solid fa-yen-sign"></i>}
                    value={paymentData.price || ""}
                    onChange={(e) => setPaymentData((prev) => ({...prev, price: Number(e.target.value)}))}
                />

                <FormItem
                    type="date"
                    label="支払い日"
                    icon={<i className="fa-solid fa-calendar-days"></i>}
                    value={paymentData.payment_date}
                    onChange={(e) => setPaymentData((prev) => ({...prev, payment_date: e.target.value}))}
                />
            </CustomDialogContent>
            <Divider />
            <DialogActions>
                <Button
                    variant="contained"
                    color="success"
                    loading={paymentLoad}
                    onClick={handleEditPaymentData}
                >
                    <i className="fa-solid fa-paper-plane mr-3"></i>
                    更新
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDataReset}
                >
                    <i className="fa-solid fa-eraser mr-3"></i>
                    リセット
                </Button>
            </DialogActions>
        </CustomDialog>
    )
}

export default EditPaymentFormDialog
