/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var module_dependencies = [];

	var ngAuth = angular.module('ngAuth', module_dependencies);

	/**
	 * ngAuth constant blocks
	 */

	ngAuth.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
	});

	/**
	 * ngAuth config blocks:
	 *   authHttpProvider
	 *   satellizerConfig
	 */

	ngAuth.config(authHttpProvider);

	authHttpProvider.$inject = ['$httpProvider'];

	function authHttpProvider($httpProvider) {
	  $httpProvider.interceptors.push('authHttpInterceptor');
	};

	/**
	 * ngAuth run blocks
	 */

	ngAuth.run(authEventListener);

	authEventListener.$inject = ['$rootScope', 'AUTH_EVENTS'];

	function authEventListener($rootScope, AUTH_EVENTS) {

	  $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {});
	  $rootScope.$on(AUTH_EVENTS.loginFailed, function (event) {});
	  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event) {});
	  $rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event) {});
	  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event) {});
	  $rootScope.$on(AUTH_EVENTS.notAuthorized, function (event) {});

	  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {});
	};

	/**
	 * ngAuth require services
	 */
	__webpack_require__(2);
	__webpack_require__(3);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngAuth').service('authService', authService);

	authService.$inject = ['$q'];

	function authService($q) {};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngAuth').factory('authHttpInterceptor', authHttpInterceptor);

	authHttpInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

	function authHttpInterceptor($rootScope, $q, AUTH_EVENTS) {

	  return {
	    responseError: responseError
	  };

	  function responseError(response) {
	    $rootScope.$broadcast(({
	      401: AUTH_EVENTS.notAuthenticated,
	      403: AUTH_EVENTS.notAuthorized
	    })[response.status], response);

	    return $q.reject(response);
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var module_dependencies = [];

	var ngLocalization = angular.module('ngLocalization', module_dependencies);

	/**
	 * ngLocalization config blocks
	 */

	ngLocalization.config(translateConfig);

	translateConfig.$inject = ['$translateProvider'];

	function translateConfig($translateProvider) {

	  var _dictionaries = {
	    ru: {},
	    en: {}
	  };

	  $translateProvider.useSanitizeValueStrategy(null);

	  $translateProvider.translations('ru', _dictionaries['ru']).translations('en', _dictionaries['en']).preferredLanguage('ru');
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var module_dependencies = [];

	angular.module('ngUser', module_dependencies);

	__webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngUser').factory('userService', userService);

	userService.$inject = ['$q', '$http', '$resource', '$mediator'];

	function userService($q, $http, $resource, $mediator) {

	  var self = {};

	  return self;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var module_dependencies = [];

	var ngUtil = angular.module('ngUtil', module_dependencies);

	__webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngUtil').service('$mediator', $mediator);

	$mediator.$inject = ['$q', '$log'];

	function $mediator($q, $log) {

	  var channels = {};
	  var subscriberId = 0;

	  this.signal = function (channel, publisher, data) {
	    if (!hasSubscriber(channel)) {
	      return;
	    }

	    var subscribers = channels[channel];

	    _.map(subscribers, function (subscriber) {
	      try {
	        subscriber.callback(data);
	      } catch (e) {
	        $log.error(e, publisher, subscriber.name);
	      }
	    });
	  };

	  this.connect = function (channel, subscriber, callback) {
	    if (!hasSubscriber(channel)) {
	      channels[channel] = [];
	    }

	    channels[channel].push({
	      "callback": callback,
	      "name": subscriber,
	      "subscriberId": ++subscriberId
	    });

	    return function () {
	      disconnect(subscriberId);
	    };
	  };

	  function hasSubscriber(channel) {
	    return _.has(channels, channel);
	  };

	  function disconnect(subscriberId) {
	    channels = _.map(channels, function (channel) {
	      return _.filter(channel, function (subscriber) {
	        return subscriber.subscriberId !== subscriberId;
	      });
	    });
	  };

	  return this;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var module_dependencies = [];

	var ngError = angular.module('ngError', module_dependencies);

	ngError.constant('ERRORS', {
	  serverError: 'server-error',
	  noInternetConnection: 'no-internet-connection'
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var module_dependencies = ['ionic', 'ui.router', 'LocalStorageModule', 'ngResource', 'satellizer', 'pascalprecht.translate', 'ngCordova', 'ngAuth', 'ngUser', 'ngUtil', 'ngLocalization', 'ngError'];

	var ngApp = angular.module('ngApp', module_dependencies);

	ngApp.constant('app_settings', {
	  //base_url: 'http://127.0.0.1:8000'
	  //base_url : 'https://infinite-headland-8695.herokuapp.com'
	  base_url: 'http://c0067a14.ngrok.io'
	});

	/**
	 * ngApp config blocks:
	 *   localStorage
	 */

	ngApp.config(localStorage).config(satellizerConfig);

	localStorage.$inject = ['localStorageServiceProvider'];

	function localStorage(localStorageServiceProvider) {

	  localStorageServiceProvider.setPrefix('_ngApp').setStorageType('localStorage').setNotify(true, true);
	};

	satellizerConfig.$inject = ['$authProvider', 'app_settings'];

	function satellizerConfig($authProvider, app_settings) {
	  $authProvider.loginUrl = app_settings['base_url'] + '/auth/';
	  $authProvider.tokenName = 'token';
	  $authProvider.authHeader = 'Authorization';
	  $authProvider.authToken = 'Token';
	};

	/**
	 * ngApp run blocks:
	 *   templatesLoader
	 */

	ngApp.run(templatesLoader).run(ionicPlatform).run(cordovaPushConfig);

	templatesLoader.$inject = ['$templateCache'];

	function templatesLoader($templateCache) {

	  var _views = {
	    'root': __webpack_require__(11),
	    'main': __webpack_require__(12)
	  };

	  $templateCache.put('root.html', _views['root']);
	  $templateCache.put('main.html', _views['main']);
	};

	ionicPlatform.$inject = ['$ionicPlatform'];

	function ionicPlatform($ionicPlatform) {
	  $ionicPlatform.ready(function () {
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    };
	    if (window.StatusBar) {
	      StatusBar.styleDefault();
	    };
	  });
	};

	cordovaPushConfig.$inject = ['localStorageService', '$ionicPlatform', '$http', '$cordovaPushV5', 'app_settings'];

	function cordovaPushConfig(localStorageService, $ionicPlatform, $http, $cordovaPush, app_settings) {

	  var push_notification_config = {
	    android: {
	      senderID: "27835363735",
	      forceShow: true
	    }
	  };

	  if (window.cordova) {
	    $cordovaPush.initialize(push_notification_config).then(function (result) {
	      console.log(result);
	      return $cordovaPush.register();
	    }).then(function (token_device) {
	      console.log(token_device);
	      var request_options = {
	        method: 'POST',
	        url: app_settings['base_url'] + '/api/notifications/device/gcm/',
	        data: {
	          registration_id: token_device
	        }
	      };

	      $http(request_options).then(function (result) {
	        console.log(result);
	        localStorageService.set('push:register', true);
	      }).catch(function (err) {
	        console.log(err);
	      });
	    }).catch(function (err) {
	      console.log(err);
	    });
	  };
	};

	__webpack_require__(13);

	__webpack_require__(14);
	__webpack_require__(15);

	__webpack_require__(16);
	__webpack_require__(17);

	angular.element(document).ready(function () {
	  angular.bootstrap(document, ['ngApp']);
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-bar class=\"bar bar-light\" align-title=\"center\">\n\n  <ion-nav-back-button class=\"button-clear\"></ion-nav-back-button>\n\n  <!-- <ion-nav-title>Header</ion-nav-title> -->\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-icon icon\"\n      ng-class=\"{'ion-ios-more': platform == 'ios', 'ion-drag': platform != 'ios'}\">\n    </button>\n  </ion-nav-buttons>\n\n</ion-nav-bar>\n\n<ion-nav-view></ion-nav-view>\n\n<ion-footer-bar class=\"bar bar-light\"></ion-footer-bar>\n\n";

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\n  <ion-content class=\"has-header padding\">\n\n    <ul class=\"list\">\n      <li class=\"item item-toggle\">\n          Push notification\n          <label class=\"toggle toggle-positive\">\n            <input type=\"checkbox\" ng-disabled=\"disabled\" ng-model=\"push_enabled\" ng-change=\"on_off_push(push_enabled)\">\n            <div class=\"track\">\n              <div class=\"handle\"></div>\n            </div>\n          </label>\n      </li>\n    </ul>\n\n    <button class=\"button\" ng-click=\"test_api()\">Test api</button>\n\n  </ion-content>\n</ion-view>\n";

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngApp').config(routing);

	routing.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routing($stateProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise("/root/main");

	  $stateProvider.state('root', {
	    url: '/root',
	    templateUrl: 'root.html',
	    controller: 'RootCtrl as rootCtrl'
	  }).state('root.main', {
	    url: '/main',
	    templateUrl: 'main.html',
	    controller: 'MainCtrl'
	  });
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngApp').controller('RootCtrl', RootCtrl);

	RootCtrl.$inject = ['$rootScope', '$scope', '$q', '$mediator', '$state', '$auth'];

	function RootCtrl($rootScope, $scope, $q, $mediator, $state, $auth) {

	  if (!$auth.isAuthenticated()) {

	    $auth.login({
	      username: 'admin',
	      password: 'demo12345'
	    }).then(function (result) {
	      console.log(result);
	    }).catch(function (err) {
	      console.log(err);
	    });
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngApp').controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', '$http', 'localStorageService', '$cordovaPushV5', 'app_settings'];

	function MainCtrl($scope, $http, localStorageService, $cordovaPush, app_settings) {

	  $scope.test_api = function () {

	    var request_options = {
	      method: 'POST',
	      url: app_settings['base_url'] + '/api/notifications/device/gcm/',
	      data: {
	        registration_id: 12345 + Math.random()
	      }
	    };

	    $http(request_options).then(function (result) {
	      console.log(result);
	      localStorageService.set('push:register', true);
	    }).catch(function (err) {
	      console.log(err);
	    });
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngApp').factory('dataService', dataService);

	dataService.$inject = ['$q', '$http', '$resource', '$mediator'];

	function dataService($q, $http, $resource, $mediator) {

	  var self = {};

	  return self;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ngApp').factory('storageService', storageService);

	storageService.$inject = ['$q', '$mediator', 'localStorageService'];

	function storageService($q, $mediator, localStorageService) {

	  var self = {};

	  return self;
	};

/***/ }
/******/ ]);