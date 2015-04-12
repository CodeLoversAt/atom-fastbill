(function () {
    "use strict";

    var angular = require('angular'),
        dynamicCtrl = require('./dynamicCtrl'),
        app = angular.module('directive', []);

    app.directive('dynamicCtrl', dynamicCtrl);
}());
//# sourceMappingURL=../directive/index.js.map