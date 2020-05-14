export default function emulateTransitionEnd(el, fn, delay = 300) {
    let called = false;
    let timer;

    if (typeof fn !== "function") {
        fn = a => a;
    }

    const cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer);

            timer = null;
        }

        el.removeEventListener("transitionend", callback);
    };
    const callback = () => {
        if (called) return;

        called = true;

        fn();
        cancel();
    }

    el.addEventListener("transitionend", callback);
    timer = setTimeout(fn, delay + 50);

    return cancel;
}