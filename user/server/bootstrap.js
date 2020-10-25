process.env.NODE_ENV = "production";

require("ignore-styles")
require("@babel/register")({
    extensions: [".ts", ".tsx", ".js", ".jsx"]
})

require("./index.tsx")