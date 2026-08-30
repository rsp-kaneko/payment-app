import { SnackbarProps } from "@mui/material";

interface Role {
    id: number;
    role_name: string;
}

export interface User {
    id: number;
    role: Role;
    name: string;
    email: string;
    email_verified_at?: string;
    max_total_price: number;
    max_page_count: number;
    delete_flg: number;
}

export interface UserRequest {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    max_total_price?: number;
    max_page_count?: number;
    delete_flg?: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type AlertSnackbarProps = SnackbarProps & {
    type: "success" | "error" | "warning" | "info"
}

export type ColorCode = {
    name: string
    color: string
}
