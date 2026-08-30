import RootContext from "@/Contexts/RootContext"
import { User, UserRequest } from "@/types"
import axios from "axios"
import { useCallback, useContext, useState } from "react"

const useUser = () => {
    const {SET_REFRESH, SET_ALERT} = useContext(RootContext)
    const [userLoad, setUserLoad] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [userData, setUserData] = useState<UserRequest>({
        id: 0,
        name: "",
        email: "",
        password: "",
        max_total_price: 0,
        max_page_count: 0,
        delete_flg: 0
    })

    const getAllUsers = useCallback(() => {
        setUserLoad(true)
        axios.get(route('users.getAllUsers'))
            .then((res) => {
                if (res.data.status === 200) {
                    setUsers(res.data.users)
                    console.log(res.data.users)
                } else {
                    SET_ALERT({open: true, type: "error", message: "ユーザー情報を取得中にエラーが発生しました"})
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setUserLoad(false))
    }, [])

    const updateUser = useCallback((data: UserRequest) => {
        setUserLoad(true)
        axios.patch(route('users.update', data.id), data)
            .then((res) => {
                if (res.data.status === 200) {
                    SET_REFRESH((prev) => prev + 1)
                    SET_ALERT({open: true, type: "success", message: "データを更新しました"})
                } else {
                    SET_ALERT({open: true, type: "error", message: "更新中にエラーが発生しました"})
                    console.error(res.data.error)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setUserLoad(false))
    }, [])


    return {
        userLoad,
        users,
        userData,
        setUserData,
        getAllUsers,
        updateUser
    }
}

export default useUser
