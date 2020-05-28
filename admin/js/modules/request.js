import message from "./message.js";

function rejectPromise(reject, error = {}) {
    reject();
    message.destroy();
    message.error(error.message || error.msg || "操作失败");
}

export default function request(url, options = {}) {
    const _options = {
        method: "GET",
        mode: "same-origin",
        credentials: "same-origin",
        ...options
    };
    const method = _options.method.toLowerCase();
    const set = new Set(["post", "put", "patch", "delete"]);
    let headers = _options.headers;

    if (!headers) {
        headers = _options.headers = new Headers();
    }

    headers.append(
        "Authorization",
        `token ${localStorage.getItem("token") || ""}`
    );
    headers.append("X-Requested-With", "XMLHttpRequest");

    if (set.has(method)) {
        headers.append("Content-Type", "application/json; charset=utf-8");
    }

    return new Promise((resolve, reject) => {
        const _reject = err => rejectPromise(reject, err);

        fetch(url, _options)
            .then(res => {
                if (!res.ok) {
                    res.json()
                        .then(ret => rejectPromise(reject, ret))
                        .catch(() => {
                            rejectPromise(reject, { message: res.statusText });
                        });

                    return;
                }

                const contentType = res.headers.get("content-type");

                if (contentType.startsWith("application/json")) {
                    res.json()
                        .then(ret => {
                            if (ret.code === 0) {
                                return resolve(ret.data);
                            }

                            rejectPromise(reject, ret);
                        })
                        .catch(_reject);
                } else if (contentType.startsWith("text")) {
                    res.text()
                        .then(resolve)
                        .catch(_reject)
                } else {
                    res.blob()
                        .then(resolve)
                        .catch(_reject)
                }
            }).catch(_reject);
    });
}