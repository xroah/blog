import {
    Request,
    Response
} from "express";
import path from "path";
import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {ChunkExtractor} from "@loadable/server"
import App from "../src/components/app";
import reducers from "../src/reducers";
import Helmet from "react-helmet"
import {fetchArticle, fetchArticles} from "./request"

const context = path.resolve(__dirname, "../dist");
// This is the stats file generated by webpack loadable plugin
const statsFile = path.resolve(context, "loadable-stats.json");
const extractor = new ChunkExtractor({statsFile});

function _render(req: Request, res: Response, preloadState: any = {}) {
    const ctx: any = {};
    const store = createStore(reducers, preloadState);
    const compString = renderToString(
        extractor.collectChunks(
            <StaticRouter location={req.url} context={ctx}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        )
    );
    const helmet = Helmet.renderStatic()
    const CDN = "https://unpkg.com/"
    const content = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${helmet.title.toString()}
            <link rel="icon" href="/logo.png">
            ${extractor.getLinkTags()}
            ${extractor.getStyleTags()}
        </head>

        <body>
            <div id="root">
                ${compString}
            </div>
            <script type="application/json" id="reduxInitialState">
                ${JSON.stringify(store.getState())}
            </script>
            <script crossorigin src="${CDN}react@17/umd/react.production.min.js"></script>
            <script crossorigin src="${CDN}react-dom@17/umd/react-dom.production.min.js"></script>
            <script crossorigin src="${CDN}react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
            ${extractor.getScriptTags()}
        </body>

        </html>
    `;

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (ctx.url) {
        return res.redirect(302, "/404");
    }

    res.send(content);
}

export default (req: Request, res: Response) => {
    let promise: Promise<any>

    switch ((req.route || {}).path) {
        case "/":
            promise = fetchArticles()
            break
        case "/view/:articleId":
            const {articleId} = req.requestParams

            promise = fetchArticle(articleId)
            break
        default:
            promise = Promise.resolve()
    }

    promise.then((state: any) => {
        _render(req, res, state)
    })
}