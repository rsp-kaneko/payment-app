import { PaymentParams } from "@/types/payment"
import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react"
import CalendarButton from "./CalendarButton"

type Props = {
    display: string | object
    paymentParams: PaymentParams
    setPaymentParams: Dispatch<SetStateAction<PaymentParams>>
}

const CalendarItem: FC<Props> = (props) => {
    const {display, paymentParams, setPaymentParams} = props

    const handleMonthChange = (month: number) => {
        setPaymentParams((prev) => ({
            ...prev,
            page: 1,
            month: month
        }))
    }

    return (
        <Card sx={{
            minHeight: "100%",
            backgroundColor: paymentParams.searchType === "all" ? "#aaa" : "#1976d2",
            display: display
        }}>
            <CardContent>
                <Stack spacing={5}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        color: "#fff"
                    }}>
                        {paymentParams.searchType === "all" ? (
                            <Typography component="h1" sx={{ fontWeight: "bold", fontSize: "1.5em" }}>
                                全期間
                            </Typography>
                        ) : (
                            <>
                                <IconButton
                                    onClick={() => setPaymentParams((prev) => ({...prev, year: prev.year! - 1}))}
                                >
                                    <i className="fa-solid fa-angle-left" style={{color: "#fff"}}></i>
                                </IconButton>
                                <Typography component="h1" sx={{ fontWeight: "bold", fontSize: "1.5em" }}>
                                    {paymentParams.year} 年
                                </Typography>
                                <IconButton
                                    onClick={() => setPaymentParams((prev) => ({...prev, year: prev.year! + 1}))}
                                >
                                    <i className="fa-solid fa-angle-right" style={{color: "#fff"}}></i>
                                </IconButton>
                            </>
                        )}
                    </Box>
                    <Box>
                        <Grid container>
                            {[...Array(12)].map((_, index) => (
                                <Grid size={{ xs: 3 }} key={index}>
                                    <CalendarButton
                                        active={paymentParams.month === index + 1}
                                        disabled={paymentParams.searchType === "all"}
                                        onClick={() => handleMonthChange(index + 1)}
                                    >
                                        {index + 1} 月
                                    </CalendarButton>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CalendarItem
