"use strict";
var $__default = ['$scope', '$log', 'FastBill', '$filter', '$timeout', '$state', function($scope, $log, FastBill, $filter, $timeout, $state) {
  function projectsLoaded(projects) {
    $scope.$apply(function() {
      $scope.projects = projects;
    });
  }
  if ($state.params.customerId) {
    FastBill.getProjects($state.params.customerId).then(projectsLoaded);
  } else {
    FastBill.getProjects(null).then(projectsLoaded);
  }
  $scope.model = {
    currentPage: 1,
    projectsPerPage: 10,
    startProject: 0,
    endProject: 10
  };
  $scope.projectsPerPageOptions = [1, 5, 10, 20, 25, 50];
  $scope.$watch('[model.currentPage,model.projectsPerPage]', function(values) {
    $log.debug('[ProjectsCtrl] values', values);
    var currentPage = parseInt(values[0]),
        projectsPerPage = parseInt(values[1]),
        i = Math.max(0, currentPage - 1);
    $scope.model.startProject = i * projectsPerPage;
    $scope.model.endProject = $scope.model.startProject + projectsPerPage;
  });
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../controller/projects.js.map