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
            bgcolor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: display
        }}>
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Stack spacing={2.5}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#f8fafc",
                        p: 1,
                        px: 1.5,
                        borderRadius: 1.5,
                        border: "1px solid #f1f5f9"
                    }}>
                        {paymentParams.searchType === "all" ? (
                            <Typography sx={{ fontWeight: "bold", fontSize: "1.05rem", color: "#64748b", mx: "auto", py: 0.5 }}>
                                全期間表示中
                            </Typography>
                        ) : (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={() => setPaymentParams((prev) => ({...prev, year: prev.year! - 1}))}
                                    sx={{ color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#1976d2" } }}
                                >
                                    <i className="fa-solid fa-angle-left"></i>
                                </IconButton>
                                <Typography sx={{ fontWeight: "bold", fontSize: "1.15rem", color: "#1e293b" }}>
                                    <i className="fa-solid fa-calendar-days mr-1" style={{color: "#07f"}}></i>
                                    現在の期間：
                                    {paymentParams.year} 年
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => setPaymentParams((prev) => ({...prev, year: prev.year! + 1}))}
                                    sx={{ color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#1976d2" } }}
                                >
                                    <i className="fa-solid fa-angle-right"></i>
                                </IconButton>
                            </>
                        )}
                    </Box>
                    <Box>
                        <Grid container spacing={1}>
                            {[...Array(12)].map((_, index) => (
                                <Grid size={{ xs: 3 }} key={index}>
                                    <CalendarButton
                                        active={paymentParams.month === index + 1}
                                        disabled={paymentParams.searchType === "all"}
                                        onClick={() => handleMonthChange(index + 1)}
                                    >
                                        {index + 1}月
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
