(function () {
    'use strict';
    module.exports = ['$scope', '$log', 'FastBill', function ($scope, $log, FastBill) {
        FastBill.getCustomers().then(function (customers) {
            $scope.$apply(function () {
                $scope.customers = customers;
            });
        });

        // pagination
        $scope.model = {
            currentPage: 1,
            customersPerPage: 10,
            startCustomer: 0,
            endCustomer: 10
        };
        $scope.customersPerPageOptions = [1, 5, 10, 20, 25, 50];

        $scope.$watch('[model.currentPage,model.customersPerPage]', function (values) {
            $log.debug('[CustomersCtrl] values', values);
            var currentPage = parseInt(values[0]),
                customersPerPage = parseInt(values[1]),
                i = Math.max(0, currentPage - 1);

            $scope.model.startCustomer = i * customersPerPage;
            $scope.model.endCustomer = $scope.model.startCustomer + customersPerPage;
        });
    }];
}());
