"use strict";
var $__default = ['$scope', '$log', '$state', 'FastBill', '$rootScope', function($scope, $log, $state, FastBill, $rootScope) {
  $scope.model = {};
  $rootScope.$on('authenticated', function() {
    $state.go('index');
  });
  $scope.login = function() {
    $log.debug('[LoginCtrl] login', $scope.model);
    FastBill.login($scope.model.username, $scope.model.apiKey).then(function() {
      $log.debug('[LoginCtrl] login success');
      $state.go('index');
    }, function() {
      $log.warn('[LoginCtrl] login failed');
    });
  };
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../controller/login.js.map