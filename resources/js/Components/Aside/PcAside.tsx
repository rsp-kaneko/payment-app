import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import AsideButton from "./AsideButton";
import { PaymentParams } from "@/types/payment";
import SearchFormDialog from "./SearchFormDialog";
import RootContext from "@/Contexts/RootContext";
import axios from "axios";

type Props = {
    paymentParams?: PaymentParams | null
    handleSearchEvent?: (props: PaymentParams) => void
    setPageLoad: Dispatch<SetStateAction<boolean>>
}

const PcAside: FC<Props> = (props) => {
    const { paymentParams = null, handleSearchEvent = undefined, setPageLoad } = props

    const {OPEN_TAG, SET_OPEN_TAG, SET_OPEN_ASIDE} = useContext(RootContext)
    const [openSearchDialog, setOpenSearchDialog] = useState(false)

    const onCloseSearchDialog = () => setOpenSearchDialog(false)

    const handleOpenTag = () => {
        SET_OPEN_TAG(!OPEN_TAG)
        SET_OPEN_ASIDE(false)
    }
    const handleDataPageEvent = () => {
        setPageLoad(true)
        location.href = route("top")
    }
    const handleUserSettingEvent = () => {
        setPageLoad(true)
        location.href = route("profile.edit")
    }
    const handleLogoutEvent = () => {
        setPageLoad(true)
        axios.post(route("logout")).then(() => location.reload())
    }

    return (
        <aside>
            <Box sx={{ height: {xs: 160, md: 120}, mt: 2, padding: "16px", color: "#fff" }}>
                <IconButton
                    onClick={() => SET_OPEN_ASIDE(false)}
                    sx={{
                        color: "#fff",
                        mb: 2,
                        display: {md: "none"}
                    }}
                >
                    <i className="fa-solid fa-angles-left"></i>
                    <Typography>閉じる</Typography>
                </IconButton>
                <Box sx={{display: "flex", alignItems: "end"}}>
                    <img src="/favicon.ico" width="64px" />
                    <Typography component="span" sx={{fontSize: "1.3rem", fontWeight: "bold"}}>帳簿管理システム</Typography>
                </Box>
            </Box>

            {route().current("top") && (
                <>
                    <AsideButton active={paymentParams?.searchType === "all"} onClick={() => setOpenSearchDialog(true)}>
                        <Box>
                            <i className="fa-solid fa-magnifying-glass mr-3"></i>
                            全期間検索
                            {paymentParams?.searchType === "all" && (
                                <i className="fa-solid fa-angles-right ml-3" style={{color: "#1976d2"}}></i>
                            )}
                        </Box>
                    </AsideButton>
                    <AsideButton active={OPEN_TAG} onClick={handleOpenTag}>
                        <Box>
                            <i className="fa-solid fa-tags mr-3"></i>
                            タグ詳細
                            {OPEN_TAG && (
                                <Typography component="span" sx={{ color: "#f44336", fontSize: "inherit", marginLeft: 3, fontWeight: "bold" }}>
                                    解除
                                    <i className="fa-solid fa-angles-right ml-3"></i>
                                </Typography>
                            )}
                        </Box>
                    </AsideButton>
                </>
            )}
            <AsideButton active={route().current("top")} onClick={handleDataPageEvent}>
                <Box>
                    <i className="fa-solid fa-database mr-3"></i>
                    データ
                </Box>
            </AsideButton>
            <AsideButton active={route().current("profile.edit")} onClick={handleUserSettingEvent}>
                <Box>
                    <i className="fa-solid fa-gear mr-3"></i>
                    ユーザー設定
                </Box>
            </AsideButton>
            <AsideButton onClick={handleLogoutEvent}>
                <Box>
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>
                    ログアウト
                </Box>
            </AsideButton>

            {handleSearchEvent && (
                <SearchFormDialog
                    open={openSearchDialog}
                    onClose={onCloseSearchDialog}
                    handleSearchEvent={handleSearchEvent}
                />
            )}
        </aside>
    )
}

export default PcAside
