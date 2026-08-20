import { AlertSnackbarProps, ColorCode } from "@/types"
import { Tag } from "@/types/tag"
import { createContext, Dispatch, SetStateAction } from "react"

type ContextType = {
    REFRESH: number
    SET_REFRESH: Dispatch<SetStateAction<number>>
    ALERT: AlertSnackbarProps
    SET_ALERT: Dispatch<SetStateAction<AlertSnackbarProps>>
    OPEN_TAG: boolean
    SET_OPEN_TAG: Dispatch<SetStateAction<boolean>>
    COLOR_CODES: Array<ColorCode>
    TAGS: Array<Tag>
    SET_TAGS: Dispatch<SetStateAction<Array<Tag>>>
    TAG_REFRESH: number
    SET_TAG_REFRESH: Dispatch<SetStateAction<number>>
    OPEN_ASIDE: boolean
    SET_OPEN_ASIDE: Dispatch<SetStateAction<boolean>>
}

const RootContext = createContext({} as ContextType)

export default RootContext
