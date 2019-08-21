// --------------------------------------
// HELLO DevUp !! created by Antony Paquay
// Creative Front-end Developer
// https://antonypaquay.be/
// --------------------------------------
// Uses BEM Methodology -> Learn more http://getbem.com/ & https://en.bem.info/methodology/
// Methodology BEM was invented at Yandex to develop sites which should be 
// launched fast and supported for a long time. It helps to create extendable and reusable interface components.
// --------------------------------------
// Mobile First Methodology
// Uses Normalize.css from https://necolas.github.io/normalize.css/
// --------------------------------------
// Uses Node.js, Npm and Gulp V4
// --------------------------------------

// Change the proxy here
var proxy = "http://localhost";

// Dependencies
// -------------
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

// Compress Scripts Sequences
// --------------------------
gulp.task("compress", function() {
  return gulp
    .src(["./js/libs/*.js", "./js/modules/*.js", "./js/app/*.js"])
    .pipe(concat("main.min.js"))
    .pipe(
      uglify().on("error", function(err) {
        notify({
          title: "Wow !! You have a Javascript bug !"
        }).write(err.line + ": " + err.message);
        return this.emit("end");
      })
    )
    .pipe(gulp.dest("./"));
});

// Compress Styles Sequences
// -------------------------
gulp.task("sass", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass().on("error", function(err) {
        notify({
          title: "Wow !! You have a CSS Bug !"
        }).write(err.line + ": " + err.message);
        return this.emit("end");
      })
    )
    // disable this pipe for using WP
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [
          "ie >= 9",
          "ie_mob >= 10",
          "ff >= 30",
          "chrome >= 34",
          "safari >= 7",
          "opera >= 23",
          "ios >= 7",
          "android >= 4.4",
          "bb >= 10"
        ],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

// Browser Sync
// ---------------
gulp.task(
  "server",
  gulp.series("sass", "compress", function() {
    browserSync.init({
      proxy: `${proxy}`
    });
    gulp.watch("./scss/**/*.scss", gulp.series("sass"));
    gulp.watch("./js/**/*.js", gulp.series("compress"));
    gulp.watch("./**/*.php").on("change", browserSync.reload);
  })
);

// Default Serve
// -------------
gulp.task("default", gulp.parallel("server"));
