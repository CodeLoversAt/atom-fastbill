(function () {
    'use strict';
    var angular = require('angular');
    require('./config');
    require('./controller');
    require('./service');
    require('angular-sanitize');
    require('../../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls');
    require('../../bower_components/angular-ui-grid/ui-grid');
    require('./trans');
    require('./directive');

    angular.module('app', ['config', 'controller', 'service', 'directive', 'ngSanitize', 'trans', 'ui.grid', 'ui.grid.selection', 'ui.grid.autoResize', 'ui.bootstrap']);
}());
