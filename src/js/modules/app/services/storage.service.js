angular
  .module('ngApp')
  .factory('storageService', storageService)

storageService.$inject = [
  '$q',
  '$mediator',
  'localStorageService'
];

function storageService($q, $mediator, localStorageService) {

  var self = {};

  return self;
};
