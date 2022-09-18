import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#009688"
        },
        secondary: {
            main: "#1976d2"
        },
        relaxed:{
            main:"#1c5550",
            contrastText: '#ffffff'
        },
        edit:{
            main:"#F4E900",
            contrastText: '#ffffff'
        }
    }
});

export default theme;