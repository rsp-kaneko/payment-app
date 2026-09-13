import RootContext from "@/Contexts/RootContext"
import useUser from "@/Hooks/useUser"
import { User, UserError } from "@/types"
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, InputAdornment, Switch, TextField, Typography } from "@mui/material"
import { FC, useContext, useEffect, useState } from "react"

type Props = {
    selectedUser: User | null
    users: User[]
    open: boolean
    onClose: () => void
}

const EditUserDialog: FC<Props> = (props) => {
    const {selectedUser, users, open, onClose} = props
    const {REFRESH, SET_ALERT} = useContext(RootContext)
    const {emailValidate, userData, setUserData, userError, setUserError, userLoad, updateUser} = useUser()
    const [isPassEditFlg, setIsPassEditFlg] = useState<boolean>(false)

    useEffect(() => {
        onClose()
    }, [REFRESH])

    useEffect(() => {
        setUserData({
            id: selectedUser?.id,
            name: selectedUser?.name,
            email: selectedUser?.email,
            password: "",
            max_total_price: selectedUser?.max_total_price,
            max_page_count: selectedUser?.max_page_count,
            delete_flg: selectedUser?.delete_flg
        })
        setIsPassEditFlg(false)
        setUserError({
            name: "",
            email: "",
            password: "",
            max_total_price: "",
            max_page_count: ""
        })
    }, [selectedUser, open])

    useEffect(() => {
        userData.max_total_price! < 100 && setUserData((prev) => ({...prev, max_total_price: 100}))
        userData.max_page_count! < 5 && setUserData((prev) => ({...prev, max_page_count: 5}))
    }, [userData.max_total_price, userData.max_page_count])

    const handleEditUser = () => {
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
        } else if (
            users.find((user) => user.name === userData.name)
            && selectedUser?.name !== userData.name
        ) {
            newErrors.name = "そのユーザーは既に存在します"
        }

        if (!userData.email) {
            newErrors.email = "Emailは必須です"
        } else if (!emailValidate(userData.email)) {
            newErrors.email = "正しい形式で入力してください"
        } else if (
            users.find((user) => user.email === userData.email)
            && selectedUser?.email !== userData.email
        ) {
            newErrors.email = "そのEmailは既に登録されています"
        }

        if (!userData.max_total_price) {
            newErrors.max_total_price = "月額上限金額は必須です"
        } else if (999999999 < userData.max_total_price || 100 > userData.max_total_price) {
            newErrors.max_total_price = "￥100～￥999,999,999までです"
        }

        if (!userData.max_page_count) {
            newErrors.max_page_count = "データ表示上限は必須です"
        } else if (100 < userData.max_page_count || 5 > userData.max_page_count) {
            newErrors.max_page_count = "5～100データまでです"
        }

        if (isPassEditFlg) {
            if (!userData.password) {
                newErrors.password = "パスワードは必須です"
            } else if (userData.password.length < 8) {
                newErrors.password = "半角英数字記号8文字以上"
            }
        }

        setUserError(newErrors)

        const hasError = Object.values(newErrors).some((err) => err !== "")
        if (!hasError) {
            updateUser(userData)
        } else {
            SET_ALERT({open: true, type: "error", message: "入力内容に誤りがあります"})
        }
    }

    return (
        <Dialog maxWidth="md" fullWidth open={open}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    ユーザー情報変更
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
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id="max_total_price"
                    label="合計金額"
                    error={userError.max_total_price != ""}
                    helperText={userError.max_total_price}
                    name="max_total_price"
                    placeholder="￥100～999,999,999"
                    value={userData.max_total_price}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, max_total_price: Number(e.target.value)}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-yen-sign"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id="max_page_count"
                    label="データ表示上限"
                    error={userError.max_page_count != ""}
                    helperText={userError.max_page_count}
                    name="max_page_count"
                    placeholder="5～100"
                    value={userData.max_page_count}
                    onChange={(e) =>
                        setUserData((prev) => ({...prev, max_page_count: Number(e.target.value)}))
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-file"></i>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Box sx={{ mt: 1.5, mb: 0.5, display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isPassEditFlg}
                                onChange={(e) => {
                                    const checked = e.target.checked
                                    setIsPassEditFlg(checked)
                                    if (!checked) {
                                        setUserData((prev) => ({ ...prev, password: "" }))
                                    }
                                }}
                                color="primary"
                            />
                        }
                        label="パスワードを変更する"
                    />
                </Box>

                <TextField
                    type="password"
                    margin="normal"
                    required={isPassEditFlg}
                    disabled={!isPassEditFlg}
                    fullWidth
                    name="password"
                    label="パスワード"
                    error={userError.password != ""}
                    helperText={userError.password}
                    id="password"
                    placeholder={isPassEditFlg ? "最低8文字以上" : "パスワード変更は無効です"}
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<i className="fa-solid fa-user-plus"></i>}
                    loading={userLoad}
                    onClick={handleEditUser}
                    sx={{mt:4}}
                >
                    変更する
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserDialog
