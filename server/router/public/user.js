const express = require("express");
const router = express.Router();
const query = require("../../db/query");
const md5 = require("../../utils/md5");

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

module.exports = router;