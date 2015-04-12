(function () {
    "use strict";
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        //bower = require('main-bower-files'),
        //concat = require('gulp-concat'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('styles', function () {
        return gulp.src('src/scss/style.scss')
            .pipe(sass())
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/css'));
    });

//gulp.task('vendors', function () {
//    return gulp.src(bower(), { base: './bower_compontents'})
//        .pipe(concat('vendors.js'))
//        .pipe(gulp.dest('dist/js/lib'));
//});

    gulp.task('scripts', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(sourcemaps.init())
            //.pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('html', function () {
        return gulp.src('src/html/**/*.html')
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build', ['styles', 'scripts', 'html']);

    gulp.task('watch', ['build'], function () {
        gulp.watch('src/scss/**/*.scss', ['styles']);
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/html/**/*.html', ['html']);
    });

    gulp.task('default', ['build']);

}());