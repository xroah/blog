const express = require("express");
const fs = require("fs");

let app = express();
let router = require("./router/api");

app.use(express.static("../dist"));
app.use(express.static("./static"));

app.use("/api", router);

//404
app.use((req, res) => {
    console.log(req.url)
    fs.readFile("./static/error/404.html", (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.setHeader("Content-Type", "text/html");
        res.send(data);
    });
});

app.listen(8008);