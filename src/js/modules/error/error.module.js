var module_dependencies = [];

var ngError = angular.module('ngError', module_dependencies);

ngError
  .constant('ERRORS', {
    serverError: 'server-error',
    noInternetConnection: 'no-internet-connection'
  })
