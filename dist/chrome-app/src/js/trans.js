"use strict";
var $__angular__,
    $__angular_45_translate__,
    $__translations_47_en__,
    $__translations_47_de__,
    $__moment__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($__angular_45_translate__ = require("angular-translate"), $__angular_45_translate__ && $__angular_45_translate__.__esModule && $__angular_45_translate__ || {default: $__angular_45_translate__});
var EN = ($__translations_47_en__ = require("./translations/en"), $__translations_47_en__ && $__translations_47_en__.__esModule && $__translations_47_en__ || {default: $__translations_47_en__}).default;
var DE = ($__translations_47_de__ = require("./translations/de"), $__translations_47_de__ && $__translations_47_de__.__esModule && $__translations_47_de__ || {default: $__translations_47_de__}).default;
var moment = ($__moment__ = require("moment"), $__moment__ && $__moment__.__esModule && $__moment__ || {default: $__moment__}).default;
var app = angular.module('trans', ['pascalprecht.translate']);
app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', EN);
  $translateProvider.translations('de', DE);
  $translateProvider.preferredLanguage('de');
}]);
app.run(['paginationConfig', '$filter', '$rootScope', '$timeout', '$translate', 'Storage', '$locale', function(paginationConfig, $filter, $rootScope, $timeout, $translate, Storage, $locale) {
  paginationConfig.lastText = $filter('translate')('PAGINATION.LAST');
  paginationConfig.firstText = $filter('translate')('PAGINATION.FIRST');
  paginationConfig.previousText = $filter('translate')('PAGINATION.PREVIOUS');
  paginationConfig.nextText = $filter('translate')('PAGINATION.NEXT');
  $rootScope.$on('$translateChangeSuccess', function(event, data) {
    Storage.set('_lang', data.language);
    $locale.id = data.language;
  });
  Storage.get('_lang', function(language) {
    console.info('_lang', language);
    language = (language && 'string' === typeof language) ? language : 'de';
    $translate.use(language);
  });
}]);

//# sourceMappingURL=../js/trans.js.map