'use strict';

angular.module('logicMonitorApp')
  .directive('lmThresholdEditor', function() {
    return {
      restrict: 'EC',
      templateUrl: 'views/thresholdEditor.html',
      replace: true,
      scope: {
        'onComplete': '='
      },
      controller: ['$scope', function($scope) {
        $scope.active = false;
        $scope.activate = function() {
          $scope.active = true;
        };
        $scope.cancel = function() {
          $scope.active = false;
        };
        $scope.submit = function() {
          $scope.onComplete({
            from: $scope.from,
            until: $scope.until,
            comparison: $scope.comparison,
            numberForWarning: $scope.numberForWarning,
            numberForError: $scope.numberForError,
            numberForCritical: $scope.numberForCritical
          });
          $scope.active = false;
        };

        $scope.times = [];
        for (var hour = 0; hour < 24; hour++) {
          for (var minutes = 0; minutes < 60; minutes += 15) {
            var hourString = hour < 10 ? '0' + hour : hour;
            var minutesString = minutes < 10 ? '0' + minutes : minutes;
            $scope.times.push(hourString + ':' + minutesString);
          }
        }

        $scope.comparisons = [{
          name: 'is equal to (=)',
          operator: '='
        }, {
          name: 'is greater than (>)',
          operator: '>'
        }, {
          name: 'is less than (<)',
          operator: '<'
        }];
        $scope.comparison = $scope.comparisons[0];

      }]
    };
  });