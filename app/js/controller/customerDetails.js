"use strict";
var $__default = ['$scope', '$log', 'FastBill', '$state', function($scope, $log, FastBill, $state) {
  $log.debug('[CustomerDetailsCtrl] $state', $state);
  FastBill.getCustomer($state.params.customerId).then(function(customer) {
    if (customer) {
      $scope.$apply(function() {
        $scope.customer = customer;
      });
    } else {
      $state.go('customers');
    }
  }, function(data) {
    $log.warn('[CustomerDetailsCtrl] failed to load customer', data);
  });
  $scope.tabs = [{
    name: 'invoices',
    label: 'CUSTOMER.INVOICES',
    active: true,
    controller: 'InvoicesCtrl',
    templateUrl: 'partials/invoices.html'
  }, {
    name: 'projects',
    label: 'CUSTOMER.PROJECTS',
    active: false,
    controller: 'ProjectsCtrl',
    templateUrl: 'partials/projects.html'
  }];
  $scope.tabSelected = function(tab) {
    $scope.$broadcast('tabSelected', tab);
  };
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../controller/customerDetails.js.map