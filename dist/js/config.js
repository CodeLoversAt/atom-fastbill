(function () {
    'use strict';
    require('angular-ui-router');

    var angular = require('angular'),
        app = angular.module('config', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var navView = {
            templateUrl: 'partials/nav.html',
            controller: 'NavCtrl'
        };

        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'partials/index.html',
                        controller: 'MainCtrl'
                    },
                    'nav': navView
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'content': {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('customers', {
                url: '/customers',
                views: {
                    'content': {
                        templateUrl: 'partials/customers.html',
                        controller: 'CustomersCtrl'
                    },
                    'nav': navView
                }
            })
            .state('customers.details', {
                url: '/customers/:customerId',
                parent: 'customers',
                views: {
                    'customers': {
                        templateUrl: 'partials/customers-details.html',
                        controller: 'CustomerDetailsCtrl'
                    }
                }
            })
            .state('customers.details.invoices', {
                url: '/customers/:customerId/invoices',
                parent: 'customers.details',
                views: {
                    'invoices': {
                        templateUrl: 'partials/customer-details/invoices.html',
                        controller: 'CustomerInvoicesCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }]);

    app.run(['$log', '$rootScope', '$state', '$timeout', function ($log, $rootScope, $state, $timeout) {
        var authenticated = false,
            pending = null,
            pendingParams = null;

        $rootScope.$on('authenticated', function () {
            authenticated = true;
            var tmp, tmpParams;
            if (pending) {
                tmp = pending;
                tmpParams = pendingParams;
                pending = null;
                pendingParams = null;

                $timeout(function () {
                    $state.go(tmp, tmpParams);
                });
            }
        });

        $rootScope.$on('not-authenticated', function () {
            authenticated = false;
        });

        $rootScope.$on('$stateChangeStart', function (event, next, nextParams) {
            if ('login' === next.name) {
                return;
            }

            if (!authenticated) {
                event.preventDefault();
                pending = next;
                pendingParams = nextParams;
                $state.go('login');
            }

        });
    }]);
}());

//# sourceMappingURL=config.js.map