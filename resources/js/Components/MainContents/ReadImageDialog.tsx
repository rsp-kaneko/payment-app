import useGeminiAI from "@/api/useGeminiAI";
import RootContext from "@/Contexts/RootContext"
import usePayment from "@/Hooks/usePayment"
import { GoogleGenAI } from "@google/genai";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { ChangeEvent, FC, useState } from "react"

type Props = {
    open: boolean
    onClose: () => void
}

const ReadImageDialog: FC<Props> = ({open, onClose}) => {
    const {paymentLoad, addReceiptData} = usePayment()
    const {result, scanReceipt, loading, clearResultData} = useGeminiAI()
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Data, setBase64Data] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState<string>('');


    // 1. 画像ファイルを読み込んでBase64に変換する処理
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        setMimeType(file.type);
        setImagePreview(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // "data:image/jpeg;base64,/9j/4AAQ..." から純粋なBase64文字列データのみを切り出す
                const base64Str = reader.result.split(',')[1];
                setBase64Data(base64Str);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleScanReceipt = () => {
        scanReceipt(base64Data, mimeType)
    }

    return (
        <Dialog open={open} fullWidth maxWidth="md">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5, borderBottom: "1px solid #e2e8f0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <i className="fa-solid fa-receipt" style={{ color: "#1976d2" }}></i>
                    <Typography component="span" sx={{ fontWeight: "bold", fontSize: 18 }}>レシート画像読み取り</Typography>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 2.5 }}>
                {/* 操作ツールバー */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<i className="fa-solid fa-folder-open"></i>}
                    >
                        画像を選択
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>

                    {imagePreview && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleScanReceipt}
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                            >
                                {loading ? '解析中...' : 'レシートを解析する'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setImagePreview(null)
                                    setBase64Data(null)
                                    clearResultData()
                                }}
                                startIcon={<i className="fa-solid fa-trash-can"></i>}
                            >
                                クリア
                            </Button>
                        </>
                    )}
                </Box>

                <Grid container spacing={2.5}>
                    {/* 左側：画像プレビュー */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card variant="outlined" sx={{ height: 440, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f8fafc", overflow: "hidden" }}>
                            {imagePreview ? (
                                <CardMedia
                                    component="img"
                                    image={imagePreview}
                                    alt="レシートプレビュー"
                                    sx={{ maxHeight: 440, width: "100%", objectFit: "contain", p: 1 }}
                                />
                            ) : (
                                <Box sx={{ textAlign: "center", color: "text.secondary", p: 3 }}>
                                    <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: 44, color: "#94a3b8", display: "block", marginBottom: 12 }}></i>
                                    <Typography variant="body2" color="text.secondary">
                                        レシート画像を選択すると<br />ここにプレビューが表示されます
                                    </Typography>
                                </Box>
                            )}
                        </Card>
                    </Grid>

                    {/* 右側：解析結果の構造化表示 */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        {loading && (
                            <Card variant="outlined" sx={{ height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, bgcolor: "#fafafa" }}>
                                <CircularProgress size={44} />
                                <Typography variant="body2" color="text.secondary">
                                    AIがレシートを解析しています...
                                </Typography>
                            </Card>
                        )}

                        {!loading && !result && (
                            <Card variant="outlined" sx={{ height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#fafafa", p: 3, textAlign: "center" }}>
                                <i className="fa-solid fa-file-invoice-dollar" style={{ fontSize: 44, color: "#cbd5e1", display: "block", marginBottom: 12 }}></i>
                                <Typography variant="body2" color="text.secondary">
                                    画像を選択後、「レシートを解析する」を押すと<br />解析結果がここに表示されます
                                </Typography>
                            </Card>
                        )}

                        {!loading && result && (
                            <Card variant="outlined" sx={{ height: 440, display: "flex", flexDirection: "column", p: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5, pb: 1.5, borderBottom: "1px solid #e2e8f0" }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">店舗名</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>{result.shopName}</Typography>
                                        <Typography variant="caption" color="text.secondary">日付: {result.date || '未検出'}</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: "right", bgcolor: "#ecfdf5", px: 1.5, py: 0.8, borderRadius: 1.5, border: "1px solid #a7f3d0" }}>
                                        <Typography variant="caption" color="success.dark" sx={{ fontWeight: "bold", display: "block" }}>合計金額</Typography>
                                        <Typography variant="h6" color="success.dark" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                                            ¥{result.totalAmount.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="caption" sx={{ fontWeight: "bold", mb: 1, color: "text.secondary" }}>
                                    品目一覧（{result.items.length}件）
                                </Typography>

                                <TableContainer component={Paper} variant="outlined" sx={{ flexGrow: 1, overflowY: "auto", maxHeight: 250 }}>
                                    <Table size="small" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>品名</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>単価</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>数量</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {result.items.map((item, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell component="th" scope="row">{item.name}</TableCell>
                                                    <TableCell align="right">¥{item.price.toLocaleString()}</TableCell>
                                                    <TableCell align="right">{item.quantity ?? 1}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 1.5, borderTop: "1px solid #e0e0e0" }}>
                <Button onClick={onClose} color="inherit">
                    閉じる
                </Button>
                {result && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            addReceiptData(result)
                            onClose()
                        }}
                        disabled={paymentLoad}
                        startIcon={paymentLoad ? <CircularProgress size={18} color="inherit" /> : <i className="fa-solid fa-check"></i>}
                    >
                        {paymentLoad ? "登録中..." : "支出データに登録する"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default ReadImageDialog
