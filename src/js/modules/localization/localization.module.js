var module_dependencies = [];

var ngLocalization = angular.module('ngLocalization', module_dependencies)

/**
 * ngLocalization config blocks
 */

ngLocalization
  .config(translateConfig)

translateConfig.$inject = ['$translateProvider']

function translateConfig($translateProvider) {

  var _dictionaries = {
    ru: {},
    en: {}
  };

  $translateProvider.useSanitizeValueStrategy(null);

  $translateProvider
    .translations('ru', _dictionaries['ru'])
    .translations('en', _dictionaries['en'])
    .preferredLanguage('ru');
};
