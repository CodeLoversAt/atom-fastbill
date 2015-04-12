(function () {
    'use strict';
    module.exports = ['$scope', '$log', '$state', 'FastBill', '$rootScope', function ($scope, $log, $state, FastBill, $rootScope) {
        $scope.model = {};

        $rootScope.$on('authenticated', function () {
            $state.go('index');
        });

        $scope.login = function () {
            $log.debug('[LoginCtrl] login', $scope.model);
            FastBill.login($scope.model.username, $scope.model.apiKey)
                .then(function () {
                    $log.debug('[LoginCtrl] login success');
                    $state.go('index');
                }, function () {
                    $log.warn('[LoginCtrl] login failed');
                });
        };
    }];
}());
