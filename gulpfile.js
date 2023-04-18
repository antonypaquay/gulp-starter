const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const notify = require("gulp-notify");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

function styles() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on("error", function (err) {
        notify({
          title: "SASS Error: " + err.code,
          message: err.message,
          sound: false
        }).write(err);
        return this.emit("end");
      }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
}

function scripts() {
  return gulp
    .src(["./src/js/libs/*.js", "./src/js/modules/*.js", "./src/js/app.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(
      uglify().on("error", function(err) {
        notify({
          title: "Wow !! You have a Javascript bug !"
        }).write(err.line + ": " + err.message);
        return this.emit("end");
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream())
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch(done) {
  browserSync.init({
    server: {
      proxy: "http://localhost"
    },
  });

  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./**/*.html", reload);
  done();
}

gulp.task("default", watch);
