(function () {
    "use strict";

    var angular = require('angular');

    module.exports = function () {
        return function (arr, start, end) {
            if (!angular.isArray(arr)) {
                return [];
            }

            return arr.slice(start, end);
        };
    };
}());