export default function getSearchParams(key) {
    const search = location.search.substring(1).split("&");
    const ret = {};

    for (let s of search) {
        const arr = s.split("=");

        ret[arr[0]] = arr[1];
    }

    return key === undefined ? ret : ret[key];
}