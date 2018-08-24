const router = require("express").Router();
const query = require("../../db/query");
const ObjectID = require("mongodb").ObjectID;

router.get("/details/:id/:noComments?", (req, res) => {
    query.findOne("articles", {
        _id: ObjectID(req.params.id)
    }, {
        noComments: !!typeof req.params.noComments, // the article details only
        projection: {
            summary: 0
        }
    }).then(ret => {
        res.json({
            errCode: 0,
            data: {
                article: ret
            }
        });
    });
});

router.route("/classify").get((req, res) => {
    query.find("classify", {}, {
        projection: {
            createTime: 0
        }
    }).then(ret => {
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
        query.insertOne(collec, {
            name: req.body.name,
            createTime: new Date()
        }).then(ret => {
            res.send({
                errCode: 0,
                data: {
                    id: ret.insertedId
                }
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

router.route("/:page?/:keywords?").get((req, res) => {
    let {
        params,
        session
    } = req;
    let page = params.page || 1;
    let keywords = params.keywords;
    let filter = {};
    let projection = {
        content: 0
    }
    if (session.isAdmin) {
        summary = 0; //admin do not need summary
    }
    if (keywords) {
        filter.content = new RegExp(keywords, "ig");
    }
    query.find("articles", filter, {
        pagination: page,
        projection
    }).then(ret => {
        res.json({
            errCode: 0,
            data: ret
        });
    });;
}).post((req, res) => {
    let {
        body
    } = req;
    query.insertOne("articles", {
        title: body.title,
        content: body.content,
        classification: body.classification,
        secret: body.secret,
        createTime: new Date(),
        lastUpdate: new Date(),
        totalViewed: 0,
        todayViewed: 0,
        tags: body.tags,
        summary: body.summary
    }).then(ret => {
        res.json({
            errCode: 0
        });
    });
}).put((req, res) => {
    let {
        body
    } = req;
    query.updateOne("articles", {
        _id: ObjectID(body.id)
    }, {
        $set: {
            title: body.title,
            content: body.content,
            classification: body.classification,
            secret: body.secret,
            lastUpdate: new Date(),
            tags: body.tags,
            summary: body.summary
        }
    }).then(ret => {
        res.json({
            errCode: 0
        });
    });
}).delete((req, res) => {
    query.deleteOne("articles", {
        _id: ObjectID(req.body.id)
    }).then(ret => {
        res.json({
            errCode: 0
        });
    });
});

module.exports = router;