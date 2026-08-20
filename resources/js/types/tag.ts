import { PaginateLink, PaginateMeta } from "./paginate"

export type Tag = {
    id: number
    user_id: number
    name: string
    color: string
    delete_flg: number
    created_at: string
    updated_at: string
}

export type MonthlyTag = {
    id: number
    name: string
    tag_color: string
    count: number
    total_price: number
    monthly_total_price: number
}

export type MonthlyPaymentTagList = {
    payment_id: number
    tag_id_list: Array<number>
}

export type TagRequest = {
    id?: number
    user_id?: number
    name?: string
    color?: string
    delete_flg?: number
}

export type TagParams = {
    page?: number
    year?: number
    month?: number
}
