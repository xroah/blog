import * as React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "@common/theme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./redux";
import "normalize.css";

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
);