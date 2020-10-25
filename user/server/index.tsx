import express, {
    Request,
    Response,
    NextFunction
} from "express"
import path from "path"
import createProxy from "./proxy"
import render from "./render"

const app = express()
const context = path.resolve(__dirname, "../dist")

declare global {
    namespace Express {
        interface Request {
            requestParams: any
        }
    }
}

function route(req: Request, _: Response, next: NextFunction) {
    req.requestParams = req.params

    next()
}

createProxy(app)
app.use(express.static(context, {index: false}))
app.get("/", route)
app.get("/view/:articleId", route)
app.use(render)

app.listen(8888)