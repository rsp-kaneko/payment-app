import RootContext from "@/Contexts/RootContext"
import useUser from "@/Hooks/useUser"
import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { FC, useContext } from "react"

type Props = {
    open: boolean
    onClose: () => void
}

const RegistUserDialog: FC<Props> = (props) => {
    const {open, onClose} = props
    const {SET_ALERT} = useContext(RootContext)
    const {emailValidate, userData, setUserData, userLoad, registUser} = useUser()

    const handleRegistUser = () => {
        let error = ""
        if (!userData.name) {
            error += "ユーザー名：必須です\n"
        } else if (userData.name.length > 20) {
            error += "ユーザー名：20文字以内まで\n"
        }
        if (!userData.email) {
            error += "Email：必須です\n"
        } else if (!emailValidate(userData.email)) {
            error += "Email：正しく入力してください\n"
        }
        if (!userData.password) {
            error += "パスワード：必須です\n"
        } else if (userData.password.length < 8) {
            error += "パスワード：最低8文字以上\n"
        } else if (userData.password !== userData.password_confirmation) {
            error += "パスワード：確認用パスワードと一致しません\n"
        }

        if (error) {
            SET_ALERT({open: true, type: "error", message: error})
        } else {
            registUser(userData)
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
