import { PaymentParams } from "@/types/payment";
import { Grid } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import PaymentCircularProgressCard from "./PaymentCircularProgressCard";
import PaymentCalendarCard from "./PaymentCalendarCard";

type Props = {
    paymentParams: PaymentParams
    setPaymentParams: Dispatch<SetStateAction<PaymentParams>>
    totalPrice: number
}

const PaymentStatusContent: FC<Props>= (props) => {
    const { paymentParams, setPaymentParams, totalPrice } = props

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, xl: 6 }}>
                <PaymentCircularProgressCard
                    totalPrice={totalPrice}
                    paymentParams={paymentParams}
                />
            </Grid>
            <Grid size={{ xs: 12, xl: 6 }} >
                <PaymentCalendarCard
                    paymentParams={paymentParams}
                    setPaymentParams={setPaymentParams}
                />
            </Grid>
        </Grid>
    )
}

export default PaymentStatusContent
