export default function handleUrl(url) {
    if (!url) return "";

    if (url.startsWith("http")) {
        return url;
    }

    return `//${url}`;
}