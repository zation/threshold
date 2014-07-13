'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', ['$scope', 'Thresholds',
    function($scope, Thresholds) {
      $scope.thresholds = Thresholds.getInstance();
      $scope.codes = '() > 0 22 0, ' +
        '(22:00 02:00) > 0 22 0, ' +
        '(00:30 01:30) = 11 0 0, ' +
        '(03:30 04:30) < 11 12 0' +
        '(10:00 11:00) > 0 22 0, ' +
        '(13:30 14:30) = 11 0 0, ' +
        '(15:30 16:30) < 11 12 0';
      $scope.thresholds.updateWith($scope.codes);

      $scope.$watch(function() {
        return $scope.thresholds.toString();
      }, function(codes) {
        if (codes) {
          $scope.codes = codes;
        }
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
        if (!threshold.from) {
          return 24;
        }
        return Number(threshold.from.replace(':', '.'));
      };
    }]);
