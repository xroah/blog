export default function isObject(obj: any) {
    if (!obj) return false;

    return Object.prototype.toString.call(obj) === "[object Object]";
}