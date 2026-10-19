import useTag from "@/Hooks/useTag"
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material"
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
        <Box sx={{
            p: 2,
            border: "4px solid #aaa",
            minHeight: "100vh"
        }}>
            <Card sx={{
                mb: 3,
                width: {xs: "100%", md: 500}
            }}>
                <CardContent sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderLeft: "8px solid #0a0",
                    borderBottom: "1px solid #0a0"
                }}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{width: 120}}
                        onClick={() => setOpenSetting(true)}
                    >
                        タグ設定
                    </Button>
                    <Typography component="h5" sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem"
                    }}>
                        {month} 月のタグデータ：
                        <Typography component="span" sx={{
                            borderBottom: "2px solid #f00",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            color: "#f00"
                        }}>
                            {monthlyTags.length} 件
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
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
        </Box>
    )
}

export default TagHistoryContent
