'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds',
    function($scope, Thresholds) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.onAddComplete = function(threshold) {
        $scope.thresholds.add(threshold);
      };
    }]);
