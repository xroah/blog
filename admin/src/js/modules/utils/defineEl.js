export default function defineEl(name, constructor, options) {
    if (!customElements.get(name)) {
        customElements.define(name, constructor, options);
    }
}