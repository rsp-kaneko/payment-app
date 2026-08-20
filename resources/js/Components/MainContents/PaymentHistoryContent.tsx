import { Box, Grid } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import PaymentDataCard from "./PaymentDataCard";
import { PaymentPaginate } from "@/types/payment";
import DeletePaymentCard from "./DeletePaymentCard";
import { MonthlyPaymentTagList } from "@/types/tag";

type Props = {
    paymentPaginate: PaymentPaginate | null
    deleteIdList: Array<number>
    setDeleteIdList: Dispatch<SetStateAction<Array<number>>>
    monthlyTagDataList: Array<MonthlyPaymentTagList>
}

const PaymentHistoryContent: FC<Props> = (props) => {
    const { paymentPaginate, deleteIdList, setDeleteIdList, monthlyTagDataList } = props

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    {paymentPaginate && paymentPaginate.data.map((payment) => (
                        <Grid size={{ xs: 12, lg: 6 }} key={payment.id}>
                            <PaymentDataCard
                                payment={payment}
                                deleteIdList={deleteIdList}
                                setDeleteIdList={setDeleteIdList}
                                monthlyTagDataList={monthlyTagDataList}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {deleteIdList.length > 0 && (
                <DeletePaymentCard
                    deleteIdList={deleteIdList}
                    setDeleteIdList={setDeleteIdList}
                />
            )}
        </>
    )
}

export default PaymentHistoryContent
