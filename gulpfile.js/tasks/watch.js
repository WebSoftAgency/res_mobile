var gulp = require('gulp')
var path = require('path')
var watch = require('gulp-watch')

var config = require('../config')

var cssSrc = path.join(config.sourceDir, 'css', '**', '*.{sass,scss}');

gulp.task('watch', function() {
  watch(cssSrc, function() {
    gulp.start('css');
  })
})
