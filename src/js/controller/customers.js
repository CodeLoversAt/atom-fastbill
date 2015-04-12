(function () {
    'use strict';
    module.exports = ['$scope', '$log', 'FastBill', '$state', function ($scope, $log, FastBill, $state) {
        FastBill.getCustomers().then(function (customers) {
            $scope.$apply(function () {
                $scope.customers = customers;
            });
        });
    }];
}());
