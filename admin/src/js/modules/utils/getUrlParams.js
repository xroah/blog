export default function getUrlParams(key, qs = location.search.substring(1)) {
    const search = qs.split("&");
    const ret = {};

    for (let s of search) {
        const arr = s.split("=");

        ret[arr[0]] = arr[1];
    }

    return key == undefined ? ret : ret[key];
}