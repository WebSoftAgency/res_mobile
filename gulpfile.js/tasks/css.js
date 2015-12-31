var gulp = require('gulp')
var path = require('path')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync')

var autoprefixer = require('gulp-autoprefixer')

var config = require('../config')

var cssSrc = path.join(config.sourceDir, 'css', '**', '*.{sass,scss}');
var cssDest = path.join(config.publicDir, 'css')

gulp.task('css', function() {
  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({
      indentedSyntax: false
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.reload({
      stream: true
    }))
})
