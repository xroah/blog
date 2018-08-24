const connect = require("./connect");

function mongoCallback(resolve, client) {
    return function callback(err, ret) {
        client.close();
        if (err) {
            throw err
        }
        resolve(ret);
    }
}

module.exports = {
    findOne(collection, query, options) {
        return new Promise(resolve => {
            connect((db, client) => {
                let collec = db.collection(collection);
                collec.findOne(query, options, mongoCallback(resolve, client));
            });
        });
    },
    find(collection, query, options) {
        return new Promise(resolve => {
            connect((db, client) => {
                let collec = db.collection(collection);
                let cursor = collec.find(query, options);
                if (options && options.pagination) {
                    let page = options.pagination;
                    Promise.all([
                        cursor.count(),
                        cursor.skip((page - 1) * 10).limit(10).toArray()
                    ]).then(([count, ret]) => {
                        resolve({
                            count,
                            list: ret
                        });
                        client.close();
                    });
                } else {
                    cursor.toArray(mongoCallback(resolve, client));
                }
            });
        });
    },
    insertOne(collection, data, options) {
        return new Promise(resolve => {
            connect((db, client) => {
                let collec = db.collection(collection);
                collec.insertOne(data, options, mongoCallback(resolve, client));
            });
        });
    },
    updateOne(collection, filter, update, options) {
        return new Promise(resolve => {
            connect((db, client) => {
                let collec = db.collection(collection);
                collec.update(filter, update, options, mongoCallback(resolve, client));
            });
        });
    },
    deleteOne(collection, filter, options) {
        return new Promise(resolve => {
            connect((db, client) => {
                let collec = db.collection(collection);
                collec.deleteOne(filter, options, mongoCallback(resolve, client));
            });
        });
    }
};