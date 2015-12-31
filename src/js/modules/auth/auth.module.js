var module_dependencies = [];

var ngAuth = angular.module('ngAuth', module_dependencies)

/**
 * ngAuth constant blocks
 */

ngAuth
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

/**
 * ngAuth config blocks:
 *   authHttpProvider
 *   satellizerConfig
 */

ngAuth
  .config(authHttpProvider)

authHttpProvider.$inject = ['$httpProvider'];

function authHttpProvider($httpProvider) {
  $httpProvider.interceptors.push('authHttpInterceptor');
};



/**
 * ngAuth run blocks
 */

ngAuth
  .run(authEventListener)

authEventListener.$inject = ['$rootScope', 'AUTH_EVENTS'];

function authEventListener($rootScope, AUTH_EVENTS) {

  $rootScope.$on(AUTH_EVENTS.loginSuccess, (event) => {});
  $rootScope.$on(AUTH_EVENTS.loginFailed, (event) => {});
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, (event) => {});
  $rootScope.$on(AUTH_EVENTS.sessionTimeout, (event) => {});
  $rootScope.$on(AUTH_EVENTS.notAuthenticated, (event) => {});
  $rootScope.$on(AUTH_EVENTS.notAuthorized, (event) => {});

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {});
};

/**
 * ngAuth require services
 */
require('./services/auth.service')
require('./services/auth_interceptor.service')

