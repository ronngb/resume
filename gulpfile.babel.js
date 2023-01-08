import gulp from "gulp";
import yargs from "yargs";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import gulpif from "gulp-if";
import changed from "gulp-changed";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import webpack from "webpack-stream";
import rename from "gulp-rename";
import bs from "browser-sync";
import del from "del";

bs.create();

const sass = gulpSass(dartSass);

const PROD = yargs.argv.prod ?? false;

const paths = {
  styles: {
    src: "src/assets/scss/main.scss",
    dest: "dist/assets/css",
  },
  scripts: {
    src: "src/assets/js/main.js",
    dest: "dist/assets/js",
  },
  icons: {
    src: "node_modules/@fortawesome/fontawesome-free/webfonts/*",
    dest: "dist/assets/webfonts",
  },
};

export const clean = () => del(["dist/*/"]);

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(changed(paths.styles.dest, { hasChanged: changed.compareContents }))
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(
      sass
        .sync(gulpif(PROD, { outputStyle: "compressed" }))
        .on("error", sass.logError)
    )
    .pipe(
      gulpif(
        PROD,
        rename({
          extname: ".min.css",
        })
      )
    )
    .pipe(autoprefixer())
    .pipe(gulpif(!PROD, sourcemaps.write("./maps")))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
};

export const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                  ],
                },
              },
            },
          ],
        },
        output: {
          filename: PROD ? "main.min.js" : "main.js",
        },
        devtool: !PROD ? "inline-source-map" : false,
        mode: PROD ? "production" : "development",
      })
    )
    .pipe(bs.stream())
    .pipe(gulp.dest(paths.scripts.dest));
};

export const icons = () => {
  return gulp
    .src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest))
    .pipe(bs.stream());
};

export const serve = (done) => {
  bs.init({
    proxy: "http://localhost/web/proj-jatkaa/",
    open: false,
  });
  done();
};

export const reload = (done) => {
  bs.reload();
  done();
};

export const watch = () => {
  gulp.watch("src/assets/scss/**/*.scss", styles);
  gulp.watch("src/assets/js/**/*.js", scripts);
  gulp.watch("**/*.html", reload);
};

export const dev = gulp.series(clean, styles, scripts, icons, serve, watch);
export const prod = gulp.series(clean, styles, scripts, icons);

exports.default = dev;
