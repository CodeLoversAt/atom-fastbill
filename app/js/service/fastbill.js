"use strict";
var $__angular__,
    $__fastbill_45_client__,
    $___46__46__47_model_47_customer__,
    $___46__46__47_model_47_invoice__,
    $___46__46__47_model_47_project__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var client = ($__fastbill_45_client__ = require("fastbill-client"), $__fastbill_45_client__ && $__fastbill_45_client__.__esModule && $__fastbill_45_client__ || {default: $__fastbill_45_client__}).default;
var Customer = ($___46__46__47_model_47_customer__ = require("../model/customer"), $___46__46__47_model_47_customer__ && $___46__46__47_model_47_customer__.__esModule && $___46__46__47_model_47_customer__ || {default: $___46__46__47_model_47_customer__}).default;
var Invoice = ($___46__46__47_model_47_invoice__ = require("../model/invoice"), $___46__46__47_model_47_invoice__ && $___46__46__47_model_47_invoice__.__esModule && $___46__46__47_model_47_invoice__ || {default: $___46__46__47_model_47_invoice__}).default;
var Project = ($___46__46__47_model_47_project__ = require("../model/project"), $___46__46__47_model_47_project__ && $___46__46__47_model_47_project__.__esModule && $___46__46__47_model_47_project__ || {default: $___46__46__47_model_47_project__}).default;
var FastBill = (function() {
  function FastBill($q, $rootScope, $log) {
    "use strict";
    this.client = client;
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.authenticated = false;
    this.initialize();
  }
  return ($traceurRuntime.createClass)(FastBill, {
    initialize: function() {
      this.restoreState();
    },
    restoreState: function() {
      var self = this,
          serialized,
          credentials;
      try {
        serialized = localStorage._credentials;
        if (serialized) {
          this.deferred = this.$q.defer();
          credentials = angular.fromJson(serialized);
          this.login(credentials.username, credentials.apiKey).then(function() {
            self.deferred.resolve(true);
            self.deferred = null;
          }, function() {
            self.deferred.resolve(false);
          });
        }
      } catch (e) {
        this.$log.warn('[FastBill] error restoring state:', e);
      }
    },
    saveState: function() {
      try {
        localStorage._credentials = angular.toJson(this.credentials);
      } catch (e) {
        this.$log.warn('[FastBill] error saving state:', e);
      }
    },
    clearState: function() {
      try {
        delete localStorage._credentials;
      } catch (e) {
        this.$log.warn('[FastBill] error clearing state:', e);
      }
    },
    ensureAuthenticated: function() {
      if (!this.authenticated) {
        throw 'You need to call login before accessing any api method';
      }
    },
    login: function(username, apiKey) {
      var deferred = this.$q.defer(),
          self = this;
      this.client.bootstrap(username, apiKey);
      this.client.api.customer.get().then(function() {
        self.$log.debug('[FastBill] login success');
        self.authenticated = true;
        self.credentials = {
          username: username,
          apiKey: apiKey
        };
        self.saveState();
        self.$rootScope.$broadcast('authenticated');
        deferred.resolve();
      }, function(data) {
        self.$log.warn('[FastBill] login failed', data);
        self.$rootScope.$broadcast('not-authenticated');
        deferred.reject();
      });
      return deferred.promise;
    },
    getCustomers: function() {
      this.ensureAuthenticated();
      return this.client.api.customer.get().then(function(data) {
        var customers = [];
        data.forEach(function(c) {
          customers.push(new Customer(c));
        });
        return customers;
      });
    },
    getCustomer: function(id) {
      this.ensureAuthenticated();
      return this.client.api.customer.getById(id).then(function(data) {
        if (data && data.length) {
          return new Customer(data[0]);
        }
        return null;
      });
    },
    isAuthenticated: function() {
      if (this.deferred) {
        return this.deferred.promise;
      }
      var deferred = this.$q.defer();
      deferred.resolve(this.authenticated);
      return deferred.promise;
    },
    getInvoices: function(customerId) {
      this.ensureAuthenticated();
      this.$log.debug('[FastBill] getInvoices', customerId);
      var invoicesHandler = function(data) {
        var invoices = [];
        data.forEach(function(i) {
          invoices.push(new Invoice(i));
        });
        return invoices;
      };
      if (customerId) {
        return this.client.api.invoice.getByCustomerId(customerId).then(invoicesHandler);
      } else {
        return this.client.api.invoice.get().then(invoicesHandler);
      }
    },
    getProjects: function(customerId) {
      this.ensureAuthenticated();
      var projectsHandler = function(data) {
        var projects = [];
        data.forEach(function(p) {
          projects.push(new Project(p));
        });
        return projects;
      };
      if (customerId) {
        return this.client.api.project.getByCustomerId(customerId).then(projectsHandler);
      }
      return this.client.api.project.get().then(projectsHandler);
    },
    logout: function() {
      this.authenticated = false;
      this.credentials = null;
      this.clearState();
    }
  }, {});
}());
var $__default = ['$q', '$rootScope', '$log', function($q, $rootScope, $log) {
  return new FastBill($q, $rootScope, $log);
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../service/fastbill.js.map