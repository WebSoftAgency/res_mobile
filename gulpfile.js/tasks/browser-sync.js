var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var config = require('../config')

gulp.task('browser-sync', function() {

  return browserSync({
    server: {
      baseDir: config.publicDir
    },
    files: [
      path.join(config.publicDir, '**', '*.html'),
      path.join(config.publicDir, '**', '*.js'),
      path.join(config.publicDir, '**', '*.css')
    ],
    open: false
  })
})
