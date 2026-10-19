import PcAside from "@/Components/Aside/PcAside";
import MainHeader from "@/Components/Header/MainHeader";
import LoadingContent from "@/Components/Loading/LoadingContent";
import RootContext from "@/Contexts/RootContext";
import { PaymentParams } from "@/types/payment";
import { Head } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";
import { FC, ReactNode, useContext, useState } from "react";

type Props = {
    children: ReactNode
    pageTitle?: string
    loading?: boolean
    paymentParams?: PaymentParams
    handleSearchEvent?: (props: PaymentParams) => void
}

const AuthenticatedLayout: FC<Props> = (props) => {
    const { children, pageTitle = "", loading = false, paymentParams = null, handleSearchEvent = undefined } = props

    const {OPEN_ASIDE} = useContext(RootContext)
    const [pageLoad, setPageLoad] = useState(false)
    const lastUpdateDatetime: string = import.meta.env.VITE_LAST_UPDATE_DATETIME

    return (
        <Box sx={{ bgcolor: "#e5e5e5", minHeight: "100vh" }}>
            <Head title={pageTitle} />

            {(loading || pageLoad) && (
                <LoadingContent />
            )}

            {OPEN_ASIDE && (
                <Box sx={{
                    display: {xs: "block", md: "none"},
                    zIndex: 50,
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}></Box>
            )}

            <Box sx={{
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: "#1976d2",
                width: 320,
                transform: {
                    xs: OPEN_ASIDE ? "translateX(0)" : "translateX(-320px)",
                    md: "translateX(0)"
                },
                transition: "transform 0.3s",
                zIndex: 100
            }}>
                <PcAside
                    paymentParams={paymentParams}
                    handleSearchEvent={handleSearchEvent}
                    setPageLoad={setPageLoad}
                />
            </Box>

            <Box sx={{
                width: {xs: "100%", md: "calc(100% - 320px)"},
                marginLeft: {xs: 0, md: "auto"},
                backgroundColor: "#fff",
                borderBottom: "1px solid #1976d2",
                height: 64
            }}>
                <MainHeader />
            </Box>

            <Box sx={{
                width: {xs: "100%", md: "calc(100% - 320px)"},
                marginLeft: {xs: 0, md: "auto"},
                padding: {xs: 2, md: 4}
            }}>
                {children}

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    pt: 8,
                }}>
                    <Typography component="p">&copy; Supported By Naoto</Typography>
                    <Typography component="p" sx={{fontWeight: "bold"}}>最終更新日時：{lastUpdateDatetime}</Typography>
                </Box>
            </Box>


        </Box>
    )
}

export default AuthenticatedLayout
