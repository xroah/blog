const express = require("express");
const router = express.Router();
const query = require("../../db/query");
const md5 = require("../../utils/md5");
const Canvas = require("canvas");

router.post("/login", (req, res) => {
    let body = req.body;
    let userName = body.userName;
    let password = md5(body.password);
    query.findOne("users", {
        userName,
        password
    }, {
            projection: {
                userName: 1,
                permission: 1
            }
        }).then(ret => {
            let resData = {};
            if (!ret) {
                resData.errCode = 1;
                resData.errMsg = "用户名或密码错误!"
            } else {
                req.session.user = userName;
                req.session.isAdmin = +ret.permission === 1;
                resData.errCode = 0;
            }
            res.send(resData);
        });;
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.send({
        errCode: 0
    });
});

router.post("/modifyPwd", (req, res) => {
    let user = req.session.user;
    let oldPwd = md5(req.body.oldPwd);
    let newPwd = md5(req.body.newPwd);
    query.findOneAndUpdate("users", {
        userName: user,
        password: oldPwd
    }, {
            $set: {
                password: newPwd
            }
        }).then(ret => {
            if (!ret.value) {
                res.send({
                    errCode: 11,
                    errMsg: "原密码不正确"
                });
            } else {
                res.send({
                    errCode: 0
                });
            }
        });
});

function generateCode() {
    let arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let code = [];
    let l = arr.length;
    for (let i = 4; i--;) {
        let index = Math.random() * l >>> 0;
        code.push(arr[index]);
    }
    return code.join("");
}

router.get("/idCode", (req, res) => {
    let idCode = req.session.idCode = generateCode();
    let canvas = new Canvas(80, 30);
    let ctx = canvas.getContext("2d", 0, 0);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, 80, 30);
    ctx.fillStyle = "red";
    ctx.font = "20px Sans";
    ctx.fillText(idCode, 20, 20);
    res.send({
        errCode: 0,
        data: canvas.toDataURL()
    });
});

router.post("/register", (req, res) => {
    let { userName, pwd, idCode, email } = req.body;
    if (!req.session.idCode || idCode !== req.session.idCode) {
        res.send({
            errCode: 1,
            errMsg: "验证码不正确"
        });
        return;
    }
    query.insertOne("users", {
        userName,
        password: pwd,
        permission: 0,
        email
    });
});

module.exports = router;