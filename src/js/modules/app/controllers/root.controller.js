angular
  .module('ngApp')
  .controller('RootCtrl', RootCtrl)

RootCtrl.$inject = [
  '$rootScope',
  '$scope',
  '$q',
  '$mediator',
  '$state',
  '$auth'
];

function RootCtrl($rootScope, $scope, $q, $mediator, $state, $auth) {

  if (!$auth.isAuthenticated()) {

    $auth
      .login({
        username: 'admin',
        password: 'demo12345'
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
