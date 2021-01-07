export default function formatDate(dateStrOrNum, format) {
    const num2Str = num => String(100 + num).substring(1);
    const date = new Date(dateStrOrNum);
    const map = new Map([
        ["YYYY", date.getFullYear()],
        ["MM", num2Str(date.getMonth() + 1)],
        ["DD", num2Str(date.getDate())],
        ["HH", num2Str(date.getHours())],
        ["mm", num2Str(date.getMinutes())],
        ["ss", num2Str(date.getSeconds())]
    ]);


    return format.replace(
        /(Y+)|(M+)|(D+)|(H+)|(m+)|(s+)/g,
        match => {
            return map.get(match);
        }
    );
}