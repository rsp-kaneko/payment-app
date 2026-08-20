import { PaymentParams } from "@/types/payment";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

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
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="h5" sx={{ fontWeight: "bold" }}>フィルター（{paymentParams.year}年{paymentParams.month}月）</Typography>
                <IconButton onClick={onClose}>
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Box>
                        <Paper
                            component="form"
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                                <i className="fa-regular fa-file-lines"></i>
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="タイトルを入力"
                                type="text"
                                value={searchParams.keyword}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({...prev, keyword: e.target.value}))
                                }
                            />
                        </Paper>
                    </Box>
                    <Box>
                        <Paper
                            component="form"
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                                <i className="fa-solid fa-yen-sign"></i>
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                type="text"
                                value={searchParams.minPrice! > 0 ? searchParams.minPrice : 0}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({...prev, minPrice: Number(e.target.value)}))
                                }
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                                <i className="fa-solid fa-right-left text-black"></i>
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                                <i className="fa-solid fa-yen-sign"></i>
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                type="text"
                                value={searchParams.maxPrice! > 0 ? searchParams.maxPrice : 0}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({...prev, maxPrice: Number(e.target.value)}))
                                }
                            />
                        </Paper>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleSearchClear}
                >
                    <i className="fa-solid fa-eraser mr-3"></i>
                    クリア
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                >
                    <i className="fa-solid fa-paper-plane mr-3"></i>
                    実行
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterFormDialog
