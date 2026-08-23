import useTag from "@/Hooks/useTag"
import { Box, Button, CircularProgress, Grid } from "@mui/material"
import { FC, useContext, useEffect, useState } from "react"
import TagSettingDialog from "./TagSettingDialog"
import MonthlyTagDataCard from "./MonthlyTagDataCard"
import RootContext from "@/Contexts/RootContext"
import NotFound from "../MainContents/NotFound"

type Props = {
    year?: number
    month?: number
}

const TagHistoryContent: FC<Props> = (props) => {
    const {year, month} = props

    const {TAG_REFRESH, SET_TAG_REFRESH} = useContext(RootContext)
    const {
        tagLoad,
        monthlyTags,
        getMonthlyTags,
    } = useTag();

    const [openSetting, setOpenSetting] = useState(false)

    const onCloseSetting = () => {
        setOpenSetting(false)
        SET_TAG_REFRESH((prev) => prev + 1)
    }

    useEffect(() => {
        getMonthlyTags({
            year: year ?? new Date().getFullYear(),
            month: month ?? new Date().getMonth() + 1
        })
    }, [year, month, TAG_REFRESH])

    return (
        <>
            <Button
                variant="contained"
                color="success"
                sx={{width: 120}}
                onClick={() => setOpenSetting(true)}
            >
                タグ設定
            </Button>
            {tagLoad ? (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "120px"
                }}>
                    <CircularProgress size="4rem" />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {monthlyTags.length === 0 && (
                        <NotFound />
                    )}
                    {monthlyTags.length !== 0 && monthlyTags.map((tagData) => (
                        <Grid key={tagData.id} size={{ xs: 12, md: 6, lg: 4 }}>
                                <MonthlyTagDataCard
                                    tagData={tagData}
                                />
                        </Grid>
                    ))}
                </Grid>
            )}

            <TagSettingDialog
                open={openSetting}
                onClose={onCloseSetting}
            />
        </>
    )
}

export default TagHistoryContent
