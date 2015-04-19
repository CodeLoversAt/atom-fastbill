"use strict";
var $__default = ['$scope', '$rootScope', '$state', '$log', function($scope, $rootScope, $state, $log) {
  $scope.showSidebar = false;
  $scope.toggleSidebar = function() {
    $log.debug('[BodyCtrl] toggleSidebar', $scope.showSidebar);
    $scope.showSidebar = !$scope.showSidebar;
  };
  $scope.showToggleButton = function() {
    return 'login' !== $state.current.name;
  };
  $rootScope.$on('$stateChangeSuccess', function() {
    $scope.showSidebar = false;
  });
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../../js/controller/body.js.map