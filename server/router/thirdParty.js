const http = require("http");
const router = require("express").Router();

//get ciba daily sentence
router.get("/daliySentence", (request, response) => {
    let req = http.request({
        host: "open.iciba.com",
        path: "/dsapi/",
    }, res => {
        let resData = "";
        res.on("data", chunk => {
            resData += chunk;
        });
        res.on("end", () => {
            response.setHeader("Content-Type", "application/json;charset=utf-8");
            response.send(resData);
        });
    });
    req.on("error", err => {
        response.end(err);
    });
    req.end();
});

module.exports = router;