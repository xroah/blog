const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

module.exports = function connect (callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true,
    }, (err, client) => {
        if (err) {
            throw err;
        }
        let db = client.db("blog");
        if (typeof callback === "function") {
            callback(db);
        }
    });
}