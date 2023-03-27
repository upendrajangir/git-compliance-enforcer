const gulp = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const i18n = require("gulp-i18n-localize");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");

// Minify and obfuscate the contentScript.js file
gulp.task("scripts", () => {
  return gulp
    .src("src/contentScript.js")
    .pipe(uglify())
    .pipe(rename("contentScript.min.js"))
    .pipe(gulp.dest("dist"));
});

// Minify and obfuscate the options.js file
gulp.task("options-scripts", () => {
  return gulp
    .src("src/options.js")
    .pipe(uglify())
    .pipe(rename("options.min.js"))
    .pipe(gulp.dest("dist"));
});

// Compile the Sass files to CSS
gulp.task("styles", () => {
  return gulp
    .src("src/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist"));
});

// Localize the extension for different languages
gulp.task("localize", () => {
  return gulp
    .src(["_locales/**/messages.json", "dist/**"])
    .pipe(
      i18n({
        locales: ["en", "fr", "es"],
        fallback: "en",
        output: "_locales",
      })
    )
    .pipe(gulp.dest("."));
});

// Run unit tests for contentScript.js
gulp.task("test-content-script", () => {
  return gulp
    .src("test/contentScript.test.js", { read: false })
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on("finish", () => {
      gulp
        .src("src/contentScript.js")
        .pipe(concat("contentScript.js"))
        .pipe(gulp.dest("."))
        .pipe(mocha())
        .pipe(
          istanbul.writeReports({
            dir: "coverage",
            reporters: ["lcov"],
          })
        );
    });
});

// Run unit tests for options.js
gulp.task("test-options", () => {
  return gulp
    .src("test/options.test.js", { read: false })
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on("finish", () => {
      gulp
        .src("src/options.js")
        .pipe(concat("options.js"))
        .pipe(gulp.dest("."))
        .pipe(mocha())
        .pipe(
          istanbul.writeReports({
            dir: "coverage",
            reporters: ["lcov"],
          })
        );
    });
});

// Run unit tests for style.scss
gulp.task("test-style", () => {
  return gulp
    .src("test/style.test.js", { read: false })
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on("finish", () => {
      gulp
        .src("src/style.scss")
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename("style.css"))
        .pipe(gulp.dest("."))
        .pipe(mocha())
        .pipe(
          istanbul.writeReports({
            dir: "coverage",
            reporters: ["lcov"],
          })
        );
    });
});

// Build the extension for production
gulp.task(
  "build",
  gulp.parallel("scripts", "options-scripts", "styles", "localize")
);

// Run all unit tests
gulp.task(
  "test",
  gulp.series("test-content-script", "test-options", "test-style")
);

// Watch for changes in the source files and run the build task
gulp.task("watch", () => {
  gulp.watch("src/*.js", gulp.parallel("scripts", "options-scripts"));
  gulp.watch("src/*.scss", gulp.series("styles"));
  gulp.watch("_locales/**/messages.json", gulp.series("localize"));
});

// Default task - run the build task and start watching for changes
gulp.task("default", gulp.series("clean", "build", "watch"));
