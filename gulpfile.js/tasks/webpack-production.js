var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');

var config = require('../config');

var jsSrc = path.resolve(path.join(config.sourceDir, 'js'));
var jsDest = path.resolve(path.join(config.publicDir, 'js'));

var webpackConfig = {
  context: jsSrc,
  entry: {
    'app': './index.js'
  },
  output: {
    path: jsDest,
    filename: '[name].js'
  },
  resolve: {
    alias: {},
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.html$/,
      loader: "html?attrs=img:data-src"
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

gulp.task('webpack-production', function(callback) {
  webpack(webpackConfig, function(err, stats) {

    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({}));

    callback();
  });
});
