(function () {
    "use strict";

    require('angular-translate');

    var angular = require('angular'),
        app = angular.module('trans', ['pascalprecht.translate', 'ngStorage']);

    app.config(['$translateProvider', function ($translateProvider) {
        var en = require('./translations/en');
        var de = require('./translations/de');
        $translateProvider.translations('en', en);
        $translateProvider.translations('de', de);

        $translateProvider.preferredLanguage('de');
    }]);

    app.run(['paginationConfig', '$filter', '$rootScope', '$timeout', '$translate', '$localStorage', '$locale', function (paginationConfig, $filter, $rootScope, $timeout, $translate, $localStorage, $locale) {
        paginationConfig.lastText = $filter('translate')('PAGINATION.LAST');
        paginationConfig.firstText = $filter('translate')('PAGINATION.FIRST');
        paginationConfig.previousText = $filter('translate')('PAGINATION.PREVIOUS');
        paginationConfig.nextText = $filter('translate')('PAGINATION.NEXT');

        console.debug('$locale', $locale);

        // translations
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            require('moment').locale(data.language);
            $localStorage._lang = data.language;
            $locale.id = data.language;
        });

        $localStorage.$default({
            _lang: 'de'
        });
        $translate.use($localStorage._lang);
    }]);
}());