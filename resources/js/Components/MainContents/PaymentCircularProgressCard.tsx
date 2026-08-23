import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material"
import { FC, useMemo, useState } from "react"
import AddPaymentFormDialog from "./AddPaymentFormDialog"
import { PaymentParams } from "@/types/payment"
import { usePage } from "@inertiajs/react"

type Props = {
    totalPrice: number
    paymentParams: PaymentParams
}

const PaymentCircularProgressCard: FC<Props> = (props) => {
    const { totalPrice, paymentParams } = props
    const user = usePage().props.auth.user

    const [openAddDialog, setOpenAddDialog] = useState(false)

    const onCloseAddDialog = () => setOpenAddDialog(false)

    const totalPercent = useMemo(() => {
        const percent = Math.floor((100 / user.max_total_price) * totalPrice)
        return percent < 100 ? percent : 100
    }, [totalPrice])

    const percentColor = useMemo(() => {
        if (totalPercent >= 75) {
            return "error"
        } else if (totalPercent >= 50) {
            return "warning"
        } else if (totalPercent >= 25) {
            return "primary"
        } else {
            return "success"
        }
    }, [totalPercent])

    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    py: 2,
                    flexDirection: { xs: "column", lg: "row" }
                }}>

                    {/* Circular Progress Status */}
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                        <CircularProgress
                            enableTrackSlot
                            variant="determinate"
                            value={totalPercent}
                            color={percentColor}
                            size={220}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Box sx={{textAlign: "center"}}>
                                <Typography component="h1" sx={{ fontWeight: "bold", fontSize: "1.5em" }}>
                                    ￥ {Number(totalPrice).toLocaleString("ja-JP")} 円
                                </Typography>
                                <Typography component="p">
                                    最大 ￥ {Number(user.max_total_price).toLocaleString("ja-JP")} 円
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* 年月＆消費割合 追加ボタン */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography component="h1" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                            {paymentParams.searchType === "all"
                                ? "検索結果のデータ"
                                : `${paymentParams.year}年 ${paymentParams.month}月のデータ`
                            }
                        </Typography>
                        <Typography component="p">
                            <Typography component="span" color={percentColor} sx={{ fontSize: "1.4em", fontWeight: "bold" }}>
                                {totalPercent}%
                            </Typography>
                            ／100% 消費
                        </Typography>
                        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => setOpenAddDialog(true)}>
                            <Box>
                                <i className="fa-solid fa-plus mr-3"></i>
                                追加
                            </Box>
                        </Button>
                    </Box>

                </Box>
            </CardContent>

            <AddPaymentFormDialog
                open={openAddDialog}
                onClose={onCloseAddDialog}
            />
        </Card>
    )
}

export default PaymentCircularProgressCard
