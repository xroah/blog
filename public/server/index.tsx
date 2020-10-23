import express from "express";
import path from "path";
import createProxy from "./proxy";
import render from "./render"

const app = express();
const context = path.resolve(__dirname, "../dist");

createProxy(app);
app.use(express.static(context, {index: false}));

app.use(render);

app.listen(8888);