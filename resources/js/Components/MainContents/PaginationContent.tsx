import { PaymentPaginate, PaymentParams } from "@/types/payment";
import { Box, Button, Card, CardContent, Pagination, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import FilterFormDialog from "./FilterFormDialog";

type Props = {
    currentPage: number
    payment: PaymentPaginate | null
    paymentParams: PaymentParams
    setPaymentParams: Dispatch<SetStateAction<PaymentParams>>
    handleSearchEvent: (props: PaymentParams) => void
    handleSearchClearEvent: (props: PaymentParams) => void
}

const PaginationContent: FC<Props> = (props) => {
    const { currentPage, payment, paymentParams, setPaymentParams, handleSearchEvent, handleSearchClearEvent } = props

    const [openSearchDialog, setOpenSearchDialog] = useState(false)

    const onCloseSearchDialog = () => setOpenSearchDialog(false)

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPaymentParams(prev => ({ ...prev, page: value }))
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        flexDirection: {xs: "column", md: "row"}
                    }}>
                        <Box>
                            {paymentParams.searchType && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={() => handleSearchClearEvent(paymentParams)}
                                >
                                    <i className="fa-solid fa-ban mr-3"></i>
                                    {paymentParams.searchType === "all" && "全検索解除"}
                                    {paymentParams.searchType === "filter" && "フィルター解除"}
                                </Button>
                            )}
                            <Button
                                disabled={paymentParams.searchType === "all"}
                                onClick={() => setOpenSearchDialog(true)}
                            >
                                <Box sx={{fontWeight: "bold"}}>
                                    <i className="fa-solid fa-filter"></i>
                                    フィルター
                                </Box>
                            </Button>
                        </Box>
                        <Box>
                            {payment?.total !== 0 && (
                                <Typography component="span">{payment?.from}～{payment?.to}件表示／</Typography>
                            )}
                            <Typography component="span">全{payment?.total}件</Typography>
                        </Box>
                        <Pagination
                            size="small"
                            count={payment?.last_page}
                            page={currentPage}
                            color="primary"
                            onChange={handlePageChange}
                        />
                    </Box>
                </CardContent>
            </Card>

            <FilterFormDialog
                open={openSearchDialog}
                onClose={onCloseSearchDialog}
                paymentParams={paymentParams}
                handleSearchEvent={handleSearchEvent}
            />
        </>
    )
}

export default PaginationContent
