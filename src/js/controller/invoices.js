import angular from 'angular';
import Bridge from '../../lib/bridge';

export default ['$scope', '$log', 'FastBill', '$filter', '$state', function ($scope, $log, FastBill, $filter, $state) {
    var bridge = new Bridge();

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
        var fileName = $filter('translate')('INVOICE.FILE_NAME') + invoice.number + '.pdf';

        bridge.downloadFile(fileName, invoice.url, $filter('translate')('INVOICE.SAVE_FILE'));
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