var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build-development', function(callback) {
  gulpSequence(['webpack-development', 'css', 'watch'], callback)
})
