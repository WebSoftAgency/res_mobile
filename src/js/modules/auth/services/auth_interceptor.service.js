angular
  .module('ngAuth')
  .factory('authHttpInterceptor', authHttpInterceptor)

authHttpInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

function authHttpInterceptor($rootScope, $q, AUTH_EVENTS) {

  return {
    responseError: responseError
  };

  function responseError(response) {
    $rootScope.$broadcast({
      401: AUTH_EVENTS.notAuthenticated,
      403: AUTH_EVENTS.notAuthorized
    }[response.status], response);

    return $q.reject(response);
  };
};
