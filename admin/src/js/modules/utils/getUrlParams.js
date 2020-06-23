export default function getUrlParams(key, hash = false) {
    const search = ( hash ? location.hash : location.search).substring(1).split("&");
    const ret = {};

    for (let s of search) {
        const arr = s.split("=");

        ret[arr[0]] = arr[1];
    }

    return key == undefined ? ret : ret[key];
}