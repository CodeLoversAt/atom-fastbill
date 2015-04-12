(function () {
    "use strict";

    var Model = function () {},
        camelCase = require('change-case').camel;

    Model.prototype.setData = function (data) {
        var key;

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                this[camelCase(key)] = data[key];
            }
        }
    };

    module.exports = Model;
}());