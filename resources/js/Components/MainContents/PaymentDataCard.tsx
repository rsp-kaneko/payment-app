import { Box, Button, Card, CardContent, Checkbox, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Payment } from "@/types/payment";
import EditPaymentFormDialog from "./EditPaymentFormDialog";
import { MonthlyPaymentTagList } from "@/types/tag";
import AddTagsDialog from "./AddTagsDialog";
import TagLabel from "./TagLabel";
import ShowReceiptDialog from "./ShowReceiptDialog";
import { ReceiptData } from "@/types/receipt";

type Props = {
    payment: Payment | null
    deleteIdList: Array<number>
    setDeleteIdList: Dispatch<SetStateAction<Array<number>>>
    monthlyTagDataList: Array<MonthlyPaymentTagList>
}

const PaymentDataCard: FC<Props> = (props) => {
    const { payment, deleteIdList, setDeleteIdList, monthlyTagDataList } = props

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openTagDialog, setOpenTagDialog] = useState(false)
    const [openShowReceiptDialog, setOpenShowReceiptDialog] = useState(false)
    const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null)

    const handleOpenReceiptDialog = (receipt: ReceiptData | null) => {
        setSelectedReceipt(receipt)
        setOpenShowReceiptDialog(true)
    }

    const checked = useMemo(() => deleteIdList.includes(payment!.id), [deleteIdList])
    const targetTagData: MonthlyPaymentTagList | null = useMemo(() =>
        monthlyTagDataList.find((data) => data.payment_id === payment?.id) ?? null
    , [monthlyTagDataList, payment])
    // レシートデータが実際に存在するか安全に判定
    const hasReceipt = useMemo(() => {
        if (!payment?.receipt) return false
        if (Array.isArray(payment.receipt)) return payment.receipt.length > 0
        if (typeof payment.receipt === 'object') return Object.keys(payment.receipt).length > 0
        return false
    }, [payment?.receipt])

    return (
        <>
            <Card sx={{
                transition: "all 0.2s ease-in-out",
                border: checked ? "1px solid #ef4444" : (hasReceipt ? "1px solid #7dd3fc" : "1px solid #aaa"),
                borderLeft: hasReceipt ? "4px solid #0284c7" : (checked ? "4px solid #ef4444" : "4px solid #aaa"),
                bgcolor: checked ? "#fff1f2" : "#ffffff",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                },
            }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    {/* 上部: タグ一覧 & レシートバッジ & 日付 */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, flexWrap: "wrap", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexWrap: "wrap" }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenTagDialog(true)}
                                sx={{
                                    fontSize: "0.75rem",
                                    py: 0.2,
                                    px: 1,
                                    minWidth: 0,
                                    borderRadius: 1,
                                    borderColor: "#cbd5e1",
                                    color: "text.secondary",
                                    textTransform: "none",
                                }}
                            >
                                <i className="fa-solid fa-tag mr-1" style={{ fontSize: "0.7rem" }}></i>タグ
                            </Button>
                            {targetTagData?.tag_id_list.map((tagId) => (
                                <TagLabel key={tagId} tagId={tagId} />
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
                            {hasReceipt && (
                                <Box sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    bgcolor: "#e0f2fe",
                                    color: "#0369a1",
                                    px: 1,
                                    py: 0.2,
                                    borderRadius: 1,
                                    fontSize: "0.75rem",
                                    fontWeight: "bold"
                                }}>
                                    <i className="fa-solid fa-receipt"></i>
                                    レシート有
                                </Box>
                            )}
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
                                <i className="fa-solid fa-calendar-days"></i>
                                {payment?.payment_date}
                            </Typography>
                        </Box>
                    </Box>

                    {/* 中央: チェックボックス & タイトル & 金額 */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
                        <Checkbox
                            id={"payment-delete-" + payment?.id}
                            value={payment?.id}
                            checked={checked}
                            onChange={(e) =>
                                e.target.checked
                                    ? setDeleteIdList((prev) => ([...prev, Number(e.target.value)]))
                                    : setDeleteIdList((prev) => (prev.filter((id) => id !== Number(e.target.value))))
                            }
                            sx={{ p: 0.5 }}
                        />
                        <Typography
                            component="label"
                            htmlFor={"payment-delete-" + payment?.id}
                            sx={{
                                cursor: "pointer",
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1
                            }}
                        >
                            <Box sx={{ fontWeight: 600, fontSize: "1.05rem", color: "#1e293b", wordBreak: "break-all" }}>
                                {payment?.title}
                            </Box>
                            <Box sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#e11d48", whiteSpace: "nowrap" }}>
                                ¥ {Number(payment?.price).toLocaleString("ja-JP")}
                            </Box>
                        </Typography>
                    </Box>

                    {/* 下部: 操作ボタン */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, mt: 1.5, pt: 1, borderTop: "1px dashed #f1f5f9" }}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            sx={{ borderRadius: 1, fontSize: "0.8rem", px: 1.5 }}
                            onClick={() => setOpenEditDialog(true)}
                            startIcon={<i className="fa-solid fa-pen-to-square"></i>}
                        >
                            更新
                        </Button>
                        {hasReceipt && (
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: 1,
                                    fontSize: "0.8rem",
                                    px: 1.5,
                                    bgcolor: "#0284c7",
                                    "&:hover": { bgcolor: "#0369a1" }
                                }}
                                onClick={() => handleOpenReceiptDialog(payment?.receipt!)}
                                startIcon={<i className="fa-solid fa-receipt"></i>}
                            >
                                レシート詳細
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <EditPaymentFormDialog
                payment={payment!}
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
            />

            <AddTagsDialog
                open={openTagDialog}
                onClose={() => setOpenTagDialog(false)}
                paymentId={payment!.id}
                targetTagData={targetTagData}
            />

            <ShowReceiptDialog
                open={openShowReceiptDialog}
                onClose={() => {
                    setSelectedReceipt(null)
                    setOpenShowReceiptDialog(false)
                }}
                receipt={selectedReceipt}
            />
        </>
    )
}

export default PaymentDataCard
