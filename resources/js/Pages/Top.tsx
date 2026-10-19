import PaymentHistoryContent from "@/Components/MainContents/PaymentHistoryContent";
import PaymentStatusContent from "@/Components/MainContents/PaymentStatusContent";
import { Stack } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import PaginationContent from "@/Components/MainContents/PaginationContent";
import usePayment from "@/Hooks/usePayment";
import RootContext from "@/Contexts/RootContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TagHistoryContent from "@/Components/TagContents/TagHistoryContent";
import useTag from "@/Hooks/useTag";

const Top: FC = () => {
    const {
        paymentLoad,
        payment,
        totalPrice,
        paymentParams,
        setPaymentParams,
        getUserAllPayments,
        handleSearchEvent,
        handleSearchClearEvent,
    } = usePayment()

    const {getAllTags, monthlyTagDataList, getMonthlyPaymentTagList} = useTag()

    const { REFRESH, OPEN_TAG, TAG_REFRESH } = useContext(RootContext)
    const [deleteIdList, setDeleteIdList] = useState<Array<number>>([])

    useEffect(() => {
        getUserAllPayments(paymentParams)
        setDeleteIdList([])
    }, [paymentParams, REFRESH, OPEN_TAG])

    useEffect(() => {
        getAllTags()
        getMonthlyPaymentTagList({
            year: paymentParams.year,
            month: paymentParams.month
        })
    }, [TAG_REFRESH, paymentParams.year, paymentParams.month, OPEN_TAG])

    return (
        <AuthenticatedLayout
            pageTitle={paymentParams.year+"年"+paymentParams.month+"月のデータ"}
            paymentParams={paymentParams}
            loading={paymentLoad}
            handleSearchEvent={handleSearchEvent}
        >
            <Stack spacing={{ xs: 2, xl: 3 }}>
                <PaymentStatusContent
                    paymentParams={paymentParams}
                    setPaymentParams={setPaymentParams}
                    totalPrice={totalPrice}
                />
                {OPEN_TAG ? (
                    <TagHistoryContent
                        year={paymentParams.year}
                        month={paymentParams.month}
                    />
                ) : (
                    <>
                        <PaginationContent
                            currentPage={paymentParams.page!}
                            payment={payment}
                            paymentParams={paymentParams}
                            setPaymentParams={setPaymentParams}
                            handleSearchEvent={handleSearchEvent}
                            handleSearchClearEvent={handleSearchClearEvent}
                        />
                        <PaymentHistoryContent
                            paymentPaginate={payment}
                            deleteIdList={deleteIdList}
                            setDeleteIdList={setDeleteIdList}
                            monthlyTagDataList={monthlyTagDataList}
                        />
                    </>
                )}
            </Stack>
        </AuthenticatedLayout>
    )
}

export default Top
