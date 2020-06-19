export default function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop || 0;
}