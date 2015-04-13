(function () {
    'use strict';

    var angular = require('angular');

    module.exports = ['$scope', '$log', 'FastBill', '$filter', '$state', function ($scope, $log, FastBill, $filter, $state) {
        function invoicesLoaded (invoices) {
            $scope.$apply(function () {
                $scope.invoices = invoices;
            });
        }
        if ($state.params.customerId) {
            FastBill.getInvoices($state.params.customerId).then(invoicesLoaded);
        } else {
            FastBill.getInvoices(null).then(invoicesLoaded);
        }
        $scope.showHeader = !$state.params.customerId;

        // pagination
        $scope.model = {
            currentPage: 1,
            invoicesPerPage: 10,
            startInvoice: 0,
            endInvoice: 10
        };
        $scope.invoicesPerPageOptions = [1, 5, 10, 20, 25, 50];

        $scope.$watch('[model.currentPage,model.invoicesPerPage]', function (values) {
            $log.debug('[InvoicesCtrl] values', values);
            var currentPage = parseInt(values[0], 10),
                invoicesPerPage = parseInt(values[1], 10),
                i = Math.max(0, currentPage - 1);

            $scope.model.startInvoice = i * invoicesPerPage;
            $scope.model.endInvoice = $scope.model.startInvoice + invoicesPerPage;
        });

        $scope.downloadInvoice = function (invoice) {
            var fileName = $filter('translate')('INVOICE.FILE_NAME') + invoice.number + '.pdf',
                remote = require('remote'),
                win = remote.getCurrentWindow(),
                dialog = remote.require('dialog'),
                ipc = require('ipc'),
                userHome = ipc.sendSync('get-user-home');

            if (!/\/$/.test(userHome)) {
                userHome += '/';
            }

            console.log('language', navigator.language);

            dialog.showSaveDialog(win, {
                defaultPath: userHome + fileName,
                title: $filter('translate')('INVOICE.SAVE_FILE')
            }, function (path) {
                if (!path) {
                    // user cancelled
                    return;
                }

                var request = remote.require('request'),
                    fs = remote.require('fs');

                request(invoice.url).pipe(fs.createWriteStream(path));
            });
        };

        $scope.$watch('invoices', function (invoices) {
            if (!invoices) {
                return;
            }
            $scope.turnOver = 0;

            invoices.forEach(function (invoice) {
                $scope.turnOver += invoice.total;
            });
        });
    }];
}());
