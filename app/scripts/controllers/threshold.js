'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds', 'Threshold',
    function($scope, Thresholds, Threshold) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.thresholds.addA(new Threshold({
        from: '',
        until: '',
        operator: '>',
        numberForWarning: '',
        numberForError: 22,
        numberForCritical: 0
      }));
      $scope.thresholds.addA(new Threshold({
        from: '22:00',
        until: '02:00',
        operator: '>',
        numberForWarning: '',
        numberForError: 22,
        numberForCritical: 0
      }));
      $scope.thresholds.addA(new Threshold({
        from: '00:30',
        until: '01:30',
        operator: '=',
        numberForWarning: 11,
        numberForError: '',
        numberForCritical: 0
      }));
      $scope.thresholds.addA(new Threshold({
        from: '03:30',
        until: '04:30',
        operator: '<',
        numberForWarning: 11,
        numberForError: 12312,
        numberForCritical: 0
      }));

      $scope.$on('activate', function(event, id) {
        $scope.$broadcast('deactivate', id);
      });

      $scope.onAdd = function(threshold) {
        $scope.thresholds.addA(threshold);
      };

      $scope.onRemove = function(threshold) {
        $scope.thresholds.remove(threshold);
      };

      $scope.fromOrder = function(threshold) {
        if (!threshold.from) {
          return 24;
        }
        return Number(threshold.from.replace(':', '.'));
      };
    }]);
