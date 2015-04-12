(function () {
    'use strict';

    var angular = require('angular'),
        main = require('./main'),
        nav = require('./nav'),
        login = require('./login'),
        customers = require('./customers'),
        customerDetails = require('./customerDetails'),
        invoices = require('./invoices'),
        projects = require('./projects'),
        app = angular.module('controller', []);

    app.controller('MainCtrl', main);
    app.controller('NavCtrl', nav);
    app.controller('LoginCtrl', login);
    app.controller('CustomersCtrl', customers);
    app.controller('CustomerDetailsCtrl', customerDetails);
    app.controller('InvoicesCtrl', invoices);
    app.controller('ProjectsCtrl', projects);
}());
