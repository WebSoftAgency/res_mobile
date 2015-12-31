angular
  .module('ngUser')
  .factory('userService', userService)

userService.$inject = [
  '$q',
  '$http',
  '$resource',
  '$mediator'
];

function userService($q, $http, $resource, $mediator) {

  var self = {};

  return self;
};


