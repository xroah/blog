export function rowLoading(tbody, colspan) {
    tbody.innerHTML = `<tr>
        <td colspan="${colspan}"><inline-loading></inline-loading></td>
    </tr>`
}

export function noResult(tbody, colspan) {
    tbody.innerHTML = `<tr>
        <td colspan="${colspan}" class="text-center text-muted h5">无记录</td>
    </tr>`;
}