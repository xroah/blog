import * as React from "react";
import { render } from "react-dom";
import App from "./components/app/app";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "normalize.css";

const theme = createMuiTheme({
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

render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById("app")
);