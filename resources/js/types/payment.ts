import { PaginateLink, PaginateMeta } from "./paginate"

export type Payment = {
    id: number
    user_id: number
    title: string
    price: number
    payment_date: string
    delete_flg: string
    created_at: string
    updated_at: string
}

export type PaymentPaginate = {
    data: Array<Payment>
    links: Array<PaginateLink>
} & PaginateMeta

export type PaymentRequest = {
    id?: number
    user_id?: number
    title?: string
    price?: number
    payment_date?: string
}

export type PaymentParams = {
    page?: number
    year?: number
    month?: number
    minPrice?: number | null
    maxPrice?: number | null
    tagId?: number | null
    keyword?: string
    startDate?: string
    endDate?: string
    searchType?: "all" | "filter" | null
}
