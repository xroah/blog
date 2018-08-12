const connect = require("./connect");

module.exports = {
    findOne(collection, query, options) {
        return new Promise((resolve) => {
            connect((db, client) => {
                let collec = db.collection(collection);
                collec.findOne(query, options).then(ret => {
                    resolve(ret);
                    client.close();
                });
            });
        });
    }
};