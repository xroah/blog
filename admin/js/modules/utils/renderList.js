export default function renderList(container, tpl,  data, handler) {
    let html = "";

    data.forEach(c => {
        const tr = tpl.replace(/({{(.*?)}})/g, (match, s1, s2) => {
            return handler(s2, c[s2], c);
        });

        html += tr;
    });

    container.innerHTML = html;
}