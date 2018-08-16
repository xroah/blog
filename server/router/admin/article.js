const router = require("express").Router();
const query = require("../../db/query");
const ObjectID = require("mongodb").ObjectID;

router.get("/list", (req, res) => {
    res.send("list");
});

router.route("/classify").get((req, res) => {
    query.find("classify", {}).then(ret => {
        res.send({
            errCode: 0,
            data: ret || []
        });
    });
}).post((req, res) => {
    let collec = "classify";
    query.findOne(collec, {
        name: req.body.name
    }).then(ret => {
        if (ret) {
            res.send({
                errCode: 1,
                errMsg: "分类已存在"
            });
            return 1;
        }
        return 0;
    }).then(num => {
        if (num) return;
        query.insertOne("classify", {
            name: req.body.name
        }).then(ret => {
            res.send({
                errCode: 0
            });
        });
    })
}).put((req, res) => {
    query.updateOne("classify", {
        _id: ObjectID(req.body.id)
    }, {
        $set: {
            name: req.body.name
        }
    }).then(ret => {
        res.send({
            errCode: 0
        });
    });
}).delete((req, res) => {
    query.deleteOne("classify", {
        _id: ObjectID(req.body.id)
    }).then(ret => {
        res.send({
            errCode: 0
        });
    });
});
module.exports = router;
