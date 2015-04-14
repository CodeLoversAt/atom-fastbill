"use strict";
var $__angular_45_ui_45_router__,
    $__angular__;
($__angular_45_ui_45_router__ = require("angular-ui-router"), $__angular_45_ui_45_router__ && $__angular_45_ui_45_router__.__esModule && $__angular_45_ui_45_router__ || {default: $__angular_45_ui_45_router__});
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var app = angular.module('config', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  var navView = {
    templateUrl: 'partials/nav.html',
    controller: 'NavCtrl'
  };
  $stateProvider.state('index', {
    url: '/',
    views: {
      'content': {
        templateUrl: 'partials/index.html',
        controller: 'MainCtrl'
      },
      'nav': navView
    }
  }).state('login', {
    url: '/login',
    views: {'content': {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }}
  }).state('customers', {
    url: '/customers',
    views: {
      'content': {
        templateUrl: 'partials/customers.html',
        controller: 'CustomersCtrl'
      },
      'nav': navView
    }
  }).state('customers.details', {
    url: '/customers/:customerId',
    parent: 'customers',
    views: {'customers': {
        templateUrl: 'partials/customers-details.html',
        controller: 'CustomerDetailsCtrl'
      }}
  }).state('invoices', {
    url: '/invoices',
    views: {
      'content': {
        templateUrl: 'partials/invoices.html',
        controller: 'InvoicesCtrl'
      },
      'nav': navView
    }
  });
  $urlRouterProvider.otherwise('/');
}]);
app.run(['$log', '$rootScope', '$state', '$timeout', function($log, $rootScope, $state, $timeout) {
  var authenticated = false,
      pending = null,
      pendingParams = null;
  $rootScope.$on('authenticated', function() {
    authenticated = true;
    var tmp,
        tmpParams;
    if (pending) {
      tmp = pending;
      tmpParams = pendingParams;
      pending = null;
      pendingParams = null;
      $timeout(function() {
        $state.go(tmp, tmpParams);
      });
    }
  });
  $rootScope.$on('not-authenticated', function() {
    authenticated = false;
  });
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
    if ('login' === next.name) {
      return ;
    }
    if (!authenticated) {
      event.preventDefault();
      pending = next;
      pendingParams = nextParams;
      $state.go('login');
    }
  });
}]);

//# sourceMappingURL=config.js.map