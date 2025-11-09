// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3F3F46", // slate gray
            dark: "#374151",
            light: "#9CA3AF",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#F8F9FA",
        },
        background: {
            default: "#272829",
            paper: "#F8F9FA",
        },
        text: {
            primary: "#1E1E1E",
            secondary: "#6B7280",
        },
    },
    typography: {
        fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
    },
});

export default theme;
