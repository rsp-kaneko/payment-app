import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FC } from "react";

const UserManager: FC = () => {
    return (
        <AuthenticatedLayout pageTitle="ユーザー管理">
            <>ユーザー管理ページ</>
        </AuthenticatedLayout>
    )
}

export default UserManager
