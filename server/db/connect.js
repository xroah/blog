const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

MongoClient.connect(url, {
    useNewUrlParser: true,
},(err, client) => {
    if (err) {
        throw err;
    }
    let db = client.db("blog");
    let collec = db.collection("articles");
    collec.insert({
        test: "hhhhs"
    });
    console.log("connected success");
    client.close();
});