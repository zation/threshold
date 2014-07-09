'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds',
    function($scope, Thresholds) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.thresholds.add({
        from: '',
        until: '',
        operator: '>',
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '00:30',
        until: '01:30',
        operator: '=',
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '03:30',
        until: '04:30',
        operator: '<',
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });

      $scope.onAdd = function(threshold) {
        $scope.thresholds.add(threshold);
      };

      $scope.onRemove = function(threshold) {
        $scope.thresholds.remove(threshold);
      };
    }]);
