const http = require("http");
const connect = require("connect");
const static = require("serve-static");

const app = connect();

app.use("/uploads", static(`${process.env.HOME || "/"}/uploads/`));

http.createServer(app).listen(8818);

console.log("Server is listening 8818.\n");