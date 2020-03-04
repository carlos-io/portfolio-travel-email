const { src, dest, series, parallel, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


function serve() {
    browserSync.init({
        server: { baseDir: './public' },
        notify: false,
        open: false
    });

    watch('assets/img/**/*', generateIMG);
    watch('public/**/*.html').on('change', browserSync.reload);
}


function generateIMG() {
    return src('assets/img/**/*')
        .pipe(imagemin({ verbose: true }))
        .pipe(dest('public/img/'));
}


exports.watch = exports.serve = serve;
exports.default = series(parallel(
    generateIMG
))
