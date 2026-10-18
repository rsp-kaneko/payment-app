import RootContext from "@/Contexts/RootContext";
import { ReceiptData } from "@/types/receipt";
import { GoogleGenAI } from "@google/genai";
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

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType
                        }
                    },
                    'このレシート画像から、店舗名、日付、合計金額、購入した品目（品名、単価、数量）を抽出し、指定されたJSONフォーマットで出力してください。'
                ],
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: 'OBJECT',
                        properties: {
                            shopName: { type: 'STRING', description: '店舗名' },
                            date: { type: 'STRING', description: '購入日時（YYYY-MM-DD形式、不明ならそのまま）' },
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
            setResult(parsedData);

        } catch (err) {
            console.error(err);
            SET_ALERT({open: true, type: "error", message: "レシートの読み取りに失敗しました"})
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
