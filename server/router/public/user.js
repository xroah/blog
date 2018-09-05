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
    return code;
}

function generateColor() {
    const MAX = 255;
    const r = Math.random() * MAX >>> 0;
    const g = Math.random() * MAX >>> 0;
    const b = Math.random() * MAX >>> 0;
    return `rgb(${r},${g},${b})`;
}

function generateImage(code) {
    const WIDTH = 100;
    const HEIGHT = 30;
    let canvas = new Canvas(WIDTH, HEIGHT);
    let ctx = canvas.getContext("2d", 0, 0);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    //generate points
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * WIDTH;
        let y = Math.random() * HEIGHT;
        ctx.fillStyle = generateColor();
        ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = "#000";
    let angle;
    let offset = -20;
    ctx.font = "20px Sans";
    for (let char of code) {
        let flag = Math.random() > .5 ? -1 : 1;
        angle = Math.random() * 20 * Math.PI / 180 * flag;
        offset += 24;
        ctx.font = "20px Sans";
        ctx.save();
        ctx.translate(offset, flag > 0 ? 0 : HEIGHT / 4);
        ctx.rotate(angle);
        ctx.fillText(char, 0, 20);
        ctx.restore();
    }
    return canvas.toDataURL();
}

router.get("/idCode", (req, res) => {
    let idCode = generateCode();
    req.session.idCode = idCode.join("").toLowerCase();
    res.send({
        errCode: 0,
        data: generateImage(idCode)
    });
});

router.post("/register", (req, res) => {
    let { userName, password, idCode, email } = req.body;
    if (!req.session.idCode || !idCode || idCode.toLowerCase() !== req.session.idCode) {
        res.send({
            errCode: 1,
            errMsg: "验证码不正确"
        });
        return;
    }
    query.findOne("users", {
        userName
    }).then(ret => {
        if (ret) {
            res.json({
                errCode: 1,
                errMsg: "用户名已存在"
            });
            return 1;
        }
    }).then(ret => {
        //no username
        if (!ret) {
            return query.findOne("users", {
                email
            });
        }
        return ret;
    }).then(ret => {
        //has username and had responsed, just return
        if (ret === 1) return;
        if (ret) {
            res.json({
                errCode: 2,
                errMsg: "该电子邮箱已被注册，请重新输入"
            });
        } else {
            return query.insertOne("users", {
                userName,
                password: md5(password),
                permission: 0,
                email
            });
        }
    }).then(ret => {
        if (ret) {
            delete req.session.idCode;
            req.session.userName = userName;
            req.session.isAdmin = false;
            res.json({
                errCode: 0,
                errMsg: "注册成功"
            });
        }
    }).catch(err => { 

        console.log(err);
    });

});

module.exports = router;