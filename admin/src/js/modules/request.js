import message from "./message.js";

function rejectPromise(reject, error = {}, errorPrompt = true) {
    reject();

    if (errorPrompt && error.name !== "AbortError" /* aborted */) {
        message.destroy();
        message.error(error.message || error.msg || "操作失败");
    }

    if (error.code === 403) {
        location.href = "/login.html";
    }
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
    const errorPrompt = _options.errorPrompt;

    delete _options.errorPrompt;

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
        const _reject = err => rejectPromise(reject, err, errorPrompt);

        fetch(url, _options)
            .then(res => {
                if (!res.ok) {
                    res.json()
                        .then(_reject)
                        .catch(() => {
                            const err = { message: res.statusText };

                            _reject(err);
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

                            _reject(ret);
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