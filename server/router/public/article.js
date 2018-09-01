const router = require("express").Router();
const query = require("../../db/query");
const ObjectID = require("mongodb").ObjectID;

router.get("/details/:id", (req, res) => {
    query.findOne("articles", {
        _id: ObjectID(req.params.id)
    }, {
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

router.get("/:page?/:keywords?", (req, res) => {
    let {
        params
    } = req;
    let page = params.page || 1;
    let keywords = params.keywords;
    let filter = {
        secret: "0"
    };
    if (keywords) {
        filter.content = new RegExp(keywords, "ig");
    }
    query.find("articles", filter, {
        pagination: page,
        sort: {
            createTime: -1
        },
        projection: {
            content: 0
        }
    }).then(ret => {
        res.json({
            errCode: 0,
            data: ret
        });
    });;
});

router.post("/updateViewedTimes", async (req, res) => {
    let _id = new ObjectID(req.body.id);
    try {
        await query.updateOne("articles", {
            _id
        }, {
            $inc: {
                totalViewed: 1,
                todayViewed: 1
            }
        });
    } catch(err) {}
    res.json({
        errCode: 0
    });
});

module.exports = router;