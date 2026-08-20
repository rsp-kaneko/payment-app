import '../css/app.css';
import './bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

import { createInertiaApp } from '@inertiajs/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import RootContext from './Contexts/RootContext';
import { AlertSnackbarProps, ColorCode } from './types';
import AlertSnackbar from './Components/Alert/AlertSnackbar';
import { Tag } from './types/tag';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
    palette: {
        background: {
            default: "#aaa",
            paper: "#fff"
        },
        primary: {
            main: "#1976d2"
        },
    },
})

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const RootApp = () => {
            const [REFRESH, SET_REFRESH] = useState(0);
            const [OPEN_TAG, SET_OPEN_TAG] = useState(false);
            const [ALERT, SET_ALERT] = useState<AlertSnackbarProps>({
                open: false,
                type: "info",
                message: "",
            });
            const COLOR_CODES: Array<ColorCode> = [
                {name: "primary", color: "#1976d2"},
                {name: "secondary", color: "#dc004e"},
                {name: "error", color: "#f44336"},
                {name: "warning", color: "#ff9800"},
                {name: "info", color: "#2196f3"},
                {name: "success", color: "#4caf50"}
            ];
            const [TAGS, SET_TAGS] = useState<Array<Tag>>([])
            const [TAG_REFRESH, SET_TAG_REFRESH] = useState<number>(0)
            const [OPEN_ASIDE, SET_OPEN_ASIDE] = useState(false)

            return (
                <StrictMode>
                    <RootContext.Provider value={{
                        REFRESH,
                        SET_REFRESH,
                        ALERT,
                        SET_ALERT,
                        OPEN_TAG,
                        SET_OPEN_TAG,
                        COLOR_CODES,
                        TAGS,
                        SET_TAGS,
                        TAG_REFRESH,
                        SET_TAG_REFRESH,
                        OPEN_ASIDE,
                        SET_OPEN_ASIDE
                    }}>
                        <ThemeProvider theme={theme}>
                            <App {...props} />
                            <AlertSnackbar />
                        </ThemeProvider>
                    </RootContext.Provider>
                </StrictMode>
            );
        };

        root.render(<RootApp />);
    },
    progress: {
        color: '#4B5563',
    },
});
