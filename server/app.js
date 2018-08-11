const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

let app = express();
let router = require("./router/api");

app.use(express.static("../dist"));
app.use(express.static("./static"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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