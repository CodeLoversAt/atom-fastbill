(function() {
    var angular = require('angular');
    var app = angular.module('service', []);

    app.factory('FastBill', require('./fastbill'));
})();
