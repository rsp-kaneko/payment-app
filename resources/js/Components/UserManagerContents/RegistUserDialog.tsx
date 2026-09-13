import RootContext from "@/Contexts/RootContext"
import useUser from "@/Hooks/useUser"
import { User, UserError } from "@/types"
import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { FC, useContext, useEffect } from "react"

type Props = {
    users: User[]
    open: boolean
    onClose: () => void
}

const RegistUserDialog: FC<Props> = (props) => {
    const {users, open, onClose} = props
    const {REFRESH, SET_ALERT} = useContext(RootContext)
    const {emailValidate, userData, setUserData, userError, setUserError, userLoad, registUser} = useUser()

    useEffect(() => {
        onClose()
    }, [REFRESH])

    useEffect(() => {
        if (open) {
            setUserData({
                id: 0,
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                max_total_price: 0,
                max_page_count: 0,
                delete_flg: 0
            })
            setUserError({
                name: "",
                email: "",
                password: "",
                max_total_price: "",
                max_page_count: ""
            })
        }
    }, [open])

    const handleRegistUser = () => {
        const newErrors: UserError = {
            name: "",
            email: "",
            password: "",
            max_total_price: "",
            max_page_count: ""
        }

        if (!userData.name) {
            newErrors.name = "ユーザー名は必須です"
        } else if (userData.name.length > 20) {
            newErrors.name = "ユーザー名は20文字以内まで"
        } else if (users.find((user) => user.name === userData.name)) {
            newErrors.name = "そのユーザーは既に存在します"
        }

        if (!userData.email) {
            newErrors.email = "Emailは必須です"
        } else if (!emailValidate(userData.email)) {
            newErrors.email = "正しい形式で入力してください"
        } else if (users.find((user) => user.email === userData.email)) {
            newErrors.email = "そのEmailは既に登録されています"
        }

        if (!userData.password) {
            newErrors.password = "パスワードは必須です"
        } else if (userData.password.length < 8) {
            newErrors.password = "半角英数字記号8文字以上"
        } else if (userData.password !== userData.password_confirmation) {
            newErrors.password = "確認用パスワードと一致しません"
        }

        setUserError(newErrors)

        const hasError = Object.values(newErrors).some((err) => err !== "")
        if (!hasError) {
            registUser(userData)
        } else {
            SET_ALERT({open: true, type: "error", message: "入力内容に誤りがあります"})
        }
    }

    return (
        <Dialog maxWidth="md" fullWidth open={open}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    ユーザー新規登録
                </Typography>
                <IconButton onClick={onClose}>
                    <i className="fa-solid fa-delete-left" style={{ color: "#f50" }}></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    type="text"
                    required
                    fullWidth
                    id="name"
                    label="ユーザー名"
                    error={userError.name != ""}
                    helperText={userError.name}
                    name="name"
                    placeholder="20文字以内"
                    value={userData.name}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, name: e.target.value}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-circle-user"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    error={userError.email != ""}
                    helperText={userError.email}
                    name="email"
                    placeholder="example@xxx.yyy.zzz"
                    value={userData.email}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, email: e.target.value}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-envelope"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    type="password"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    error={userError.password != ""}
                    helperText={userError.password}
                    id="password"
                    placeholder="最低8文字以上"
                    value={userData.password}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, password: e.target.value}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-lock"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    type="password"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="パスワード（確認）"
                    error={userError.password != ""}
                    id="confirmPassword"
                    placeholder="最低8文字以上"
                    value={userData.password_confirmation}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, password_confirmation: e.target.value}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-lock"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    startIcon={<i className="fa-solid fa-user-plus"></i>}
                    loading={userLoad}
                    onClick={handleRegistUser}
                    sx={{mt:4}}
                >
                    登録する
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default RegistUserDialog
