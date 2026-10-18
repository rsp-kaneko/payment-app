import { PaymentParams } from "@/types/payment"
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
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
                display={{ xs: "none", xl: "block" }}
                paymentParams={paymentParams}
                setPaymentParams={setPaymentParams}
            />

            {/* MOBILE / TABLET STYLE */}
            <Card sx={{
                display: { xs: "block", xl: "none" },
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid #e2e8f0",
            }}>
                <CardContent sx={{
                    p: 2.5,
                    "&:last-child": { pb: 2.5 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    gap: 2
                }}>
                    {/* 期間の表示情報 */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1.5,
                                bgcolor: "#eff6ff",
                                color: "#1976d2",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18
                            }}>
                                <i className="fa-solid fa-calendar-days"></i>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1 }}>
                                    現在の表示期間
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e293b", mt: 0.3 }}>
                                    {paymentParams.searchType === "all" ? "全期間" : `${paymentParams.year}年 ${paymentParams.month}月`}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            bgcolor: paymentParams.searchType === "all" ? "#f1f5f9" : "#eff6ff",
                            color: paymentParams.searchType === "all" ? "#64748b" : "#1976d2",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                        }}>
                            {paymentParams.searchType === "all" ? "全件表示中" : "月別集計"}
                        </Box>
                    </Box>

                    {/* モーダル起動ボタン */}
                    <Button
                        variant="contained"
                        disabled={paymentParams.searchType === "all"}
                        onClick={() => setOpenDialog(true)}
                        fullWidth
                        startIcon={<i className="fa-solid fa-calendar-check"></i>}
                        sx={{
                            borderRadius: 1.5,
                            py: 1.2,
                            fontWeight: "bold",
                            boxShadow: "none",
                            "&:hover": { boxShadow: "0 2px 8px rgba(25, 118, 210, 0.25)" }
                        }}
                    >
                        年月を変更する
                    </Button>
                </CardContent>
            </Card>

            {/* 年月指定ダイアログ */}
            <Dialog
                open={openDialog}
                onClose={onCloseDialog}
                fullWidth
                maxWidth="xs"
                slotProps={{
                    paper: {
                        sx: { borderRadius: 2 }
                    }
                }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5, borderBottom: "1px solid #e2e8f0" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <i className="fa-solid fa-calendar-days" style={{ color: "#1976d2" }}></i>
                        <Typography component="span" sx={{ fontWeight: "bold", fontSize: 18 }}>年月指定</Typography>
                    </Box>
                    <IconButton onClick={onCloseDialog} size="small">
                        <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 2, pt: 2.5 }}>
                    <CalendarItem
                        display="block"
                        paymentParams={paymentParams}
                        setPaymentParams={setPaymentParams}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 2.5, py: 1.5, borderTop: "1px solid #e0e0e0" }}>
                    <Button onClick={onCloseDialog} variant="contained" fullWidth sx={{ borderRadius: 1 }}>
                        完了
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PaymentCalendarCard

