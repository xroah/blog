const CONNECTION = global.dbConn;

function mongoCallback(resolve) {
    return function callback(err, ret) {
        if (err) {
            throw err
        }
        resolve(ret);
    }
}

module.exports = {
    findOne(collection, query, options) {
        return new Promise(resolve => {
            let collec = CONNECTION.collection(collection);
            collec.findOne(query, options, mongoCallback(resolve));
        });
    },
    find(collection, query, options) {
        return new Promise(resolve => {
            let collec = CONNECTION.collection(collection);
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
                });
            } else {
                cursor.toArray((mongoCallback(resolve)));
            }
        });
    },
    insertOne(collection, data, options) {
        return new Promise(resolve => {
            let collec = CONNECTION.collection(collection);
            collec.insertOne(data, options, mongoCallback(resolve));
        });
    },
    updateOne(collection, filter, update, options) {
        return new Promise(resolve => {
            let collec = CONNECTION.collection(collection);
            collec.update(filter, update, options, mongoCallback(resolve));
        });
    },
    deleteOne(collection, filter, options) {
        let collec = CONNECTION.collection(collection);
        collec.deleteOne(filter, options, mongoCallback(resolve));
    }
};