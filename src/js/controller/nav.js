(function () {
    'use strict';
    module.exports = ['$scope', '$log', '$state', function ($scope, $log, $state) {
        $scope.isActive = function (state) {
            var regex = new RegExp('^' + state);

            return regex.test($state.current.name);
        };
    }];
}());
