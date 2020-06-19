import getScrollTop from "./getScrollTop";

export default function backToTop() {
    const scrollFn = () => {
        const STEP = 10;
        const sTop = getScrollTop();
        const speed = sTop <= STEP ? STEP : Math.ceil(sTop / 10);
        const top = sTop - speed;

        window.scrollTo(0, top);

        if (sTop > STEP) {
            requestAnimationFrame(scrollFn);
        }
    }

    scrollFn();
}