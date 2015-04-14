import angular from 'angular';
import slice from './slice';

var app = angular.module('filter', []);

app.filter('slice', slice);
