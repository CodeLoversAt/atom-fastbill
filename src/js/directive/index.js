import angular from 'angular';
import dynamicCtrl from './dynamicCtrl';

var app = angular.module('directive', []);

app.directive('dynamicCtrl', dynamicCtrl);
