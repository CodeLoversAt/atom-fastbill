import angular from 'angular';
import client from 'fastbill-client';
import Customer from '../model/customer';
import Invoice from '../model/invoice';
import Project from '../model/project';

class FastBill {
    constructor($q, $rootScope, $log) {
        "use strict";
        this.client = client;

        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.authenticated = false;
        this.initialize();
    }

    initialize() {
        // check local storage
        this.restoreState();
    }

    restoreState() {
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
    }

    saveState() {
        try {
            localStorage._credentials = angular.toJson(this.credentials);
        } catch (e) {
            this.$log.warn('[FastBill] error saving state:', e);
        }
    }

    clearState() {
        try {
            delete localStorage._credentials;
        } catch (e) {
            this.$log.warn('[FastBill] error clearing state:', e);
        }
    }

    ensureAuthenticated() {
        if (!this.authenticated) {
            throw 'You need to call login before accessing any api method';
        }
    }

    login(username, apiKey) {
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
    }

    getCustomers() {
        this.ensureAuthenticated();
        return this.client.api.customer.get().then(function (data) {
            var customers = [];

            data.forEach(function (c) {
                customers.push(new Customer(c));
            });

            return customers;
        });
    }

    getCustomer(id) {
        this.ensureAuthenticated();
        return this.client.api.customer.getById(id).then(function (data) {
            if (data && data.length) {
                return new Customer(data[0]);
            }

            return null;
        });
    }

    isAuthenticated() {
        if (this.deferred) {
            return this.deferred.promise;
        }

        var deferred = this.$q.defer();

        deferred.resolve(this.authenticated);

        return deferred.promise;
    }

    getInvoices(customerId) {
        this.ensureAuthenticated();
        this.$log.debug('[FastBill] getInvoices', customerId);
        var invoicesHandler = function (data) {
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
    }

    getProjects(customerId) {
        this.ensureAuthenticated();
        var projectsHandler = function (data) {
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
    }

    logout() {
        this.authenticated = false;
        this.credentials = null;
        this.clearState();
    }
}

export default ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return new FastBill($q, $rootScope, $log);
}];