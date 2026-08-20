import RootContext from "@/Contexts/RootContext";
import { PaymentParams } from "@/types/payment";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";

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
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="h5" sx={{ fontWeight: "bold" }}>全期間検索</Typography>
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
                    <Box>
                        <Paper
                            component="form"
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                type="date"
                                value={searchParams.startDate}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({...prev, startDate: e.target.value}))
                                }
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                                <i className="fa-solid fa-right-left text-black"></i>
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                type="date"
                                value={searchParams.endDate}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({...prev, endDate: e.target.value}))
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

export default SearchFormDialog
