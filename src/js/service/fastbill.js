(function () {
    'use strict';

    var angular = require('angular'),
        Customer = require('../model/customer'),
        FastBill = function ($q, $rootScope, $log) {
            this.client = require('fastbill-client');
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.$log = $log;
            this.authenticated = false;
            this.initialize();
        };

    FastBill.prototype.initialize = function () {
        // check local storage
        this.restoreState();
    };

    FastBill.prototype.restoreState = function () {
        var self = this,
            serialized,
            credentials;

        try {
            serialized = localStorage._credentials;

            if (serialized) {
                this.deferred = this.$q.defer();
                credentials = angular.fromJson(serialized);
                // try to login
                this.login(credentials.username, credentials.apiKey)
                    .then(function () {
                        self.deferred.resolve(true);
                        self.deferred = null;
                    }, function () {
                        self.deferred.resolve(false);
                    });
            }
        } catch (e) {
            this.$log.warn('[FastBill] error restoring state:', e);
        }
    };

    FastBill.prototype.saveState = function () {
        try {
            localStorage._credentials = angular.toJson(this.credentials);
        } catch (e) {
            this.$log.warn('[FastBill] error saving state:', e);
        }
    };

    FastBill.prototype.login = function (username, apiKey) {
        var deferred = this.$q.defer(),
            self = this;
        this.client.bootstrap(username, apiKey);

        this.client.api.customer.get().then(function () {
            self.$log.debug('[FastBill] login success');
            self.authenticated = true;
            self.credentials = {
                username: username,
                apiKey: apiKey
            };
            self.saveState();
            self.$rootScope.$broadcast('authenticated');
            deferred.resolve();
        }, function (data) {
            self.$log.warn('[FastBill] login failed', data);
            self.$rootScope.$broadcast('not-authenticated');
            deferred.reject();
        });

        return deferred.promise;
    };

    FastBill.prototype.getCustomers = function () {
        return this.client.api.customer.get().then(function (data) {
            var customers = [];

            data.forEach(function (c) {
                customers.push(new Customer(c));
            });

            return customers;
        });
    };

    FastBill.prototype.getCustomer = function (id) {
        return this.client.api.customer.getById(id).then(function (data) {
            if (data && data.length) {
                return new Customer(data[0]);
            }

            return null;
        });
    };

    FastBill.prototype.isAuthenticated = function () {
        if (this.deferred) {
            return this.deferred.promise;
        }

        var deferred = this.$q.defer();

        deferred.resolve(this.authenticated);

        return deferred.promise;
    };

    FastBill.prototype.getInvoices = function (customerId) {
        var Invoice = require('../model/invoice'),
            invoicesHandler = function (data) {
                var invoices = [];

                data.forEach(function (i) {
                    invoices.push(new Invoice(i));
                });

                return invoices;
            };

        if (customerId) {
            return this.client.api.invoice.getByCustomerId(customerId).then(invoicesHandler);
        } else {
            return this.client.api.invoice.get().then(invoicesHandler);
        }
    };

    FastBill.prototype.getProjects = function (customerId) {
        var Project = require('../model/project'),
            projectsHandler = function (data) {
                var projects = [];

                data.forEach(function (p) {
                    projects.push(new Project(p));
                });

                return projects;
            };

        if (customerId) {
            return this.client.api.project.getByCustomerId(customerId).then(projectsHandler);
        }

        return this.client.api.project.get().then(projectsHandler);
    };

    module.exports = ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
        return new FastBill($q, $rootScope, $log);
    }];
}());
