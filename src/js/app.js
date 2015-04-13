(function () {
    'use strict';
    var angular = require('angular');
    require('./config');
    require('./controller');
    require('./service');
    require('angular-sanitize');
    require('../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls');
    require('../bower_components/ngstorage/ngStorage');
    require('./trans');
    require('./directive');
    require('./filter');

    angular.module('app', ['config', 'controller', 'service', 'directive', 'filter', 'ngSanitize', 'trans', 'ui.bootstrap']);
}());
