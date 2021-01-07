import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import express from "express";
import history from "connect-history-api-fallback";
import conf from "./dev.conf";
import createProxy from "../server/proxy";
import open from "open"

const PORT = 8888
const app = express();
const compiler = webpack(conf);

createProxy(app);
app.use(history());
app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));

app.listen(PORT);
open(`http://localhost:${8888}`)