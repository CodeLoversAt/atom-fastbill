(function () {
    'use strict';
    module.exports = ['$scope', '$log', 'FastBill', '$filter', '$timeout', 'uiGridConstants', '$state', function ($scope, $log, FastBill, $filter, $timeout, uiGridConstants, $state) {
        function projectsLoaded (projects) {
            $scope.$apply(function () {
                $scope.projects = projects;
            });
        }

        if ($state.params.customerId) {
            FastBill.getProjects($state.params.customerId).then(projectsLoaded);
        } else {
            FastBill.getProjects(null).then(projectsLoaded);
        }

        $scope.foo = function (row, column) {
            $log.debug('[ProjectsCtrl] foo', row, column);
        };

        $scope.gridOptions = {
            data: 'projectsData',
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
                    field: 'title',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 1
                    },
                    displayName: $filter('translate')('PROJECT.TITLE')
                },
                {
                    field: 'startDate',
                    displayName: $filter('translate')('PROJECT.START_DATE')
                }
            ]
        };

        $scope.$watch('projects', function (projects) {
            if (!projects) {
                return;
            }

            $scope.projectsData = [];

            projects.forEach(function (project) {
                $scope.projectsData.push({
                    title: project.title,
                    startDate: project.startDate.format('L')
                });
            });

            $log.debug('[CustomerProjectsCtrl] projectsData', $scope.projectsData);
        });
    }];
}());

//# sourceMappingURL=../controller/projects.js.map