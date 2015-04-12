(function () {
    "use strict";

    require('angular-translate');

    var angular = require('angular'),
        app = angular.module('trans', ['pascalprecht.translate']);

    app.config(['$translateProvider', function ($translateProvider) {
        var en = require('./translations/en');
        var de = require('./translations/de');
        $translateProvider.translations('en', en);
        $translateProvider.translations('de', de);

        $translateProvider.preferredLanguage('de');
    }]);
}());