angular
  .module('ngApp')
  .config(routing)

routing.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];

function routing($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/root/main");

  $stateProvider
    .state('root', {
      url: '/root',
      templateUrl: 'root.html',
      controller: 'RootCtrl as rootCtrl'
    })
    .state('root.main', {
      url: '/main',
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    })
};
