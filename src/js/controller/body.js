export default ['$scope', '$rootScope', '$state', '$log', function ($scope, $rootScope, $state, $log) {
    $scope.showSidebar = false;
    $scope.toggleSidebar = function () {
        $log.debug('[BodyCtrl] toggleSidebar', $scope.showSidebar);
        $scope.showSidebar = !$scope.showSidebar;
    };

    $scope.showToggleButton = function () {
        return 'login' !== $state.current.name;
    };

    $rootScope.$on('$stateChangeSuccess', function () {
        $scope.showSidebar = false;
    });
}];
