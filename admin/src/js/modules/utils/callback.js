export default function callback(cb) {
    if (typeof cb === "function") return cb;

    return () => {};
}