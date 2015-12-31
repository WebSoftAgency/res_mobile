var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build-production', function(callback) {
  gulpSequence(['webpack-production', 'css'], callback)
})
