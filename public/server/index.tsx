import express from "express";
import path from "path";
import fs from "fs";
import createProxy from "./proxy";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/components/app";

const app = express();
const context = path.resolve(__dirname, "../dist");
const html = fs.readFileSync(path.join(context, "index.html")).toString();

createProxy(app);
app.use(express.static(context, { index: false }));

app.use((req, res) => {
    const compString = renderToString(
        <App />
    );
    const content = html.replace(/<!--COMPONENT_STRING_PLACEHOLDER-->/, compString);

    res.send(content);
});

app.listen(8888);