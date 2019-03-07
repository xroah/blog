function stringToNumberArray(str: string) {
    return str.split("").map(k => k.charCodeAt(0));
}

function encrypt(str: string, key: string) {
    let _str = stringToNumberArray(str);
    let _key = stringToNumberArray(key);
    let sl = _str.length;
    let kl = _key.length;
    let ret = [];
    for (let i = 0; i < sl; i++) {
        let index = i % kl;
        let tmp = _str[i] ^ _key[index];
        ret.push(String.fromCharCode(tmp));
    }
    return ret.join("");
}

function two(num: number) {
    return String(100 + num).substring(1);
}

function formatDate(date: Date, format: string = "YYYY-MM-DD") {
    let map = {
        "YYYY": date.getFullYear(),
        "MM": two(date.getMonth() + 1),
        "DD": two(date.getDate()),
        "hh": two(date.getHours()),
        "mm": two(date.getMinutes()),
        "ss": two(date.getSeconds())
    };
    return format.replace(
        /(Y{4})|(M{2})|(D{2})|(h{2})|(m{2})|(s{2})/g,
        match => map[match]
    );
}

export {
    encrypt,
    formatDate
};