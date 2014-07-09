'use strict';

angular.module('logicMonitorApp')
  .directive('lmThresholdEditor', ['$document', function($document) {
    return {
      restrict: 'EA',
      templateUrl: 'views/thresholdEditor.html',
      replace: true,
      scope: {
        'onSave': '=',
        'onRemove': '=',
        'threshold': '='
      },
      link: function(scope, element) {
        angular.element(element).on('click', function(event) {
          event.stopPropagation();
          var ignoreNodeNames = ['INPUT', 'LABEL', 'SELECT'];
          if (ignoreNodeNames.indexOf(event.target.nodeName) < 0) {
            angular.element(element).find('.from').focus();
          }
        });

        $document.on('click', function(event) {
          if (scope.active) {
            scope.$apply(function() {
              scope.cancel(event);
            });
          }
        });

        $document.on('keyup', function(event) {
          if (event.keyCode === 27) {
            angular.element(element).find('input, select').blur();
            scope.$apply(function() {
              scope.cancel(event);
            });
          }
        });
      },
      controller: ['$scope', 'Thresholds', function($scope, Thresholds) {
        function initNewThreshold() {
          $scope.newThreshold = {
            id: 'new',
            from: '',
            until: $scope.times[0],
            operator: $scope.comparisons[0].operator
          };
        }

        $scope.times = Thresholds.TIMES;
        $scope.comparisons = Thresholds.COMPARISONS;

        $scope.isAdding = $scope.threshold === undefined;
        $scope.isEditing = !$scope.isAdding;
        if ($scope.isAdding) {
          initNewThreshold();
        } else {
          $scope.newThreshold = angular.copy($scope.threshold);
        }

        $scope.active = false;

        $scope.activate = function() {
          $scope.active = true;
          $scope.$emit('activate', $scope.newThreshold.id);
        };

        $scope.$on('deactivate', function(event, exclusionId) {
          if (exclusionId !== $scope.newThreshold.id) {
            $scope.active = false;
          }
        });

        $scope.remove = function($event) {
          $event.stopPropagation();
          if ($scope.onRemove) {
            $scope.onRemove($scope.threshold);
          }
        };

        $scope.cancel = function($event) {
          $event.stopPropagation();
          $scope.active = false;
          if ($scope.isAdding) {
            initNewThreshold();
          } else {
            $scope.newThreshold = angular.copy($scope.threshold);
          }
        };

        $scope.submit = function($event) {
          $event.stopPropagation();
          $scope.active = false;

          if ($scope.isAdding) {
            delete $scope.newThreshold.id;
            $scope.onSave($scope.newThreshold);
            initNewThreshold();
          } else if ($scope.isEditing) {
            $scope.threshold = angular.copy($scope.newThreshold);
          }
        };
      }]
    };
  }]);