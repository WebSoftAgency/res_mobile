var gulp = require('gulp')
var gutil = require('gulp-util')
var gulpSequence = require('gulp-sequence')

/**
 * gutil.env.p gutil.env.d gutil.env._
 */

gulp.task('default', function(callback) {

  if(gutil.env.p && gutil.env.production) {
    gulpSequence('build-production', callback);
  } else {
    gulpSequence('build-development', ['browser-sync'], callback);
  };
})
