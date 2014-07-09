'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds',
    function($scope, Thresholds) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.thresholds.add({
        from: '',
        until: '',
        operator: '>',
        numberForWarning: '',
        numberForError: 22,
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '00:30',
        until: '01:30',
        operator: '=',
        numberForWarning: 11,
        numberForError: '',
        numberForCritical: 0
      });
      $scope.thresholds.add({
        from: '03:30',
        until: '04:30',
        operator: '<',
        numberForWarning: 11,
        numberForError: 12312,
        numberForCritical: 0
      });

      $scope.$on('activate', function(event, id) {
        $scope.$broadcast('deactivate', id);
      });

      $scope.onAdd = function(threshold) {
        $scope.thresholds.add(threshold);
      };

      $scope.onRemove = function(threshold) {
        $scope.thresholds.remove(threshold);
      };

      $scope.fromOrder = function(threshold) {
        var result = Number(threshold.from.replace(':', '.'));
        return isNaN(result) ? 0 : result;
      };
    }]);
