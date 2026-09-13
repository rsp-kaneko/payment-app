import { User } from "@/types";
import {
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";
import EditUserDialog from "./EditUserDialog";

type Props = {
    users: User[];
};

const UserDataListTable: FC<Props> = (props) => {
    const { users } = props;
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleOpenEditDialog = (user: User) => {
        setSelectedUser(user)
        setOpenEditDialog(true)
    }

    // セルの共通パディング（スマホ時はスリム化）
    const cellPadding = {
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 1.5 },
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
        >
            <Table
                sx={{
                    width: "100%",
                    minWidth: { xs: "100%", md: 650 },
                }}
                aria-label="user table"
            >
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                    <TableRow>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                ...cellPadding,
                                width: { xs: 36, sm: 60 },
                            }}
                        >
                            ID
                        </TableCell>
                        {/* スマホ用ヘッダー: ユーザー情報 */}
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "table-cell", md: "none" },
                                ...cellPadding,
                            }}
                        >
                            ユーザー
                        </TableCell>
                        {/* PC用ヘッダー: 名前 */}
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "none", md: "table-cell" },
                                ...cellPadding,
                            }}
                        >
                            名前
                        </TableCell>
                        {/* PC用ヘッダー: メールアドレス */}
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "none", md: "table-cell" },
                                ...cellPadding,
                            }}
                        >
                            メールアドレス
                        </TableCell>
                        {/* PC用ヘッダー: 権限 */}
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "none", md: "table-cell" },
                                ...cellPadding,
                            }}
                        >
                            権限
                        </TableCell>
                        {/* スマホ用ヘッダー: 上限設定 */}
                        <TableCell
                            align="right"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "table-cell", md: "none" },
                                ...cellPadding,
                            }}
                        >
                            上限設定
                        </TableCell>
                        {/* PC用ヘッダー: 月額上限金額 */}
                        <TableCell
                            align="right"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "none", md: "table-cell" },
                                ...cellPadding,
                            }}
                        >
                            月額上限金額
                        </TableCell>
                        {/* PC用ヘッダー: データ表示上限 */}
                        <TableCell
                            align="right"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                display: { xs: "none", md: "table-cell" },
                                ...cellPadding,
                            }}
                        >
                            データ表示上限
                        </TableCell>
                        {/* 編集ボタン列 */}
                        <TableCell
                            align="right"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                ...cellPadding,
                                width: { xs: 54, sm: 80 },
                            }}

                        >
                            編集
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
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
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        ...cellPadding,
                                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                    }}
                                >
                                    {user.id}
                                </TableCell>
                                {/* スマホ用セル: 名前 + 権限バッジ + メールアドレス */}
                                <TableCell
                                    sx={{
                                        display: { xs: "table-cell", md: "none" },
                                        ...cellPadding,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "0.85rem",
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {user.name}
                                        </Typography>
                                        <Chip
                                            label={user.role_id == 1 ? "管理者" : "一般"}
                                            size="small"
                                            color={user.role_id == 1 ? "primary" : "default"}
                                            sx={{
                                                height: 18,
                                                fontSize: "0.65rem",
                                                "& .MuiChip-label": { px: 0.75 },
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            fontSize: "0.7rem",
                                            wordBreak: "break-all",
                                            lineHeight: 1.2,
                                            mt: 0.3,
                                        }}
                                    >
                                        {user.email}
                                    </Typography>
                                </TableCell>
                                {/* PC用セル: 名前 */}
                                <TableCell
                                    sx={{
                                        display: { xs: "none", md: "table-cell" },
                                        fontWeight: "medium",
                                        ...cellPadding,
                                    }}
                                >
                                    {user.name}
                                </TableCell>
                                {/* PC用セル: メールアドレス */}
                                <TableCell
                                    sx={{
                                        display: { xs: "none", md: "table-cell" },
                                        ...cellPadding,
                                    }}
                                >
                                    {user.email}
                                </TableCell>
                                {/* PC用セル: 権限 */}
                                <TableCell
                                    sx={{
                                        display: { xs: "none", md: "table-cell" },
                                        ...cellPadding,
                                    }}
                                >
                                    <Chip
                                        label={user.role_id == 1 ? "管理者" : "一般"}
                                        size="small"
                                        color={user.role_id == 1 ? "primary" : "default"}
                                        variant="outlined"
                                    />
                                </TableCell>
                                {/* スマホ用セル: 上限設定（金額 + ページ数） */}
                                <TableCell
                                    align="right"
                                    sx={{
                                        display: { xs: "table-cell", md: "none" },
                                        ...cellPadding,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "0.8rem",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        ¥{user.max_total_price.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            fontSize: "0.7rem",
                                            lineHeight: 1.2,
                                            mt: 0.3,
                                        }}
                                    >
                                        {user.max_page_count.toLocaleString()}P
                                    </Typography>
                                </TableCell>
                                {/* PC用セル: 月額上限金額 */}
                                <TableCell
                                    align="right"
                                    sx={{
                                        display: { xs: "none", md: "table-cell" },
                                        ...cellPadding,
                                    }}
                                >
                                    ¥{user.max_total_price.toLocaleString()}
                                </TableCell>
                                {/* PC用セル: データ表示上限 */}
                                <TableCell
                                    align="right"
                                    sx={{
                                        display: { xs: "none", md: "table-cell" },
                                        ...cellPadding,
                                    }}
                                >
                                    {user.max_page_count.toLocaleString()} データ
                                </TableCell>
                                {/* 編集ボタン */}
                                <TableCell align="right" sx={{ ...cellPadding }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="warning"
                                        sx={{
                                            minWidth: { xs: "auto", sm: 64 },
                                            px: { xs: 1, sm: 2 },
                                            py: { xs: 0.3, sm: 0.5 },
                                            fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                                        }}
                                        onClick={() => handleOpenEditDialog(user)}
                                    >
                                        編集
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <EditUserDialog
                selectedUser={selectedUser}
                users={users}
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
            />
        </TableContainer>
    );
};

export default UserDataListTable;
