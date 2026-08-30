import { User } from "@/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
    users: User[]
}

const UserDataListTable: FC<Props> = (props) => {
    const {users} = props

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>名前</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>メールアドレス</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>権限</TableCell>
                        <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>月額上限金額</TableCell>
                        <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>上限ページ数</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                <Typography variant="body1" color="text.secondary">
                                    表示可能なユーザーがいません。
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: "medium" }}>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role?.role_name || "未割り当て"}</TableCell>
                                <TableCell align="right">
                                    ¥{user.max_total_price.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">
                                    {user.max_page_count.toLocaleString()} ページ
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserDataListTable
