import { PaymentParams } from "@/types/payment"
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction, useState } from "react"
import CalendarItem from "./CalendarItem"

type Props = {
    paymentParams: PaymentParams
    setPaymentParams: Dispatch<SetStateAction<PaymentParams>>
}

const PaymentCalendarCard: FC<Props> = (props) => {
    const { paymentParams, setPaymentParams } = props

    const [openDialog, setOpenDialog] = useState(false)

    const onCloseDialog = () => setOpenDialog(false)

    return (
        <>
            {/* PC XL SIZE STYLE */}
            <CalendarItem
                display={{xs: "none", xl: "block"}}
                paymentParams={paymentParams}
                setPaymentParams={setPaymentParams}
            />

            {/* MOBILE STYLE */}
            <Card sx={{ display: {xs: "block", xl: "none"} }}>
                <CardContent>
                    <Button
                        variant="contained"
                        disabled={paymentParams.searchType === "all"}
                        onClick={() => setOpenDialog(true)}
                        fullWidth
                    >
                        <Box>
                            <i className="fa-solid fa-calendar-days mr-3"></i>
                            年月指定
                        </Box>
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={openDialog}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography component="span" sx={{ fontWeight: "bold" }}>年月指定</Typography>
                    <IconButton onClick={onCloseDialog}>
                        <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CalendarItem
                        display="block"
                        paymentParams={paymentParams}
                        setPaymentParams={setPaymentParams}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PaymentCalendarCard
