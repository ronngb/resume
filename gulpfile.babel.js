import gulp from 'gulp'
import yargs from 'yargs'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import gulpif from 'gulp-if'
import changed from 'gulp-changed'
import sourcemaps from 'gulp-sourcemaps'
import bs from 'browser-sync'
import del from 'del'

bs.create()

const sass = gulpSass(dartSass)

const PROD = yargs.argv.prod ?? false

const paths = {
  styles: {
    src: 'src/assets/scss/main.scss',
    dest: 'dist/assets/css',
  },
}

export const clean = () => del(['dist/*/'])

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(changed(paths.styles.dest, { hasChanged: changed.compareContents }))
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(
      sass
        .sync(gulpif(PROD, { outputStyle: 'compressed' }))
        .on('error', sass.logError)
    )
    .pipe(gulpif(!PROD, sourcemaps.write('./maps')))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream())
}

export const serve = (done) => {
  bs.init({
    proxy: 'http://localhost/web/proj-jatkaa/',
  })
  done()
}

export const reload = (done) => {
  bs.reload()
  done()
}

export const watch = () => {
  gulp.watch('src/assets/scss/**/*.scss', styles)
  gulp.watch('**/*.html', reload)
}

export const dev = gulp.series(clean, styles, serve, watch)
export const prod = gulp.series(clean, styles)

exports.default = dev
