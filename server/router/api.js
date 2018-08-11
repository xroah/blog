const express = require("express");
const router = express.Router();
const thirdParty = require("./thirdParty");
const connect = require("../db/connect");

router.use("/thirdParty", thirdParty);

router.post("/login", (req, res) => {
    let body = req.body;
    let userName = body.userName;
    let password = body.password;
    connect(db => {
        let collec = db.collection("users");
        collec.findOne({
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
            db.close();
            res.send(resData);
        });
    });
});

module.exports = router;