import RootContext from "@/Contexts/RootContext";
import { ReceiptData } from "@/types/receipt";
import { GoogleGenAI, ApiError } from "@google/genai";
import { useCallback, useContext, useState } from "react";



const useGeminiAI = () => {
    const {SET_ALERT} = useContext(RootContext)
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<ReceiptData | null>(null);
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY })

    // クリア
    const clearResultData = useCallback(() => setResult(null), [])

    // Gemini API を呼び出す処理
    const scanReceipt = useCallback(async (
        base64Data: string | null,
        mimeType: string
    ) => {
        if (!base64Data) {
            SET_ALERT({open: true, type: "error", message: "レシート画像を選択してください"})
            return;
        }
        setResult(null)
        setLoading(true)

        // Asia/Tokyo の現在日時・日付を取得
        const nowJST = new Intl.DateTimeFormat('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(new Date());
        const todayJST = new Intl.DateTimeFormat('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date()).replace(/\//g, '-');

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    'このレシート画像から、店舗名、日付、合計金額、購入した品目（品名、単価、数量）を抽出し、指定されたJSONフォーマットで出力してください。'
                ],
                config: {
                    systemInstruction: `タイムゾーンは Asia/Tokyo です。現在日時は ${nowJST} です。`,
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: 'OBJECT',
                        properties: {
                            shopName: { type: 'STRING', description: '店舗名' },
                            date: { type: 'STRING', description: `購入日時（YYYY-MM-DD形式。基準日は ${todayJST} (Asia/Tokyo)。年が不明なら基準日の年、月が不明なら基準日の月、日が不明なら基準日の日をそれぞれ使用すること。）` },
                            totalAmount: { type: 'INTEGER', description: '合計金額（税込み）' },
                            items: {
                                type: 'ARRAY',
                                items: {
                                    type: 'OBJECT',
                                    properties: {
                                        name: { type: 'STRING', description: '品名・商品名' },
                                        price: { type: 'INTEGER', description: '単価または価格' },
                                        quantity: { type: 'INTEGER', description: '数量' }
                                    },
                                    required: ['name', 'price']
                                }
                            }
                        },
                        required: ['shopName', 'totalAmount', 'items']
                    }
                }
            });

            const jsonText = response.text;
            if (!jsonText) {throw new Error('APIから空のレスポンスが返却されました。')}

            const parsedData: ReceiptData = JSON.parse(jsonText);
            console.log(parsedData)
            setResult(parsedData);

        } catch (err: any) {
            console.error(err);

            const isQuotaExceeded =
                (err instanceof ApiError && err.status === 429) ||
                err?.status === 429 ||
                err?.response?.status === 429 ||
                /429|resource_exhausted|quota/i.test(err?.message || '');

            const isUnavailable =
                (err instanceof ApiError && err.status === 503) ||
                err?.status === 503 ||
                err?.response?.status === 503

            if (isQuotaExceeded) {
                SET_ALERT({
                    open: true,
                    type: "warning",
                    message: "APIの利用限度（リクエスト制限）を超過しました。しばらく時間を置いてから再度お試しください"
                });
            } else if (isUnavailable) {
                SET_ALERT({
                    open: true,
                    type: "warning",
                    message: "現在AIサーバーへのアクセスが集中している為、しばらく時間を置いてから再度お試しください"
                });
            } else {
                SET_ALERT({
                    open: true,
                    type: "warning",
                    message: "正しく読み取れませんでした、再度お試しください"
                });
            }
        } finally {
            setLoading(false);
        }
    }, []);


    return {
        result,
        scanReceipt,
        loading,
        clearResultData
    }
}

export default useGeminiAI
