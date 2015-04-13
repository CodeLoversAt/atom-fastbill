(function () {
    "use strict";
    var angular = require('angular'),
        slice = require('./slice'),
        app = angular.module('filter', []);

    app.filter('slice', slice);
}());