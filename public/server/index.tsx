import express from "express";
import path from "path";
import fs from "fs";
import createProxy from "./proxy";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/components/app";
import { StaticRouter } from "react-router-dom";

const app = express();
const context = path.resolve(__dirname, "../dist");
const html = fs.readFileSync(path.join(context, "index.html")).toString();

createProxy(app);
app.use(express.static(context, { index: false }));

app.use((req, res) => {
    const ctx: any = {};
    const compString = renderToString(
        <StaticRouter location={req.url} context={ctx}>
            <App />
        </StaticRouter>
    );
    const content = html.replace(/<!--COMPONENT_STRING_PLACEHOLDER-->/, compString);

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (ctx.url) {
        return res.redirect(302, "/404");
    }

    res.send(content);
});

app.listen(8888);