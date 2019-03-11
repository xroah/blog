import * as React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "@common/theme";
import { Provider } from "react-redux";
import store from "./redux";
import "normalize.css";

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app")
);