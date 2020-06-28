const filter = a => a;

export default function renderList(container, tpl, data, handler, f = filter) {
    container.innerHTML = renderToString(tpl, data, handler);
}

export function renderToString(tpl, data, handler, f = filter) {
    let html = "";

    data.forEach(c => {
        if (f(c) !== false) {
            const tr = tpl.replace(/({{(.*?)}})/g, (match, s1, s2) => {
                return handler(s2, c[s2], c) || "";
            });

            html += tr;
        }
    });

    return html;
}