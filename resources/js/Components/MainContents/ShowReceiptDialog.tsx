import { ReceiptData, ReceiptItem } from "@/types/receipt"
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import { FC, useMemo } from "react"

type Props = {
    open: boolean
    onClose: () => void
    receipt: any
}

const ShowReceiptDialog: FC<Props> = ({
    open,
    onClose,
    receipt
}) => {
    // itemsがJSON文字列の場合と配列の場合の双方に安全に対応
    const items: ReceiptItem[] = useMemo(() => {
        if (!receipt || !receipt.items) return []
        if (typeof receipt.items === "string") {
            try {
                return JSON.parse(receipt.items)
            } catch (e) {
                console.error("Failed to parse receipt items", e)
                return []
            }
        }
        return Array.isArray(receipt.items) ? receipt.items : []
    }, [receipt])

    // 合計金額の算出（プロパティが存在しない場合は品目から合算）
    const totalAmount = useMemo(() => {
        if (receipt?.totalAmount) return Number(receipt.totalAmount)
        return items.reduce((sum, item) => sum + (Number(item.price) * (item.quantity ?? 1)), 0)
    }, [receipt, items])

    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5, borderBottom: "1px solid #e2e8f0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <i className="fa-solid fa-receipt" style={{ color: "#1976d2" }}></i>
                    <Typography component="span" sx={{ fontWeight: "bold", fontSize: 18 }}>レシート詳細データ</Typography>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5 }}>
                {receipt && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* 店舗名・日付・合計金額のサマリー */}
                        <Card variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    {receipt.shopName && (
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {receipt.shopName}
                                        </Typography>
                                    )}
                                    {receipt.date && (
                                        <Typography variant="caption" color="text.secondary">
                                            購入日: {receipt.date}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" color="text.secondary">
                                        品目数: {items.length}件
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "right", bgcolor: "#ecfdf5", px: 2, py: 1, borderRadius: 1.5, border: "1px solid #a7f3d0" }}>
                                    <Typography variant="caption" color="success.dark" sx={{ fontWeight: "bold", display: "block" }}>
                                        合計金額
                                    </Typography>
                                    <Typography variant="h6" color="success.dark" sx={{ fontWeight: "bold" }}>
                                        ¥{totalAmount.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                        {/* 品目一覧テーブル */}
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                            品目明細
                        </Typography>

                        {items.length > 0 ? (
                            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 320, overflowY: "auto" }}>
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>品名</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>単価</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>数量</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>小計</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map((item, index) => {
                                            const qty = item.quantity ?? 1
                                            const subtotal = Number(item.price) * qty
                                            return (
                                                <TableRow key={index} hover>
                                                    <TableCell component="th" scope="row">{item.name}</TableCell>
                                                    <TableCell align="right">¥{Number(item.price).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{qty}</TableCell>
                                                    <TableCell align="right">¥{subtotal.toLocaleString()}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>合計</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                                ¥{totalAmount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box sx={{ p: 4, textAlign: "center", color: "text.secondary", bgcolor: "#f8fafc", borderRadius: 1 }}>
                                品目データがありません
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 1.5, borderTop: "1px solid #e0e0e0" }}>
                <Button onClick={onClose} variant="contained" color="inherit">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowReceiptDialog

