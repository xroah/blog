export default function request(url, options = {}) {
    const _options = {
        method: "GET",
        mode: "same-origin",
        credentials: "same-origin",
        ...options
    };
    const method = _options.method.toLowerCase();
    const set = new Set(["post", "put", "patch"]);
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
        fetch(url, _options)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (contentType.startsWith("application/json")) {
                    res.json()
                        .then(ret => {
                            if (res.ok && ret.code === 0) {
                                return resolve(ret.data);
                            }

                            reject(ret);
                        })
                        .catch(reject);
                } else if (contentType.startsWith("text")) {
                    res.text()
                        .then(resolve)
                        .catch(reject)
                } else {
                    res.blob()
                        .then(resolve)
                        .catch(reject)
                }
            }).catch(err => reject(err));
    });
}