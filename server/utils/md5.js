const crypto = require("crypto");

module.exports = function md5(str) {
    let ret;
    if (typeof str === "string") {
        let hash = crypto.createHash("md5");
        ret = hash.update(str).digest("hex");
    }
    return ret;
}