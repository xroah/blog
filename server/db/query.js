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
        let collec = CONNECTION.collection(collection);
        return collec.findOne(query, options);
    },
    find(collection, query, options) {
        let collec = CONNECTION.collection(collection);
            let cursor = collec.find(query, options);
            if (options && options.pagination) {
                let page = options.pagination;
                return Promise.all([
                    collec.countDocuments(query),
                    cursor.skip((page - 1) * 10).limit(10).toArray()
                ]).then(([count, ret]) => {
                    return {
                        count,
                        list: ret
                    };
                });
            } else {
                return cursor.toArray();
            }
    },
    insertOne(collection, data, options) {
        let collec = CONNECTION.collection(collection);
        return collec.insertOne(data, options);
    },
    updateOne(collection, filter, update, options) {
        let collec = CONNECTION.collection(collection);
        return collec.update(filter, update, options);
    },
    deleteOne(collection, filter, options) {
        let collec = CONNECTION.collection(collection);
        return collec.deleteOne(filter, options);
    }
};