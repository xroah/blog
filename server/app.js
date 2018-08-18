const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

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
    store: new MongoStore({ url: "mongodb://localhost/blog" })
}));

app.use(express.static("../dist"));
app.use(express.static("./static"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

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
    fs.readFile("./static/error/404.html", (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.setHeader("Content-Type", "text/html");
        res.send(data);
    });
});

//handle errors
app.use((err, req, res, next) => {
    res.send({
        errCode: 9,
        errMsg: err.mesage || "出错啦!"
    });
});

app.listen(8008);