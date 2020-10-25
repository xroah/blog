import getScrollTop from "./get-scroll-top";
import noop from "./noop";

export default function backToTop(done: () => void = noop) {
    let cancelToken: number | null = null;
    const scrollFn = () => {
        const STEP = 10;
        const sTop = getScrollTop();
        const speed = sTop <= STEP ? STEP : Math.ceil(sTop / 10);
        const top = sTop - speed;

        window.scrollTo(0, top);

        if (sTop > STEP) {
            cancelToken = requestAnimationFrame(scrollFn);
        } else {
            window.scrollTo(0, 0);
            done();
        }
    }

    scrollFn();

    return () => {
        if (cancelToken !== null) {
            cancelAnimationFrame(cancelToken);
        }
    }
}