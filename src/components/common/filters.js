export function date(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    function two(num) {
        return num < 10 ? `0${num}` : num.toString();
    }
    return `${year}-${two(mon)}-${two(day)} ${two(hour)}:${two(
        min
    )}:${two(sec)}`;
}