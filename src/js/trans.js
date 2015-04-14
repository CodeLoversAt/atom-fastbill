import angular from 'angular';
import 'angular-translate';
import EN from './translations/en';
import DE from './translations/de';
import moment from 'moment';

var app = angular.module('trans', ['pascalprecht.translate', 'ngStorage']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', EN);
    $translateProvider.translations('de', DE);

    $translateProvider.preferredLanguage('de');
}]);

app.run(['paginationConfig', '$filter', '$rootScope', '$timeout', '$translate', '$localStorage', '$locale', function (paginationConfig, $filter, $rootScope, $timeout, $translate, $localStorage, $locale) {
    paginationConfig.lastText = $filter('translate')('PAGINATION.LAST');
    paginationConfig.firstText = $filter('translate')('PAGINATION.FIRST');
    paginationConfig.previousText = $filter('translate')('PAGINATION.PREVIOUS');
    paginationConfig.nextText = $filter('translate')('PAGINATION.NEXT');

    // translations
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        $localStorage._lang = data.language;
        $locale.id = data.language;
    });

    $localStorage.$default({
        _lang: 'de'
    });
    $translate.use($localStorage._lang);
}]);
