import RootContext from "@/Contexts/RootContext";
import useUser from "@/Hooks/useUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FC, useContext, useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import UserDataListTable from "@/Components/UserManagerContents/UserDataListTable";
import RegistUserDialog from "@/Components/UserManagerContents/RegistUserDialog";

const UserManager: FC = () => {
    const { REFRESH } = useContext(RootContext);
    const { userLoad, users, getAllUsers } = useUser();
    const [openRegistDialog, setOpenRegistDialog] = useState(false)

    useEffect(() => {
        getAllUsers();
    }, [REFRESH]);

    return (
        <AuthenticatedLayout pageTitle="ユーザー管理" loading={userLoad}>
            <Box sx={{ width: "100%", my: 2 }}>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
                        <i className="fa-solid fa-users mr-2"></i>
                        ユーザー一覧
                    </Typography>
                    <Button variant="contained" color="success" onClick={() => setOpenRegistDialog(true)}>
                        <i className="fa-solid fa-user-plus mr-2"></i>
                        新規登録
                    </Button>
                </Box>

                <UserDataListTable users={users} />

            </Box>

            <RegistUserDialog
                open={openRegistDialog}
                onClose={() => setOpenRegistDialog(false)}
            />
        </AuthenticatedLayout>
    );
};

export default UserManager;
