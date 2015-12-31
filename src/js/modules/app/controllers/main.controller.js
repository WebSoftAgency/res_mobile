angular
  .module('ngApp')
  .controller('MainCtrl', MainCtrl)

MainCtrl.$inject = [
  '$scope',
  '$http',
  'localStorageService',
  '$cordovaPushV5',
  'app_settings'
];

function MainCtrl($scope, $http, localStorageService, $cordovaPush, app_settings) {

  $scope.test_api = function() {

    var request_options = {
      method: 'POST',
      url: app_settings['base_url'] + '/api/notifications/device/gcm/',
      data: {
        registration_id: 12345 + Math.random()
      }
    };

    $http(request_options)
      .then(result => {
        console.log(result);
        localStorageService.set('push:register', true);
      })
      .catch(err => {
        console.log(err);
      });

  };
};
