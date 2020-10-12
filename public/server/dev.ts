import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import express from "express";
import history from "connect-history-api-fallback";
import conf from "../config/dev.conf";
import createProxy from "./proxy";

const app = express();
const compiler = webpack(conf);

createProxy(app);
app.use(history());
app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));

app.listen(8888);