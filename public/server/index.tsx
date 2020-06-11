import express from "express";
import path from "path";
import fs from "fs";
import createProxy from "./proxy";
import React from "react";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "../src/components/app";
import reducers from "../src/reducers";

const app = express();
const context = path.resolve(__dirname, "../dist");
const html = fs.readFileSync(path.join(context, "index.html")).toString();

createProxy(app);
app.use(express.static(context, { index: false }));

app.use((req, res) => {
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();
    const ctx: any = {};
    const store = createStore(reducers);
    const compString = renderToString(
        <StaticRouter location={req.url} context={ctx}>
            <JssProvider registry={sheets} generateId={generateId}>
                <Provider store={store}>
                    <App />
                </Provider>
            </JssProvider>
        </StaticRouter>
    );
    const content = html.replace(/<!--COMPONENT_STRING_PLACEHOLDER-->/, compString)
        .replace(/\/\*STYLE_PLACEHOLDER\*\//, sheets.toString())
        .replace(/\/\/INITIAL_STATE_PLACEHOLDER/, JSON.stringify(store.getState()));

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (ctx.url) {
        return res.redirect(302, "/404");
    }

    res.send(content);
});

app.listen(8888);