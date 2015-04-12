(function () {
    'use strict';
    module.exports = ['$scope', '$log', 'FastBill', '$state', function ($scope, $log, FastBill, $state) {
        $log.debug('[CustomerDetailsCtrl] $state', $state);

        FastBill.getCustomer($state.params.customerId).then(function (customer) {
            if (customer) {
                $scope.$apply(function () {
                    $scope.customer = customer;
                });
            } else {
                $state.go('customers');
            }
        }, function (data) {
            $log.warn('[CustomerDetailsCtrl] failed to load customer', data);
        });

        $scope.tabs = [
            {
                name: 'invoices',
                label: 'CUSTOMER.INVOICES',
                active: true,
                controller: 'InvoicesCtrl',
                templateUrl: 'partials/customer-details/invoices.html'
            },
            {
                name: 'projects',
                label: 'CUSTOMER.PROJECTS',
                active: false,
                controller: 'ProjectsCtrl',
                templateUrl: 'partials/customer-details/projects.html'
            }
        ];

        $scope.tabSelected = function (tab) {
            $scope.$broadcast('tabSelected', tab);
        };
    }];
}());

//# sourceMappingURL=../controller/customerDetails.js.map