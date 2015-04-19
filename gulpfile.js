(function () {
    "use strict";
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        exec = require('child_process').exec,
        sourcemaps = require('gulp-sourcemaps'),
        del = require('del'),
        browserify = require('gulp-browserify'),
        traceur = require('gulp-traceur'),
        rename = require('gulp-rename'),
        gulpIf = require('gulp-if'),
        debug = true;

    gulp.task('styles', ['bower', 'apm'], function () {
        return gulp.src('src/scss/style.scss')
            .pipe(sass())
            .pipe(minifyCss())
            .pipe(gulp.dest('app/css'));
    });

    gulp.task('scripts', function () {
        return gulp.src(['src/js/**/*.js', 'src/lib/**/*.js'], {base: 'src/'})
            .pipe(sourcemaps.init())
            .pipe(traceur({
                modules: 'commonjs'
            }))
            .pipe(gulpIf(!debug, uglify()))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app'));
    });

    gulp.task('html', function () {
        return gulp.src('src/html/**/*.html')
            .pipe(gulp.dest('app'));
    });

    gulp.task('bower', function (cb) {
        exec('cd app && bower install', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task('clean', function (cb) {
        del(['build/**/*'], cb);
    });

    gulp.task('apm', function (cb) {
        exec('cd app && apm install .', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task('compile', ['styles', 'scripts', 'html']);

    gulp.task('watch', ['compile'], function () {
        gulp.watch('src/scss/**/*.scss', ['styles']);
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/html/**/*.html', ['html']);
    });

    gulp.task('build', ['compile', 'clean'], function (cb) {
        exec('grunt', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task('chrome:clean', function (cb) {
        del(['dist/chrome-app/src/**/*'], cb);
    });

    var chromeLibSrc = 'src/chrome-app/**/*.js';
    gulp.task('chrome:lib', ['chrome:clean'], function () {
        return gulp.src(chromeLibSrc, { base: 'src/chrome-app' })
            .pipe(sourcemaps.init())
            .pipe(traceur({
                modules: 'commonjs'
            }))
            .pipe(gulpIf(!debug, uglify()))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/chrome-app/src'));
    });

    var chromeStylesSrc = ['app/css/**/*.css'];
    gulp.task('chrome:styles', ['compile', 'chrome:clean'], function () {
        return gulp.src(chromeStylesSrc, { base: 'app/'})
            .pipe(gulp.dest('dist/chrome-app/src'));
    });

    var chromeScriptsSrc = ['app/js/**/*.js'];

    gulp.task('chrome:scripts', ['chrome:scripts:compile', 'chrome:vendors', 'chrome:lib'], function () {
        return gulp.src('dist/chrome-app/src/js/bootstrap.js')
            .pipe(sourcemaps.init())
            .pipe(browserify({
                insertGlobals: true,
                debug: true,
                shim: {
                    'ngStorage': {
                        path: 'dist/chrome-app/bower_components/ngstorage/ngStorage.min.js',
                        exports: 'ngStorage',
                        depends: {
                            angular: 'angular'
                        }
                    }
                }
            }))
            .pipe(gulpIf(!debug, uglify()))
            //.pipe(rename('app.bundle.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/chrome-app/src/js'));
    });

    gulp.task('chrome:scripts:compile', ['compile', 'chrome:clean'], function () {
        return gulp.src(chromeScriptsSrc, {base: 'app/'})
            .pipe(gulp.dest('dist/chrome-app/src'));
    });

    var chromeHtmlSrc = ['app/partials/**/*.html', 'app/index.html'];
    gulp.task('chrome:html', ['compile', 'chrome:clean'], function () {
        return gulp.src(chromeHtmlSrc, { base: 'app/'})
            .pipe(gulp.dest('dist/chrome-app'));
    });

    gulp.task('chrome:vendors', ['compile', 'chrome:clean', 'chrome:bower', 'chrome:npm']);

    gulp.task('chrome:vendors:copy', function () {
        return gulp.src(['app/package.json', 'app/bower.json'], { base: 'app/'})
            .pipe(gulp.dest('dist/chrome-app'));
    });

    gulp.task('chrome:bower', ['chrome:vendors:copy'], function (cb) {
        exec('cd dist/chrome-app/ && bower install', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task('chrome:npm', ['chrome:vendors:copy'], function (cb) {
        exec('cd dist/chrome-app/ && npm install', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task('chrome', ['chrome:styles', 'chrome:scripts', 'chrome:html', 'chrome:vendors']);

    gulp.task('watch:chrome', ['chrome', 'watch'], function () {
        gulp.watch(chromeStylesSrc, ['chrome:styles']);
        gulp.watch(chromeScriptsSrc, ['chrome:scripts']);
        gulp.watch(chromeHtmlSrc, ['chrome:html']);
        gulp.watch(chromeLibSrc, ['chrome:lib']);
    });

    gulp.task('default', ['build']);

}());