export default function emulateTransitionEnd(el, fn, delay = 300) {
    let called = false;
    let timer = null;

    if (typeof fn !== "function") {
        fn = a => a;
    }

    const cancel = () => {
        if (timer !== null) {
            clearTimeout(timer);

            timer = null;
        }

        el.removeEventListener("transitionend", callback);
    };
    const callback = evt => {
        if (called || (evt && evt.target !== el)) return;

        called = true;

        fn();
        cancel();
    }

    el.addEventListener("transitionend", callback);
    timer = setTimeout(callback, delay + 50);

    return cancel;
}