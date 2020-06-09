import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import express from "express";
import conf from "../config/dev.conf";
import createProxy from "./proxy";

const app = express();
const compiler = webpack(conf);

process.env.NODE_ENV = "development";

createProxy(app);
app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));

app.listen(8888);