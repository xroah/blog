import * as React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "@common/theme";
import "normalize.css";

render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById("app")
);