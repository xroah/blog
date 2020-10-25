import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";

export default (app: Express) =>
    app.use("/api", createProxyMiddleware({
        target: "http://localhost:8000"
    }));