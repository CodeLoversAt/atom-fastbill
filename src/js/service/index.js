import angular from 'angular';
import FastBillFactory from './fastbill';
import Storage from './storage';

var app = angular.module('service', []);

app.factory('FastBill', FastBillFactory);
app.factory('Storage', function() {
    return new Storage();
});