import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import AsideButton from "./AsideButton";
import { PaymentParams } from "@/types/payment";
import SearchFormDialog from "./SearchFormDialog";
import RootContext from "@/Contexts/RootContext";
import axios from "axios";
import { usePage } from "@inertiajs/react";

type Props = {
    paymentParams?: PaymentParams | null
    handleSearchEvent?: (props: PaymentParams) => void
    setPageLoad: Dispatch<SetStateAction<boolean>>
}

const PcAside: FC<Props> = (props) => {
    const { paymentParams = null, handleSearchEvent = undefined, setPageLoad } = props

    const {OPEN_TAG, SET_OPEN_TAG, SET_OPEN_ASIDE} = useContext(RootContext)
    const [openSearchDialog, setOpenSearchDialog] = useState(false)
    const user = usePage().props.auth.user

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
    const handleOpenUserManager = () => {
        setPageLoad(true)
        location.href = route("users.index")
    }

    return (
        <aside style={{ height: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #1976d2 0%, #1565c0 100%)", color: "#fff" }}>
            {/* 上部ヘッダー（ロゴ＆タイトル） */}
            <Box sx={{ p: 2.5, pb: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <img src="/favicon.ico" width="34px" height="34px" style={{ borderRadius: 6 }} />
                        <Typography component="span" sx={{ fontSize: "1.15rem", fontWeight: "bold", letterSpacing: "0.02em" }}>
                            帳簿管理システム
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={() => SET_OPEN_ASIDE(false)}
                        size="small"
                        sx={{
                            color: "rgba(255, 255, 255, 0.8)",
                            display: { md: "none" },
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)", color: "#fff" }
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </IconButton>
                </Box>
            </Box>

            {/* ナビゲーションメニュー */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1, flex: 1, overflowY: "auto" }}>
                <AsideButton active={route().current("top")} onClick={handleDataPageEvent}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                            <i className="fa-solid fa-database"></i>
                        </Box>
                        データ
                    </Box>
                </AsideButton>

                {route().current("top") && (
                    <>
                        <AsideButton active={paymentParams?.searchType === "all"} onClick={() => setOpenSearchDialog(true)}>
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </Box>
                                全期間検索
                                {paymentParams?.searchType === "all" && (
                                    <Box sx={{ ml: "auto", fontSize: "0.75rem", bgcolor: "#1976d2", color: "#fff", px: 1, py: 0.2, borderRadius: 1, fontWeight: "bold" }}>
                                        表示中
                                    </Box>
                                )}
                            </Box>
                        </AsideButton>

                        <AsideButton active={OPEN_TAG} onClick={handleOpenTag}>
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                                    <i className="fa-solid fa-tags"></i>
                                </Box>
                                タグ詳細
                                {OPEN_TAG && (
                                    <Box sx={{ ml: "auto", fontSize: "0.75rem", bgcolor: "#ef4444", color: "#fff", px: 1, py: 0.2, borderRadius: 1, fontWeight: "bold" }}>
                                        解除
                                    </Box>
                                )}
                            </Box>
                        </AsideButton>
                    </>
                )}

                {user.role_id == 1 && (
                    <AsideButton active={route().current("users.index")} onClick={handleOpenUserManager}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                                <i className="fa-solid fa-user-gear"></i>
                            </Box>
                            ユーザー管理
                        </Box>
                    </AsideButton>
                )}
            </Box>

            {/* 下部フッターエリア（ユーザー情報・設定・ログアウト） */}
            <Box sx={{ p: 2, pt: 1.5, borderTop: "1px solid rgba(255, 255, 255, 0.15)", display: "flex", flexDirection: "column", gap: 1 }}>
                {/* ログインユーザー表示 */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.2,
                    px: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(4px)"
                }}>
                    <Box sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.95rem"
                    }}>
                        <i className="fa-solid fa-user"></i>
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)" }}>
                            {user.role_id == 1 ? "管理者" : "一般ユーザー"}
                        </Typography>
                    </Box>
                </Box>

                <AsideButton active={route().current("profile.edit")} onClick={handleUserSettingEvent}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                            <i className="fa-solid fa-gear"></i>
                        </Box>
                        ユーザー設定
                    </Box>
                </AsideButton>

                <AsideButton onClick={handleLogoutEvent}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", color: "#fca5a5" }}>
                        <Box sx={{ width: 24, textAlign: "center", mr: 1.5, display: "inline-flex", justifyContent: "center" }}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </Box>
                        ログアウト
                    </Box>
                </AsideButton>
            </Box>

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
