export default function serialize(obj: object) {
    const entries = Object.entries(obj);
    let ret: string[] = [];

    for (let arr of entries) {
        ret.push(arr.join("="));
    }

    return ret.join("&");
}