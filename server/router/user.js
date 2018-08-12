const express = require("express");
const router = express.Router();
const query = require("../db/query");
const md5 = require("../utils/md5");

router.post("/login", (req, res) => {
    let body = req.body;
    let userName = body.userName;
    let password = md5(body.password);
    query.findOne("users", {
            userName,
            password
        }).then(ret => {
            let resData = {};
            if (!ret) {
                resData.errCode = 1;
                resData.errMsg = "用户名或密码错误!"
            } else {
                resData.errCode = 0;
                resData.errMsg = "登录成功!"
            }
            res.send(resData);
        });;
});

module.exports = router;