import RootContext from "@/Contexts/RootContext"
import { PaymentPaginate, PaymentParams, PaymentRequest } from "@/types/payment"
import { usePage } from "@inertiajs/react"
import axios from "axios"
import { useCallback, useContext, useState } from "react"

const usePayment = () => {
    const user = usePage().props.auth.user
    const { SET_REFRESH, SET_TAG_REFRESH, SET_ALERT } = useContext(RootContext)
    const [paymentLoad, setPaymentLoad] = useState(false)
    const [payment, setPayment] = useState<PaymentPaginate | null>(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentData, setPaymentData] = useState<PaymentRequest>({
        id: 0,
        user_id: user.id,
        title: "",
        price: 0,
        payment_date: ""
    })
    const [paymentParams, setPaymentParams] = useState<PaymentParams>({
        page: 1,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        minPrice: null,
        maxPrice: null,
        tagId: null,
        keyword: "",
        startDate: "",
        endDate: "",
        searchType: null
    })

    ////////// 各ユーザーの帳簿データ全取得
    const getUserAllPayments = useCallback((params: PaymentParams) => {
        setPaymentLoad(true)
        axios.get(route("payments.get"), { params: params })
            .then((res) => {
                if (res.data.status === 200) {
                    const paymentPaginate: PaymentPaginate = res.data.paymentPaginate
                    const paymentTotalPrice: number = res.data.paymentTotalPrice
                    setPayment(paymentPaginate)
                    setTotalPrice(paymentTotalPrice)
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setPaymentLoad(false))
    }, [])

    ////////// 検索実行
    const handleSearchEvent = useCallback((searchParams: PaymentParams) => {
        setPaymentParams(searchParams)
    }, [])

    ////////// 検索フォーム初期化
    const handleSearchClearEvent = useCallback((paymentParams: PaymentParams) => {
        const type = paymentParams.searchType
        if (!type) return

        let prevYear = 0
        let prevMonth = 0
        if (type === "all") {
            prevYear = new Date().getFullYear()
            prevMonth = new Date().getMonth() + 1
        } else if (type === "filter") {
            prevYear = paymentParams.year!
            prevMonth = paymentParams.month!
        }
        setPaymentParams({
            page: 1,
            year: prevYear,
            month: prevMonth,
            minPrice: null,
            maxPrice: null,
            tagId: null,
            keyword: "",
            startDate: "",
            endDate: "",
            searchType: null
        })
    }, [])

    ////////// データ登録
    const addPaymentData = useCallback((data: PaymentRequest) => {
        setPaymentLoad(true)
        axios.post(route("payments.store"), data)
            .then((response) => {
                const resData = response.data
                if (resData.status === 200) {
                    SET_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "1件登録しました"})
                } else {
                    console.error(resData.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setPaymentLoad(false))
    }, [])

    ////////// データ更新
    const updatePaymentData = useCallback((data: PaymentRequest) => {
        setPaymentLoad(true)
        axios.patch(route("payments.update", data.id), data)
            .then((response) => {
                const resData = response.data
                if (resData.status === 200) {
                    SET_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "1件更新しました"})
                } else {
                    console.error(resData.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setPaymentLoad(false))
    }, [])

    ////////// データ削除
    const deletePaymentData = useCallback((idList: Array<number>) => {
        setPaymentLoad(true)
        const data = {idList}
        axios.post(route("payments.destroy"), data)
            .then((response) => {
                const resData = response.data
                if (resData.status === 200) {
                    SET_REFRESH((prev) => (prev + 1))
                    SET_ALERT({ open: true, type: "success", message: `${idList.length} 件削除しました` })
                } else if (resData.status === 400) {
                    SET_ALERT({ open: true, type: "warning", message: "ERROR：ページを更新してください" })
                } else  {
                    console.error(resData.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setPaymentLoad(false))
    }, [])

    ////////// 1つの帳簿データに複数のタグを付与
    const joinTags = useCallback((paymentId: number, tagIds: Array<number>) => {
        setPaymentLoad(true)
        const data = {tagIds}
        axios.post(route("payments.joinTags", paymentId), data)
            .then((response) => {
                const resData = response.data
                if (resData.status === 200) {
                    SET_TAG_REFRESH((prev) => (prev + 1))
                } else {
                    console.error(resData.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setPaymentLoad(false))
    }, [])


    return {
        paymentLoad,
        setPaymentLoad,
        payment,
        totalPrice,
        paymentData,
        setPaymentData,
        paymentParams,
        setPaymentParams,
        getUserAllPayments,
        handleSearchEvent,
        handleSearchClearEvent,
        addPaymentData,
        updatePaymentData,
        deletePaymentData,
        joinTags
    }
}

export default usePayment
