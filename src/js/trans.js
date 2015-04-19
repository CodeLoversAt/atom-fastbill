import angular from 'angular';
import 'angular-translate';
import EN from './translations/en';
import DE from './translations/de';
import moment from 'moment';

var app = angular.module('trans', ['pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', EN);
    $translateProvider.translations('de', DE);

    $translateProvider.preferredLanguage('de');
}]);

app.run(['paginationConfig', '$filter', '$rootScope', '$timeout', '$translate', 'Storage', '$locale', function (paginationConfig, $filter, $rootScope, $timeout, $translate, Storage, $locale) {
    paginationConfig.lastText = $filter('translate')('PAGINATION.LAST');
    paginationConfig.firstText = $filter('translate')('PAGINATION.FIRST');
    paginationConfig.previousText = $filter('translate')('PAGINATION.PREVIOUS');
    paginationConfig.nextText = $filter('translate')('PAGINATION.NEXT');

    // translations
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        Storage.set('_lang', data.language);
        $locale.id = data.language;
    });

    Storage.get('_lang', function (language) {
        console.info('_lang', language);
        language = (language && 'string' === typeof language) ? language : 'de';
        $translate.use(language);
    });
}]);
