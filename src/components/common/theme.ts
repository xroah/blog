import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: "#2196f3",
            dark: "#1976d2"
        }
    }
});