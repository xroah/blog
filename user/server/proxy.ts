import {createProxyMiddleware} from "http-proxy-middleware";
import {Express} from "express";

export default (app: Express, port?: number) => {
    port = port || process.env.BLOG_PORT || 8000 as any

    app.use("/api", createProxyMiddleware({
        target: `http://localhost:${port}`
    }))
}