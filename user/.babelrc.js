module.exports = api => {
    const conf = {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "@loadable/babel-plugin"
        ]
    }

    if (api.env() === "development") {
        conf.plugins.push("react-refresh/babel")
    }

    return conf
}