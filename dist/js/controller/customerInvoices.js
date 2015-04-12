(function () {
    'use strict';
    module.exports = ['$scope', '$log', 'FastBill', '$filter', '$timeout', 'uiGridConstants', function ($scope, $log, FastBill, $filter, $timeout, uiGridConstants) {
        $scope.$watch('customer', function (customer) {
            if (!customer) {
                return;
            }

            FastBill.getInvoices(customer.id).then(function (invoices) {
                $scope.$apply(function () {
                    $scope.invoices = invoices;
                });
            });
        });

        $scope.gridOptions = {
            data: 'invoicesData',
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter:true,
            columnDefs: [
                {
                    field: 'state',
                    displayName: $filter('translate')('INVOICE.STATE.LABEL')
                },
                {
                    field: 'number',
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 1
                    },
                    displayName: $filter('translate')('INVOICE.NUMBER')
                },
                {
                    field: 'date',
                    displayName: $filter('translate')('INVOICE.DATE')
                },
                {
                    field: 'client',
                    enableSorting: false,
                    displayName: $filter('translate')('INVOICE.CLIENT')
                },
                {
                    field: 'total',
                    displayName: $filter('translate')('INVOICE.TOTAL')
                }
            ]
        };

        $scope.$watch('invoices', function (invoices) {
            if (!invoices) {
                return;
            }

            $scope.invoicesData = [];

            invoices.forEach(function (invoice) {
                var state;

                if (invoice.isPaid()) {
                    state = $filter('translate')('INVOICE.STATE.PAID');
                } else if (invoice.isOverDue()) {
                    state = $filter('translate')('INVOICE.STATE.OVERDUE');
                } else {
                    state = $filter('translate')('INVOICE.STATE.UNPAID');
                }

                $scope.invoicesData.push({
                    state: state,
                    number: invoice.number,
                    client: invoice.client,
                    total: $filter('number')(invoice.total),
                    date: invoice.invoiceDate.format('L')
                });
            });

            $log.debug('[CustomerInvoicesCtrl] invoicesData', $scope.invoicesData);

            $timeout(function () {
                $scope.gridApi.core.handleWindowResize();
            });
        });
    }];
}());

//# sourceMappingURL=../controller/customerInvoices.js.map