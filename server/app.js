const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const history = require("connect-history-api-fallback");

let app = express();

let router = require("./router/api");

app.use(session({
    secret: "xroah blog",
    cookie: {
        maxAge: 30 * 60 * 1000 //default half an hour
    },
    rolling: true,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
        url: "mongodb://127.0.0.1/blog"
    })
}));


app.use("/xsys", (req, res, next) => {
    if (!req.session.isAdmin && req.path !== "/login") {
        res.sendFile("static/error/403.html", {
            root: __dirname
        }, err => {
            err && res.send({
                errCode: 500,
                errMsg: err.mesage,
                data: err
            });
        });
        return;
    }
    next();
});

app.use(history({
    rewrites: [{
        from: /^\/api\/.*$/,
        to: function (context) {
            return context.parsedUrl.path
        }
    }]
}));

app.use(express.static("../dist"));
app.use(express.static("./static"));
app.use(express.static("./uploads"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json());

//input the api url into browser address bar, response empty message
app.all("/api/*", (req, res, next) => {
    if (!req.xhr) {
        res.send("");
        return;
    }
    next();
});
app.all("/api/admin/*", (req, res, next) => {
    //if current user have no permission then response error
    if (!req.session.isAdmin) {
        res.send({
            errCode: 2,
            errMsg: "对不起，您没有权限访问"
        });
        return;
    }
    next();
});
app.use("/api", router);

//404
app.use((req, res) => {
    res.sendFile("static/error/404.html", {
        root: __dirname
    }, err => {
        err && res.send({
            errCode: 500,
            errMsg: err.mesage,
            data: err
        });
    });
});

//handle errors
app.use((err, req, res, next) => {
    console.log(err)
    res.send({
        errCode: 9,
        errMsg: err.message || "出错啦!"
    });
});

module.exports = app;