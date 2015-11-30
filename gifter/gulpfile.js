var gulp = require("gulp");
var less = require("gulp-less");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var minifycss = require("gulp-cssnano");
var gutil = require("gulp-util");
var PRODUCTION = gutil.env.production || process.env.NODE_ENV == "production";

gulp.task("less", function() {
    return gulp.src([
        "bower_components/owl.carousel/dist/assets/owl.carousel.min.css",
        "static_src/less/style.less"
    ])
        .pipe(plumber({}))
        .pipe(less().on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        }))
        .pipe(concat("style.css"))
        .pipe((PRODUCTION ? minifycss() : gutil.noop()))
        .pipe(gulp.dest("static/gifter/css/"));
});

gulp.task("less:watch", ["less"], function() {
    gulp.watch(["static_src/less/**/*.less"], ["less"]);
});

gulp.task("js", function() {
    return gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/bootstrap/dist/js/bootstrap.js",
        "bower_components/bootstrap-select/dist/js/bootstrap-select.min.js",
        "bower_components/jquery-easing/jquery.easing.min.js",
        "bower_components/owl.carousel/dist/owl.carousel.min.js",
        "bower_components/jquery.scrollbar/jquery.scrollbar.js",
        "static_src/js/custom/custom.js",
        "static_src/js/custom/checkout.js"
    ])
        .pipe(plumber({}))
        .pipe(concat("gifter.js"))
        .pipe((PRODUCTION ? uglify() : gutil.noop()))
        .pipe(gulp.dest("static/gifter/js/"));
});

gulp.task("js:watch", ["js"], function() {
    gulp.watch(["static_src/js/**/*.js"], ["js"]);
});

gulp.task("copy_fonts", function() {
    return gulp.src([
        "bower_components/bootstrap/fonts/*",
        "bower_components/font-awesome/fonts/*"
    ]).pipe(gulp.dest("static/gifter/fonts/"));
});

gulp.task("default", ["js", "less", "copy_fonts"]);

gulp.task("watch", ["js:watch", "less:watch"]);
