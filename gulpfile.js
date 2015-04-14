(function () {
    "use strict";
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        exec = require('child_process').exec,
        sourcemaps = require('gulp-sourcemaps'),
        del = require('del'),
        traceur = require('gulp-traceur');

    gulp.task('styles', ['bower', 'apm'], function () {
        return gulp.src('src/scss/style.scss')
            .pipe(sass())
            .pipe(minifyCss())
            .pipe(gulp.dest('app/css'));
    });

    gulp.task('scripts', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(traceur({
                modules: 'commonjs'
            }))
            //.pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app/js'));
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

    gulp.task('default', ['build']);

}());