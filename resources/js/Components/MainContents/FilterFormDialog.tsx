import { PaymentParams } from "@/types/payment";
import { Button, DialogActions, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CustomDialog from "../Dialogs/CustomDialog";
import CustomDialogContent from "../Dialogs/CustomDialogContent";
import FormItem from "../TextItem/FormItem";
import BetweenFormItem from "../TextItem/BetweenFormItem";

type Props = {
    open: boolean
    onClose: () => void
    paymentParams: PaymentParams
    handleSearchEvent: (props: PaymentParams) => void
}

const FilterFormDialog: FC<Props> = (props) => {
    const { open, onClose, paymentParams, handleSearchEvent } = props

    const [searchParams, setSearchParams] = useState<PaymentParams>({
        page: 1,
        year: paymentParams.year,
        month: paymentParams.month,
        keyword: "",
        minPrice: 0,
        maxPrice: 0,
        searchType: "filter"
    })

    useEffect(() => {
        setSearchParams((prev) => ({
            ...prev,
            year: paymentParams.year,
            month: paymentParams.month
        }))
    }, [paymentParams.year, paymentParams.month])

    const handleSubmit = () => {
        handleSearchEvent({...searchParams, searchType: "filter"})
        onClose()
    }

    const handleSearchClear = () => {
        setSearchParams({
            keyword: "",
            minPrice: 0,
            maxPrice: 0
        })
    }

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title={"フィルター（"+paymentParams.year+"年"+paymentParams.month+"月）"}
            subTitle="タイトル、金額フィルター"
            icon={<i className="fa-solid fa-filter"></i>}
        >
            <CustomDialogContent>
                <FormItem
                    type="text"
                    label="タイトルを入力"
                    value={searchParams.keyword}
                    onChange={(e) =>
                        setSearchParams((prev) => ({...prev, keyword: e.target.value}))
                    }
                    icon={<i className="fa-regular fa-file-lines"></i>}
                />
                <BetweenFormItem
                    type="number"
                    sLabel="最小金額"
                    sIcon={<i className="fa-solid fa-yen-sign"></i>}
                    sValue={searchParams.minPrice || ""}
                    sOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, minPrice: Number(e.target.value)}))
                    }
                    eLabel="最大金額"
                    eIcon={<i className="fa-solid fa-yen-sign"></i>}
                    eValue={searchParams.maxPrice || ""}
                    eOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, maxPrice: Number(e.target.value)}))
                    }
                />
            </CustomDialogContent>
            <Divider />
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    <i className="fa-solid fa-paper-plane mr-3"></i>
                    実行
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleSearchClear}
                >
                    <i className="fa-solid fa-eraser mr-3"></i>
                    クリア
                </Button>
            </DialogActions>
        </CustomDialog>
    )
}

export default FilterFormDialog
