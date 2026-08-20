import { Box, Button, Card, CardContent, Checkbox, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Payment } from "@/types/payment";
import EditPaymentFormDialog from "./EditPaymentFormDialog";
import { MonthlyPaymentTagList } from "@/types/tag";
import AddTagsDialog from "./AddTagsDialog";
import TagLabel from "./TagLabel";

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

    const onCloseEditDialog = () => setOpenEditDialog(false)
    const onCloseTagDialog = () => setOpenTagDialog(false)

    const checked = useMemo(() => deleteIdList.includes(payment!.id), [deleteIdList])
    const targetTagData: MonthlyPaymentTagList | null = useMemo(() =>
        monthlyTagDataList.find((data) => data.payment_id === payment?.id) ?? null
    , [monthlyTagDataList, payment])

    return (
        <>
            <Card sx={{ position: "relative" }}>
                <CardContent>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start"
                    }}>
                        <Button variant="text" size="small" onClick={() => setOpenTagDialog(true)}>#タグ&raquo;</Button>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            {targetTagData?.tag_id_list.map((tagId) => (
                                <TagLabel key={tagId} tagId={tagId} />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: 1,
                        py: 1
                    }}>
                        <Checkbox
                            id={"payment-delete-"+payment?.id}
                            value={payment?.id}
                            checked={checked}
                            onChange={(e) =>
                                e.target.checked
                                    ? setDeleteIdList((prev) => ([...prev, Number(e.target.value)]))
                                    : setDeleteIdList((prev) => (prev.filter((id) => id !== Number(e.target.value))))
                            }
                        />
                        <Typography component="label" htmlFor={"payment-delete-"+payment?.id} sx={{ cursor: "pointer" }}>
                            <Box sx={{ fontWeight: "bold", wordBreak: "break-all" }}>{payment?.title}</Box>
                            <Box sx={{ fontWeight: "bold", color: "#f00" }}>￥ {Number(payment?.price).toLocaleString("ja-JP")}</Box>
                        </Typography>
                    </Box>

                    <Box sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                    }}>
                        <Typography component="span" sx={{ mr: 1, fontSize: "0.9em" }}>
                            <i className="fa-solid fa-calendar-days mr-1"></i>
                            {payment?.payment_date}
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            sx={{ borderRadius: 0 }}
                            onClick={() => setOpenEditDialog(true)}
                        >
                            <i className="fa-solid fa-pen-to-square mr-1"></i>
                            更新
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <EditPaymentFormDialog
                payment={payment!}
                open={openEditDialog}
                onClose={onCloseEditDialog}
            />

            <AddTagsDialog
                open={openTagDialog}
                onClose={onCloseTagDialog}
                paymentId={payment!.id}
                targetTagData={targetTagData}
            />
        </>
    )
}

export default PaymentDataCard
