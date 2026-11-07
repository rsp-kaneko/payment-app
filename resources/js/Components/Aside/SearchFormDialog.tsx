import RootContext from "@/Contexts/RootContext";
import { PaymentParams } from "@/types/payment";
import { Button, DialogActions, Divider } from "@mui/material";
import { FC, useContext, useState } from "react";
import CustomDialog from "../Dialogs/CustomDialog";
import CustomDialogContent from "../Dialogs/CustomDialogContent";
import FormItem from "../TextItem/FormItem";
import BetweenFormItem from "../TextItem/BetweenFormItem";

type Props = {
    open: boolean
    onClose: () => void
    handleSearchEvent: (props: PaymentParams) => void
}

const SearchFormDialog: FC<Props> = (props) => {
    const { open, onClose, handleSearchEvent } = props

    const {SET_OPEN_ASIDE} = useContext(RootContext)
    const [searchParams, setSearchParams] = useState<PaymentParams>({
        page: 1,
        keyword: "",
        minPrice: 0,
        maxPrice: 0,
        startDate: "",
        endDate: "",
        searchType: "all"
    })

    const handleSubmit = () => {
        handleSearchEvent({...searchParams, searchType: "all"})
        onClose()
        SET_OPEN_ASIDE(false)
    }

    const handleSearchClear = () => {
        setSearchParams({
            page: 1,
            keyword: "",
            minPrice: 0,
            maxPrice: 0,
            startDate: "",
            endDate: ""
        })
    }

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title="全期間検索"
            subTitle="過去を含めた全ての期間から検索"
            icon={<i className="fa-solid fa-magnifying-glass"></i>}
            color="#f00"
        >
            <CustomDialogContent>
                <FormItem
                    type="text"
                    label="タイトルを入力"
                    icon={<i className="fa-regular fa-file-lines"></i>}
                    onChange={(e) =>
                        setSearchParams((prev) => ({...prev, keyword: e.target.value}))
                    }
                    value={searchParams.keyword}
                />
                <BetweenFormItem
                    type="number"
                    sIcon={<i className="fa-solid fa-yen-sign"></i>}
                    sLabel="最小金額"
                    sValue={searchParams.minPrice || ""}
                    sOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, minPrice: Number(e.target.value)}))
                    }
                    eIcon={<i className="fa-solid fa-yen-sign"></i>}
                    eLabel="最大金額"
                    eValue={searchParams.maxPrice || ""}
                    eOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, maxPrice: Number(e.target.value)}))
                    }
                />
                <BetweenFormItem
                    type="date"
                    sIcon={<i className="fa-solid fa-clock"></i>}
                    sLabel="開始日"
                    sValue={searchParams.startDate}
                    sOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, startDate: e.target.value}))
                    }
                    eIcon={<i className="fa-solid fa-clock"></i>}
                    eLabel="終了日"
                    eValue={searchParams.endDate}
                    eOnChange={(e) =>
                        setSearchParams((prev) => ({...prev, endDate: e.target.value}))
                    }
                />
            </CustomDialogContent>
            <Divider />
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
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

export default SearchFormDialog
