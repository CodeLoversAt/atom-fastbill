"use strict";
var $__default = ['$scope', '$log', '$state', 'FastBill', function($scope, $log, $state, FastBill) {
  $scope.isActive = function(state) {
    var regex = new RegExp('^' + state);
    return regex.test($state.current.name);
  };
  $scope.logout = function() {
    FastBill.logout();
    $state.go('login');
  };
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../controller/nav.js.map