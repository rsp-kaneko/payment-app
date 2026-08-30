import RootContext from "@/Contexts/RootContext";
import useUser from "@/Hooks/useUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FC, useContext, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import UserDataListTable from "@/Components/UserManagerContents/UserDataListTable";

const UserManager: FC = () => {
    const { REFRESH } = useContext(RootContext);
    const { userLoad, users, getAllUsers } = useUser();

    useEffect(() => {
        getAllUsers();
    }, [REFRESH]);

    return (
        <AuthenticatedLayout pageTitle="ユーザー管理" loading={userLoad}>
            <Box sx={{ width: "100%", my: 2 }}>

                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
                    ユーザー一覧
                </Typography>

                <UserDataListTable users={users} />

            </Box>
        </AuthenticatedLayout>
    );
};

export default UserManager;
