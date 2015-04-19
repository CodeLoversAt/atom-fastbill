"use strict";
var $__angular__,
    $__main__,
    $__nav__,
    $__login__,
    $__customers__,
    $__customerDetails__,
    $__invoices__,
    $__projects__,
    $__body__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var main = ($__main__ = require("./main"), $__main__ && $__main__.__esModule && $__main__ || {default: $__main__}).default;
var nav = ($__nav__ = require("./nav"), $__nav__ && $__nav__.__esModule && $__nav__ || {default: $__nav__}).default;
var login = ($__login__ = require("./login"), $__login__ && $__login__.__esModule && $__login__ || {default: $__login__}).default;
var customers = ($__customers__ = require("./customers"), $__customers__ && $__customers__.__esModule && $__customers__ || {default: $__customers__}).default;
var customerDetails = ($__customerDetails__ = require("./customerDetails"), $__customerDetails__ && $__customerDetails__.__esModule && $__customerDetails__ || {default: $__customerDetails__}).default;
var invoices = ($__invoices__ = require("./invoices"), $__invoices__ && $__invoices__.__esModule && $__invoices__ || {default: $__invoices__}).default;
var projects = ($__projects__ = require("./projects"), $__projects__ && $__projects__.__esModule && $__projects__ || {default: $__projects__}).default;
var body = ($__body__ = require("./body"), $__body__ && $__body__.__esModule && $__body__ || {default: $__body__}).default;
var app = angular.module('controller', []);
app.controller('MainCtrl', main);
app.controller('NavCtrl', nav);
app.controller('LoginCtrl', login);
app.controller('CustomersCtrl', customers);
app.controller('CustomerDetailsCtrl', customerDetails);
app.controller('InvoicesCtrl', invoices);
app.controller('ProjectsCtrl', projects);
app.controller('BodyCtrl', body);

//# sourceMappingURL=../../js/controller/index.js.map