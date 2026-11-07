import RootContext from "@/Contexts/RootContext";
import usePayment from "@/Hooks/usePayment";
import { Button, DialogActions, Divider } from "@mui/material";
import { FC, useContext } from "react";
import CustomDialog from "../Dialogs/CustomDialog";
import FormItem from "../TextItem/FormItem";
import CustomDialogContent from "../Dialogs/CustomDialogContent";

type Props = {
    open: boolean
    onClose: () => void
}

const AddPaymentFormDialog: FC<Props> = (props) => {
    const { open, onClose } = props

    const { SET_ALERT } = useContext(RootContext)
    const {
        paymentLoad,
        paymentData,
        setPaymentData,
        addPaymentData
    } = usePayment()

    const handleAddPaymentData = () => {
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
        addPaymentData(paymentData)
        handleDataClear()
    }

    const handleDataClear = () => {
        setPaymentData({
            id: 0,
            title: "",
            price: 0,
            payment_date: ""
        })
    }

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title="データ登録"
            subTitle="支払いデータの手動登録"
            icon={<i className="fa-solid fa-piggy-bank"></i>}
            color="#05f"
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
                    loading={paymentLoad}
                    onClick={handleAddPaymentData}
                >
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    登録
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDataClear}
                >
                    <i className="fa-solid fa-eraser mr-2"></i>
                    クリア
                </Button>
            </DialogActions>
        </CustomDialog>
    )
}

export default AddPaymentFormDialog
