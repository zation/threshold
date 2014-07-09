'use strict';

angular.module('logicMonitorApp')
  .directive('lmThresholdEditor', function() {
    return {
      restrict: 'EC',
      templateUrl: 'views/thresholdEditor.html',
      replace: true,
      scope: {
        'onSave': '=',
        'onRemove': '=',
        'threshold': '='
      },
      controller: ['$scope', 'Thresholds', function($scope, Thresholds) {
        $scope.times = Thresholds.TIMES;
        $scope.comparisons = Thresholds.COMPARISONS;

        $scope.isAdding = $scope.threshold === undefined;
        $scope.isEditing = !$scope.isAdding;
        if ($scope.isAdding) {
          $scope.newThreshold = {
            until: $scope.times[0],
            operator: $scope.comparisons[0].operator
          };
        } else {
          $scope.newThreshold = angular.copy($scope.threshold);
        }
        $scope.active = false;
        $scope.activate = function() {
          $scope.active = true;
          if ($scope.isAdding) {
            $scope.newThreshold = {
              until: $scope.times[0],
              operator: $scope.comparisons[0].operator
            };
          }
        };
        $scope.remove = function($event) {
          $event.stopPropagation();
          if ($scope.onRemove) {
            $scope.onRemove($scope.threshold);
          }
        };
        $scope.cancel = function($event) {
          $event.stopPropagation();
          $scope.active = false;
          if ($scope.isEditing) {
            $scope.newThreshold = $scope.threshold;
          }
        };
        $scope.submit = function($event) {
          $event.stopPropagation();
          $scope.active = false;

          if ($scope.isAdding) {
            $scope.onSave($scope.newThreshold);
          } else if ($scope.isEditing) {
            $scope.threshold = $scope.newThreshold;
          }
        };
      }]
    };
  });