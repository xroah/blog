import * as React from "react";
import { render } from "react-dom";
import App from "./components/nav";
import { hot } from "react-hot-loader";
import { createMuiTheme, MuiThemeProvider }  from "@material-ui/core/styles";

const APP = hot(module)(App);
let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2196f3"
        }
    }
});

render(
    <MuiThemeProvider theme={theme}>
        <APP/>
    </MuiThemeProvider>,
    document.getElementById("app")
);