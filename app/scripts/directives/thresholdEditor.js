'use strict';

angular.module('logicMonitorApp')
  .directive('lmThresholdEditor', function() {
    return {
      restrict: 'EC',
      templateUrl: function(element, attributes) {
        if (attributes.threshold === undefined) {
          return 'views/thresholdCreator.html';
        }
        return 'views/thresholdEditor.html';
      },
      replace: true,
      scope: {
        'onSave': '=',
        'onRemove': '=',
        'threshold': '='
      },
      controller: ['$scope', function($scope) {
        $scope.times = [];
        for (var hour = 0; hour < 24; hour++) {
          for (var minutes = 0; minutes < 60; minutes += 15) {
            var hourString = hour < 10 ? '0' + hour : hour;
            var minutesString = minutes < 10 ? '0' + minutes : minutes;
            $scope.times.push(hourString + ':' + minutesString);
          }
        }

        $scope.comparisons = [
          {
            name: 'is equal to (=)',
            operator: '='
          },
          {
            name: 'is greater than (>)',
            operator: '>'
          },
          {
            name: 'is less than (<)',
            operator: '<'
          }
        ];

        var TYPE_ADD = 'TYPE_ADD', TYPE_EDIT = 'TYPE_EDIT', _type = TYPE_EDIT;
        if ($scope.threshold === undefined) {
          _type = TYPE_ADD;
        }
        if (_type === TYPE_ADD) {
          $scope.newThreshold = {
            operator: $scope.comparisons[0].operator
          };
        }
        $scope.active = false;
        $scope.activate = function() {
          $scope.active = true;
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
        };
        $scope.submit = function($event) {
          $event.stopPropagation();
          $scope.active = false;

          if (_type === TYPE_ADD) {
            $scope.onSave($scope.newThreshold);
            $scope.newThreshold = {
              operator: $scope.comparisons[0].operator
            };
          }
        };
      }]
    };
  });