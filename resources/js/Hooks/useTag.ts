import RootContext from "@/Contexts/RootContext";
import { MonthlyPaymentTagList, MonthlyTag, Tag, TagParams, TagRequest } from "@/types/tag";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useCallback, useContext, useState } from "react";

const useTag = () => {
    const user = usePage().props.auth.user
    const {SET_TAG_REFRESH, SET_ALERT, SET_TAGS} = useContext(RootContext)
    const [tagLoad, setTagLoad] = useState(false)
    const [monthlyTags, setMonthlyTags] = useState<Array<MonthlyTag>>([])
    const [monthlyTagDataList, setMonthlyTagDataList] = useState<Array<MonthlyPaymentTagList>>([])
    const [tagData, setTagData] = useState<TagRequest>({
        id: 0,
        user_id: user.id,
        name: "",
        color: "",
        delete_flg: 0
    })

    ////////// 全タグを取得
    const getAllTags = useCallback(() => {
        setTagLoad(true)
        axios.get(route('tags.getAll'))
            .then((res) => {
                if (res.data.status === 200) {
                    SET_TAGS(res.data.allTags)
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setTagLoad(false))
    }, [])

    ////////// 月毎のタグ詳細データを取得
    const getMonthlyTags = useCallback((params: TagParams) => {
        setTagLoad(true)
        axios.get(route('tags.getMonthlyTags'), {params: params})
            .then((res) => {
                if (res.data.status === 200) {
                    setMonthlyTags(res.data.monthlyTags)
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setTagLoad(false))
    }, [])

    ////////// 月毎の支払いデータに含まれる全タグ名を取得
    const getMonthlyPaymentTagList = useCallback((params: TagParams) => {
        axios.get(route('tags.getMonthlyPaymentTagList'), {params: params})
            .then((res) => {
                if (res.data.status === 200) {
                    setMonthlyTagDataList(res.data.paymentTags)
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
    }, [])

    ////////// 新しいタグを追加
    const createTag = useCallback((data: TagRequest) => {
        setTagLoad(true)
        axios.post(route('tags.store'), data)
            .then((res) => {
                if (res.data.status === 200) {
                    SET_TAG_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "タグを追加しました"})
                } else if (res.data.status === 400) {
                    SET_ALERT({open: true, type: "error", message: "そのタグ名は既に存在します"})
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setTagLoad(false))
    }, [])

    ////////// 既存のタグを更新
    const updateTag = useCallback((data: TagRequest) => {
        setTagLoad(true)
        axios.patch(route('tags.update', data.id), data)
            .then((res) => {
                if (res.data.status === 200) {
                    SET_TAG_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "タグを更新しました"})
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setTagLoad(false))
    }, [])

    ////////// タグを1つ削除
    const deleteTag = useCallback((id: number) => {
        setTagLoad(true)
        axios.delete(route('tags.destroy',id))
            .then((res) => {
                if (res.data.status === 200) {
                    SET_TAG_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "タグを削除しました"})
                } else {
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setTagLoad(false))
    }, [])


    return {
        tagLoad,
        tagData,
        setTagData,
        getAllTags,
        monthlyTags,
        monthlyTagDataList,
        getMonthlyTags,
        getMonthlyPaymentTagList,
        createTag,
        updateTag,
        deleteTag
    }
}

export default useTag;
