require('./auth_module');

describe('ngAuth module tests:', () => {

  beforeEach(angular.mock.module('ngAuth'));

  it('should be defined ngAuth module', () => {
    expect(angular.module('ngAuth')).toBeDefined();
  });
});

describe('authService tests:', () => {

  beforeEach(angular.mock.module('ngAuth'));

  it('should be defined authService', () => {

    var service;

    angular.mock.inject(authService => {
      service = authService;
    });

    expect(service).toBeDefined();
  });
});

describe('LoginCtrl tests:', () => {

  beforeEach(angular.mock.module('ngAuth'));

  var $controller;
  var $scope = {};

  beforeEach(angular.mock.inject(_$controller_ => {
    $controller = _$controller_;
  }));

  var authService = function() {};

  it('should be defined LoginCtrl', () => {

    var LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      authService: authService
    });

    expect(LoginCtrl).toBeDefined();
  });

  it('should be resetForm expect empty Object', () => {

    var LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      authService: authService
    });

    expect($scope.formData).toEqual({});
  });
});

describe('', () => {

});
