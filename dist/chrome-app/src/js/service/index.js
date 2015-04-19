"use strict";
var $__angular__,
    $__fastbill__,
    $__storage__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var FastBillFactory = ($__fastbill__ = require("./fastbill"), $__fastbill__ && $__fastbill__.__esModule && $__fastbill__ || {default: $__fastbill__}).default;
var Storage = ($__storage__ = require("./storage"), $__storage__ && $__storage__.__esModule && $__storage__ || {default: $__storage__}).default;
var app = angular.module('service', []);
app.factory('FastBill', FastBillFactory);
app.factory('Storage', function() {
  return new Storage();
});

//# sourceMappingURL=../../js/service/index.js.map