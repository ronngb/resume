import gulp from "gulp";
import yargs from "yargs";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import gulpif from "gulp-if";
import changed from "gulp-changed";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import webpack from "webpack-stream";
import bs from "browser-sync";
import del from "del";

bs.create();

const sass = gulpSass(dartSass);

const PROD = yargs.argv.prod ?? false;

const paths = {
  styles: {
    src: "assets/scss/main.scss",
    dest: {
      dev: "assets/css",
      prod: "dist/assets/css",
    },
  },
  scripts: {
    src: "assets/js/main.js",
    dest: "dist/assets/js",
  },
  images: {
    src: "assets/images/**/*.{jpg,jpeg,png}",
    dest: "dist/assets/images",
  },

  icons: {
    src: "node_modules/@fortawesome/fontawesome-free/webfonts/*",
    dest: {
      dev: "assets/webfonts",
      prod: "dist/assets/webfonts",
    },
  },
};

export const clean = () => del(["dist/*/"]);

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(
      changed(paths.styles.dest.dev, { hasChanged: changed.compareContents })
    )
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
    .pipe(
      gulpif(
        PROD,
        gulp.dest(paths.styles.dest.prod),
        gulp.dest(paths.styles.dest.dev)
      )
    )
    .pipe(bs.stream());
};

export const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      gulpif(
        PROD,
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
            filename: "main.min.js",
          },
          devtool: false,
          mode: "production",
        })
      )
    )
    .pipe(bs.stream())
    .pipe(gulp.dest(paths.scripts.dest));
};

export const icons = () => {
  return gulp
    .src(paths.icons.src)
    .pipe(
      gulpif(
        PROD,
        gulp.dest(paths.icons.dest.prod),
        gulp.dest(paths.icons.dest.dev)
      )
    )
    .pipe(bs.stream());
};

export const images = () => {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest(paths.images.dest));
};

export const copy = () => {
  return gulp.src("index.html").pipe(gulp.dest("dist"));
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
  gulp.watch("assets/scss/**/*.scss", styles);
  gulp.watch("assets/js/**/*.js", scripts);
  gulp.watch("**/*.html", reload);
};

export const dev = gulp.series(clean, styles, scripts, icons, serve, watch);
export const prod = gulp.series(clean, styles, scripts, icons, images, copy);

exports.default = dev;
