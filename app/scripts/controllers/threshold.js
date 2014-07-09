'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds',
    function($scope, Thresholds) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.thresholds.add({
        from: '123',
        until: '123',
        comparison: {
          name: 'is greater than(>)',
          operator: '>'
        },
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '123',
        until: '123',
        comparison: {
          name: 'is greater than(>)',
          operator: '>'
        },
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '123',
        until: '123',
        comparison: {
          name: 'is greater than(>)',
          operator: '>'
        },
        numberForWarning: 11,
        numberForError: 22,
        numberForCritical: 0
      });
      
      $scope.onAddComplete = function(threshold) {
        $scope.thresholds.add(threshold);
      };
    }]);
