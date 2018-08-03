const express = require("express");
const fs = require("fs");

let app = express();

app.use(express.static("../dist"));
app.use(express.static("./static"));

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

app.listen(8008);