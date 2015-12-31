angular
  .module('ngApp')
  .factory('dataService', dataService)

dataService.$inject = [
  '$q',
  '$http',
  '$resource',
  '$mediator'
];

function dataService($q, $http, $resource, $mediator) {

  var self = {};

  return self;
};
