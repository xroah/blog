const gulp = require("gulp");
const browserSync = require("browser-sync");
const { createProxyMiddleware } = require("http-proxy-middleware");
const fs = require("fs");
const path = require("path");
const uglify = require("gulp-uglify-es").default;
const cleanCss = require("gulp-clean-css");

function cleanDir(dir) {
    if (!fs.existsSync(dir)) return;

    if (!fs.lstatSync(dir).isDirectory()) {
        return fs.unlinkSync(dir);
    }

    const files = fs.readdirSync(dir);

    while (files.length) {
        const file = files.pop();

        cleanDir(path.join(dir, file));
    }

    fs.rmdirSync(dir);
}

exports.serve = () => {
    require("./static");
    browserSync.init({
        server: "./src",
        port: 8828,
        open: true,
        single: true,
        middleware: [
            createProxyMiddleware("/api", {
                target: "http://localhost:8000/"
            }),
            createProxyMiddleware("/uploads", {
                target: "http://localhost:8818/"
            })
        ]
    });

    gulp.watch("src/**/*.*").on("change", browserSync.reload);
}

function clean(done) {
    cleanDir("dist");
    done();
}

function copy() {
    return gulp.src([
        "./src/images/*.*",
        "./src/templates/*.*",
        "./src/*.html",
        "./src/template/*.*",
        "./src/vendors/**/*.*"
    ], { base: "./src" })
        .pipe(gulp.dest("./dist"));
}

function uglifyJS() {
    return gulp.src("./src/js/**/*", { base: "./src" })
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
}

function minifyCSS() {
    return gulp.src("./src/styles/**/*", { base: "./src" })
        .pipe(cleanCss())
        .pipe(gulp.dest("./dist"));
}

exports.copy = copy;
exports.uglify = uglifyJS;
exports.minifyCSS = minifyCSS;
exports.default = gulp.parallel(
    clean,
    copy,
    uglifyJS,
    minifyCSS
);