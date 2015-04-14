import angular from 'angular';
import FastBillFactory from './fastbill';

var app = angular.module('service', []);

app.factory('FastBill', FastBillFactory);
