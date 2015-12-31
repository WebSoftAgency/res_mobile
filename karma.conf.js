// Karma configuration
// Generated on Thu Oct 08 2015 19:19:30 GMT+0700 (RTZ 6 (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'www/libs/angular-ui-router/release/angular-ui-router.min.js',
      
      'src/js/**/*_spec.js',
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/**/*_spec.js': ['webpack', 'coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // report coverage config
    coverageReporter: {
      type: 'html',
      dir: 'report/coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    webpack: {
      module: {
        loaders: [{
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      },
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-chrome-launcher"),
      require('karma-phantomjs-launcher')
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
