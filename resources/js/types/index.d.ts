import { SnackbarProps } from "@mui/material";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
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
