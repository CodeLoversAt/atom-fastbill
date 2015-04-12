(function () {
    'use strict';

    var angular = require('angular');

    module.exports = ['$scope', '$log', 'FastBill', '$filter', '$timeout', 'uiGridConstants', '$state', function ($scope, $log, FastBill, $filter, $timeout, uiGridConstants, $state) {
        function invoicesLoaded (invoices) {
            $scope.$apply(function () {
                $scope.invoices = invoices;
            });
        }
        if ($state.params.customerId) {
            FastBill.getInvoices($state.params.customerId).then(invoicesLoaded);
        } else {
            FastBill.getInvoices().then(invoicesLoaded);
        }

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
                },
                {
                    field: 'url',
                    displayName: $filter('translate')('INVOICE.DOWNLOAD'),
                    cellTemplate: '<a ng-click="grid.appScope.downloadInvoice(row.entity.url, row.entity.fileName)" class="btn btn-link" translate="INVOICE.DOWNLOAD"></a>'
                }
            ]
        };

        $scope.downloadInvoice = function (url, fileName) {
            var input = document.getElementById('fileDialog'),
                remote = require('remote'),
                fs = remote.require('fs'),
                suffixNumber = 1;

            function checkFile(folder, file) {
                fs.exists(folder + '/' + file, function (exists) {
                    var request, tmp;
                    if (exists) {
                        tmp = fileName.replace(/\.pdf$/, ' (' + suffixNumber + ').pdf');
                        suffixNumber++;
                        checkFile(folder, tmp);
                    } else {
                        request = remote.require('request');
                        request(url).pipe(fs.createWriteStream(folder + '/' + file));
                    }
                });
            }

            function onChange(event) {
                $log.debug('onChange', event);
                if (input.files && input.files.length) {
                    input.removeEventListener('change', onChange);

                    checkFile(input.files[0].path, fileName);
                    input.files.length = 0;
                }
            }

            input.addEventListener('change', onChange);
            input.click();
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
                    date: invoice.invoiceDate.format('L'),
                    url: invoice.url,
                    fileName: $filter('translate')('INVOICE.FILE_NAME') + invoice.number + '.pdf'
                });
            });

            $log.debug('[CustomerInvoicesCtrl] invoicesData', $scope.invoicesData);
        });
    }];
}());
